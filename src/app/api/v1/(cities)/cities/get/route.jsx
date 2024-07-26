import { DbConnect } from "@/database/database";
import CitiesModel from "@/model/citiesModel";
import { NextResponse } from "next/server";

DbConnect()
export async function GET(){
    let results=await CitiesModel.find()
    let totalResults=await CitiesModel.countDocuments()
    return NextResponse.json({success:true,totalResults,results})
}