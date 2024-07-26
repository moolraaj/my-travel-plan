import { DbConnect } from "@/database/database"
import { NextResponse } from "next/server"

DbConnect()
export async function PUT(req,{params}){
    let {id}=params

    let payload=await req.json()

console.log(id)
    return NextResponse.json({success:true})

}