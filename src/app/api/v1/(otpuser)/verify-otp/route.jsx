import { DbConnect } from "@/database/database";
import OtpUserModel from "@/model/otpUser";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { orderId, otp, phoneNumber } = await request.json();
  
    try {
        // Verify OTP
        const response = await fetch(`${process.env.NEXT_PUBLIC_OTPLESS_URL}/auth/otp/v1/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'clientId': process.env.NEXT_PUBLIC_CLIENT_ID,
                'clientSecret': process.env.NEXT_PUBLIC_CLIENT_SECRET,
            },
            body: JSON.stringify({ orderId, otp, phoneNumber }),
        });

        const result = await response.json();

        // Log the result for debugging
        console.log('OTP Verification Result:', result);

        // Check if the OTP verification is successful
        if (result.isOTPVerified===true) {
            // Connect to the database
            await DbConnect();
  
            // Check if the phone number already exists
            let user = await OtpUserModel.findOne({ phoneNumber });
  
            if (!user) {
                // Save phone number to MongoDB if not exists
                user = await OtpUserModel.create({ phoneNumber });
            }
  
            // Return success response
            return NextResponse.json({ success: true, user });
        } else {
            return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return NextResponse.json({ error: 'Internal server issue' }, { status: 500 });
    }
}
