import { DbConnect } from "@/database/database";
import countriestModel from "@/model/countryModel";
import { NextResponse } from "next/server";
DbConnect()
export async function GET(){
    let data=await countriestModel.find().populate({path:'all_cities',path: 'all_cities',
        populate: {
            path: 'all_packages',
        },}).exec()

        console.log(data)

    let result=data.map((e)=>({
        _id: e._id,      
        images: e.images,
        title: e.title,
        description: e.description,
        slug: e.slug,
        cities:e.all_cities.map((city)=>({
            _id: city._id,      
            title: city.title, 
            city_packages_count:city.all_packages.length
        })),
        total_cities:e.all_cities.length
    }))
    let totalResults=await countriestModel.countDocuments()
    return NextResponse.json({success:true,totalResults,result})
}
