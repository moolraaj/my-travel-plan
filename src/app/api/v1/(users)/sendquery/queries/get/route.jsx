import ContactModel from "@/model/userModel";
import { NextResponse } from "next/server";

export async function GET(){
    let result=await ContactModel.find()
    let totalResults=await ContactModel.countDocuments()
    return NextResponse.json({status:200,totalResults,result})
}