 
import { DbConnect } from '@/database/database';
import AdminModel from '@/model/adminModel';
import bcryptjs from 'bcryptjs';
import { NextResponse } from 'next/server';
DbConnect()
export async function POST(req) {
    try {
        const payload = await req.json();
        const { email, password } = payload;

        if (!email || !password) {
            return NextResponse.json({ status: 400, success: false, message: 'Please provide valid credentials' });
        }

        
        const admin = await AdminModel.findOne({ email });

        if (!admin) {
            return NextResponse.json({ status: 404, success: false, message: 'Admin not found' });
        }

        const isPasswordMatch = await bcryptjs.compare(password, admin.password);

        if (!isPasswordMatch) {
            return NextResponse.json({ status: 401, success: false, message: 'Invalid password' });
        }

        return NextResponse.json({ status: 200, success: true, result: admin });
    } catch (error) {
        console.error('Error logging in admin:', error);
        return NextResponse.json({ status: 500, success: false, message: 'Internal server error' });
    }
}
