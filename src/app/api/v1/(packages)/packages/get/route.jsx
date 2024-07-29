import { DbConnect } from "@/database/database";
import { getPaginationParams } from "@/helpers/paginations";
import PackagesModel from "@/model/packagesModel";
import { NextResponse } from "next/server";
DbConnect()
export async function GET(req) {
    try {

        let {page,limit,skip}=getPaginationParams(req)
        
        let data = await PackagesModel.find().skip(skip).limit(limit).exec()
        let result = data.map((e) => ({
            _id: e._id,
            images: e.images,
            title: e.title,
        description: e.description,
            slug: e.slug,
        }))
        let totalResults=await PackagesModel.countDocuments()
        return NextResponse.json({ success: true,totalResults, result,page,limit })
    } catch (error) {
        return NextResponse.json({ success: false, message:'internal server error' }) 
    }
}