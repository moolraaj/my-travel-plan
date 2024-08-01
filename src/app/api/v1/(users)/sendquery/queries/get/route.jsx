import ContactModel from "@/model/userModel";
import { NextResponse } from "next/server";

export async function GET(){
    let result=await ContactModel.find()
    return NextResponse.json({status:200,result})
}