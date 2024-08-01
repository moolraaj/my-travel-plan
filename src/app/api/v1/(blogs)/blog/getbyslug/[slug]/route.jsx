import { DbConnect } from "@/database/database";
import { handelAsyncErrors } from "@/helpers/asyncErrors";
 
import BlogModel from "@/model/blogModel";
import { NextResponse } from "next/server";
DbConnect()
export async function GET(req,{params}){
    return handelAsyncErrors(async()=>{
        let {slug}=params
       let isValidSlug=await BlogModel.findOne({slug})
       if(!isValidSlug){
        return NextResponse.json({status:200,success:false,message:'missing credentials! please provide valid slug'})
       }
        let result=await BlogModel.findOne({slug})
        return NextResponse.json({status:200,success:true,result})
    })
}