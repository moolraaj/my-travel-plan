import { handelAsyncErrors } from "@/helpers/asyncErrors";
import { getPaginationParams } from "@/helpers/paginations";
import OtpUserModel from "@/model/otpUser";
import { NextResponse } from "next/server";

export async function GET(req){
    return handelAsyncErrors(async()=>{
        let {page,limit,skip}=getPaginationParams(req)
        let result=await OtpUserModel.find().skip(skip).limit(limit)
        let totalResult=await OtpUserModel.countDocuments()
        return NextResponse.json({status:200,success:true,totalResult,result,page,limit})
    })
}