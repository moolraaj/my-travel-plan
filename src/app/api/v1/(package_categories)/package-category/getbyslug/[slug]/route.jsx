import { DbConnect } from "@/database/database";
import { handelAsyncErrors } from "@/helpers/asyncErrors";
 
import PackageCategoryModel from "@/model/packageCategories";
import { NextResponse } from "next/server";
DbConnect()
export async function GET(req,{params}) {
     return handelAsyncErrors(async()=>{
        let {slug}=params

        let isValidId=await PackageCategoryModel.findOne({slug}).populate('packages_id').exec()
        console.log(`isValidId`)
        console.log(isValidId)
        if(!isValidId){
            return NextResponse.json({status:200,success:false,message:'missing credentials! please provide valid slug'})
        }

        let result=await PackageCategoryModel.findOne({slug})
    
        return NextResponse.json({status:200, success: true,result });
     })
     
}