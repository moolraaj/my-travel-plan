import { DbConnect } from "@/database/database";
import { handelAsyncErrors } from "@/helpers/asyncErrors";
import { getPaginationParams } from "@/helpers/paginations";
import PackagesModel from "@/model/packagesModel";
import { NextResponse } from "next/server";
DbConnect()
export async function GET(req) {
    
return handelAsyncErrors(async()=>{

    let { page, limit, skip } = getPaginationParams(req)

    let data = await PackagesModel.find().skip(skip).limit(limit).exec()
    let result = data.map((e) => ({
        _id: e._id,
        images: e.images,
        title: e.title,
        description: e.description,
        slug: e.slug,
        slug: e.slug,
        package_price: e.package_price,
        package_discounted_price: e.package_discounted_price
    }))
    let totalResults = await PackagesModel.countDocuments()
    return NextResponse.json({status:200, success: true, totalResults, result, page, limit })
})
     
}