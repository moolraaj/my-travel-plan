import { handelAsyncErrors } from "@/helpers/asyncErrors";
import OtpUserModel from "@/model/otpUser";
import { NextResponse } from "next/server";

export async function POST(req){
    return handelAsyncErrors(async()=>{
        let payload=await req.json()
        let {phoneNumber}=payload
        let isPhoneNumber=await OtpUserModel.findOne({phoneNumber})
        if(isPhoneNumber){
            return NextResponse.json({status:200,success:false,message:'user already exist'})
        }
        let result=new OtpUserModel({
            phoneNumber:phoneNumber
        })
        await result.save()
        return NextResponse.json({status:201,success:true,result})
    })
}