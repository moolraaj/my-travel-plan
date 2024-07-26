import { DbConnect } from "@/database/database";
import countriestModel from "@/model/countryModel";
import { NextResponse } from "next/server";
DbConnect()
export async function GET(){
    let result=await countriestModel.find()
    let totalResults=await countriestModel.countDocuments()
    return NextResponse.json({success:true,totalResults,result})
}