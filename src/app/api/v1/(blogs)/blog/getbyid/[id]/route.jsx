import { DbConnect } from "@/database/database";
import { handelAsyncErrors } from "@/helpers/asyncErrors";
 
import BlogModel from "@/model/blogModel";
import { NextResponse } from "next/server";
DbConnect()
export async function GET(req,{params}){
    return handelAsyncErrors(async()=>{
        let {id}=params
       let isValidId=await BlogModel.findById({_id:id})
       if(!isValidId){
        return NextResponse.json({status:200,success:false,message:'missing credentials! please provide valid id'})
       }
        let result=await BlogModel.findOne({_id:id})
        return NextResponse.json({status:200,success:true,result})
    })
}