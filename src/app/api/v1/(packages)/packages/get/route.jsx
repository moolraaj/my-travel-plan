import { DbConnect } from "@/database/database";
import PackagesModel from "@/model/packagesModel";
import { NextResponse } from "next/server";
DbConnect
export async function GET(){
    let result=await PackagesModel.find()
    return NextResponse.json({success:true,result})
}