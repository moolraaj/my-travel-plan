import { DbConnect } from "@/database/database"
import PackagesModel from "@/model/packagesModel"
import { NextResponse } from "next/server"
DbConnect()
export async function GET(req,{params}){
    let {slug}=params
    try {


        
        if(!slug){
            return NextResponse.json({success:false,message:'missing credential'})
        }
        let result=await PackagesModel.findOne({slug})
        if(!result){
            return NextResponse.json({success:false,message:'result not found'})
        }
        
        return NextResponse.json({success:true,result})
    } catch (error) {
        return NextResponse.json({success:false,message:'internal server error'})
    }
    

    

}