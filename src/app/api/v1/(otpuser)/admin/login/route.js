import { DbConnect } from "@/database/database";
import { handelAsyncErrors } from "@/helpers/asyncErrors";
import OtpUserModel from "@/model/otpUser";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';

DbConnect();

export async function POST(req) {
  return handelAsyncErrors(async () => {
    let payload = await req.json();
    let { name, email, password } = payload;

    // Check if the admin exists
    let isEmail = await OtpUserModel.findOne({ email });
    if (isEmail) {
      // Verify password
      const isMatch = await bcryptjs.compare(password, isEmail.password);
      if (isMatch) {
        return NextResponse.json({ status: 200, message: 'Admin logged in successfully', result: isEmail });
      } else {
        return NextResponse.json({ status: 401, message: 'Invalid credentials' });
      }
    }

    // Register new admin
    let salt = await bcryptjs.genSalt(12);
    let hashPassword = await bcryptjs.hash(password, salt);

    let newAdmin = new OtpUserModel({
      name: name,
      email: email,
      password: hashPassword,
      role: 'admin'
    });

    await newAdmin.save();

    return NextResponse.json({ status: 201, message: 'Admin registered successfully', result: newAdmin });
  });
}
