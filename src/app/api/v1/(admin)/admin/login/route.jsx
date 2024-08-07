import AdminModel from "@/model/adminModel";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { handelAsyncErrors } from "@/helpers/asyncErrors";

export async function POST(req) {
    return handelAsyncErrors(async () => {
        let payload = await req.json();
        let { email, password } = payload;

        // Check if the email exists
        let existingAdmin = await AdminModel.findOne({ email: email });

        if (existingAdmin) {
            // Verify the password
            let isPasswordMatch = await bcryptjs.compare(password, existingAdmin.password);

            if (!isPasswordMatch) {
                return NextResponse.json({ status: 401, success: false, message: 'Invalid password' });
            }

            // Login successful
            return NextResponse.json({
                status: 200,
                message: 'Admin logged in successfully',
                result: existingAdmin
            });
        } else {
            // If the email does not exist, create a new admin
            let salt = await bcryptjs.genSalt(12);
            let hashedPassword = await bcryptjs.hash(password, salt);

            let newAdmin = new AdminModel({
                email: email,
                password: hashedPassword
            });

            await newAdmin.save();

            return NextResponse.json({
                status: 201,
                message: 'Admin created and logged in successfully',
                result: newAdmin
            });
        }
    });
}
