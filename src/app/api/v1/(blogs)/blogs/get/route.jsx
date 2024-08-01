import { DbConnect } from "@/database/database";
import { handelAsyncErrors } from "@/helpers/asyncErrors";
import { getPaginationParams } from "@/helpers/paginations";
import BlogModel from "@/model/blogModel";
import { NextResponse } from "next/server";
DbConnect()
export async function GET(req){
    return handelAsyncErrors(async()=>{
        let{page,limit,skip}=getPaginationParams(req)
        let result=await BlogModel.find().limit(limit).skip(skip)
        let totalresults=await BlogModel.countDocuments()
        return NextResponse.json({status:200,success:true,totalresults,result,page,limit})
    })
}