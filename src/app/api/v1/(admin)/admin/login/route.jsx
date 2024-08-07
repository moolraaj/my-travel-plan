import AdminModel from "@/model/adminModel"
import { NextResponse } from "next/server"
import bcryptjs from 'bcryptjs'
export async function POST(req){
    let payload=await req.json()
    let{email,password}=payload
    let isEmail=await AdminModel.findOne({email:email})
    if(isEmail){
        return NextResponse.json({status:200,success:false,message:'email is already exist'})
    }

    let salt=await bcryptjs.genSalt(12)
    let hashedPassword=await bcryptjs.hash(password,salt)

    let result=new AdminModel({
        email:"admin@gmail.com",
        password:hashedPassword
    })
    return NextResponse.json({status:200,message:'admin logged in successfully', result})

}