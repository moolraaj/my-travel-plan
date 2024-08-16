import { DbConnect } from "@/database/database";
import { handelAsyncErrors } from "@/helpers/asyncErrors";
import { getPaginationParams } from "@/helpers/paginations";
import BookingModel from "@/model/bookingModel";
import { NextResponse } from "next/server";
DbConnect()
export async function GET(req){
    return handelAsyncErrors(async()=>{
        let {page,limit,skip}=getPaginationParams(req)
        let result=await BookingModel.find().limit(limit).skip(skip)
        let totalResults=await BookingModel.countDocuments()
        return NextResponse.json({status:200,totalResults,result,page,limit})
        
    })
}