import { DbConnect } from "@/database/database";
import { handelAsyncErrors } from "@/helpers/asyncErrors";
import OtpUserModel from "@/model/otpUser";
import { NextResponse } from "next/server";

DbConnect();

export async function POST(req) {
    return handelAsyncErrors(async () => {
        let payload = await req.json();
        let phoneNumber = payload.phoneNumber;

        if(!phoneNumber){
            return NextResponse.json({status:200,message:'phone number is required'})
        }

        let existingUser = await OtpUserModel.findOne({ phoneNumber });

        if (existingUser) {
            return NextResponse.json({
                status: 200,
                success: true,
                message: 'User logged  in successfully',
            });
        }

    });
}
