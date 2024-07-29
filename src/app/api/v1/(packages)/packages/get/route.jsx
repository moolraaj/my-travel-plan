import { DbConnect } from "@/database/database";
import PackagesModel from "@/model/packagesModel";
import { NextResponse } from "next/server";
DbConnect()
export async function GET() {
    try {
        
        let data = await PackagesModel.find()
        let result = data.map((e) => ({
            _id: e._id,
            images: e.images,
            title: e.title,
        description: e.description,
            slug: e.slug,
        }))
        return NextResponse.json({ success: true, result })
    } catch (error) {
        return NextResponse.json({ success: false, message:'internal server error' }) 
    }
}