import { DbConnect } from "@/database/database";
import countriestModel from "@/model/countryModel";
import { NextResponse } from "next/server";
DbConnect()
export async function GET(){
    let data=await countriestModel.find().populate('all_cities').exec()
    let result=data.map((e)=>({
        _id: e._id,      
        images: e.images,
        title: e.title,
        description: e.description,
        slug: e.slug,
        citiesCount:e.all_cities.length
    }))
    let totalResults=await countriestModel.countDocuments()
    return NextResponse.json({success:true,totalResults,result})
}
