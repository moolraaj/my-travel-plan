import { DbConnect } from "@/database/database";
import { handelAsyncErrors } from "@/helpers/asyncErrors";
import PackageCategoryModel from "@/model/packageCategories";
import { NextResponse } from "next/server";
DbConnect()

export async function GET(req,{params}) {
     return handelAsyncErrors(async()=>{
        let {id}=params

        let isValidId=await PackageCategoryModel.findById({_id:id})
        if(!isValidId){
            return NextResponse.json({status:200,success:false,message:'missing credentials! please provide valid id'})
        }
        let result=await PackageCategoryModel.findOne({_id:id})
    
        return NextResponse.json({status:200, success: true,result });
     })
     
}