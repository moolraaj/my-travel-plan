import { DbConnect } from "@/database/database";
import continentModel from "@/model/continentModel";
import { NextResponse } from "next/server";
DbConnect()
export async function GET(){
    let response=await continentModel.find()
 
        const totalResult = await continentModel.countDocuments();
    return NextResponse.json({status:200,totalResult,response})
}