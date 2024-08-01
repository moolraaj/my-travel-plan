import { DbConnect } from "@/database/database";
import { handelAsyncErrors } from "@/helpers/asyncErrors";
import CategoryModel from "@/model/categoryModel";
import { NextResponse } from "next/server";
DbConnect()
export async function POST(req) {

    return handelAsyncErrors(async()=>{
        let payload = await req.formData();
        let name=payload.get('name')
        let slug=payload.get('slug')

        let isExistSlug=await CategoryModel.findOne({slug})
        if(isExistSlug){
            return NextResponse.json({status:200, success: false, message: 'slug is already exist' });
        }
    
        let result = new CategoryModel({ name:name,slug:slug });
        await result.save();
    
        return NextResponse.json({status:201, success: true, message: 'Category created successfully', result });
    })
     
     
}