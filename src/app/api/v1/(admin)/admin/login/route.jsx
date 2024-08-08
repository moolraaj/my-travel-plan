import AdminModel from "@/model/adminModel";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { handelAsyncErrors } from "@/helpers/asyncErrors";

export async function POST(req) {
    return handelAsyncErrors(async () => {
        let payload = await req.json();
        let { email, password } = payload;

        if(!email||!password){
            return NextResponse.json({status:200,success:false,message:'please provide valid credentials'})
        }

        // Check if the email exists
        let existingAdmin = await AdminModel.findOne({ email: email });

        if (!existingAdmin) {
            return NextResponse.json({ status: 404, success: false, message: 'Email does not exist' });
        }

        // Verify the password
        let isPasswordMatch = await bcryptjs.compare(password, existingAdmin.password);

        if (!isPasswordMatch) {
            return NextResponse.json({ status: 401, success: false, message: 'Invalid password' });
        }

        return NextResponse.json({
            status: 200,
            message: 'Admin logged in successfully',
            result: existingAdmin
        });
    });
}
