 
import FlightModel from "@/model/fligthModel";
import { NextResponse } from "next/server";

export async function GET(){
    let result=await FlightModel.find()
    let totalResults=await FlightModel.countDocuments()
    return NextResponse.json({status:200,totalResults,result})
}