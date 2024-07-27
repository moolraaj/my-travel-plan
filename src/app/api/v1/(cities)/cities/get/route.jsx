import { DbConnect } from "@/database/database";
import CitiesModel from "@/model/citiesModel";
import { NextResponse } from "next/server";

DbConnect()
export async function GET(){
    let data=await CitiesModel.find().populate('all_packages').exec()
    let result=data.map((e)=>({
        _id: e._id,      
        images: e.images,
        title: e.title,
        description: e.description,
        slug: e.slug,
        packagesCount:e.all_packages.length
    }))
    let totalResults=await CitiesModel.countDocuments()
    return NextResponse.json({success:true,totalResults,result})
}