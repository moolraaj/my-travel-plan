import { DbConnect } from "@/database/database";
import continentModel from "@/model/continentModel";
import { NextResponse } from "next/server";
 

DbConnect();

export async function DELETE(req,{params}){
    try {
        let {id}=params
        let productId={_id:id}

        let isIdExist=await continentModel.findOne(productId)

        if(!isIdExist){
            return NextResponse.json({success:false,message:'continent not found try again'})   
        }
     
        let product=await continentModel.deleteOne(productId)

        if(!product){
            return NextResponse.json({success:false,message:'product not found'})

        }
        return NextResponse.json({success:true,message:'product delete successfully',product})
    } catch (error) {
        return NextResponse.json({success:false,message:'error 404'})

    }

}
