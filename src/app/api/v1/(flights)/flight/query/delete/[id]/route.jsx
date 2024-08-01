import { handelAsyncErrors } from "@/helpers/asyncErrors";
import FlightModel from "@/model/fligthModel";
 
import { NextResponse } from "next/server";

export async function DELETE(req,{params}){
    return handelAsyncErrors(async()=>{

        let {id}=params
        let existingUser=await FlightModel.findById({_id:id})
    
        if(!existingUser){
            return NextResponse.json({status:404,success:false,message:'missing credentials! please provide valid id'})
        }

        let result=await FlightModel.deleteOne({_id:id})
    
        return NextResponse.json({status:200,result})
    })
}