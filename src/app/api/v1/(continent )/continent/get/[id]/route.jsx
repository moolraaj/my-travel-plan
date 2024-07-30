import { DbConnect } from "@/database/database";
 
import continentModel from "@/model/continentModel";
 
import { NextResponse } from "next/server";

DbConnect();

export async function GET(req, { params }) {
    const { id } = params;

    try {
        let result=await continentModel.findOne({_id:id})
        if(!result){
            return NextResponse.json({success:false,message:'missing credentials'})
        }

        return NextResponse.json({success:true,result})

    } catch (error) {
        
    }

     
 
}
