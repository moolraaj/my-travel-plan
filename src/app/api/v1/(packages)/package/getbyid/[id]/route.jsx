import { DbConnect } from "@/database/database"
import PackagesModel from "@/model/packagesModel"
import { NextResponse } from "next/server"
DbConnect()
export async function GET(req,{params}){
    let {id}=params
    try {
        let findById=await PackagesModel.findById({_id:id})
        if(findById){
            let result=await PackagesModel.findOne({_id:id})
            return NextResponse.json({success:true,result})
        }
        return NextResponse.json({success:false,message:'missing credential'})
    } catch (error) {
        return NextResponse.json({success:false,message:'internal server error'})
    }
    

    

}