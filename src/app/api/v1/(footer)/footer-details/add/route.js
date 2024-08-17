import { DbConnect } from "@/database/database";
import { handelAsyncErrors } from "@/helpers/asyncErrors";
import FooterModel from "@/model/footerModel";
import { NextResponse } from "next/server";

 

DbConnect();

export async function POST(req) {

    return handelAsyncErrors(async()=>{

        const payload = await req.json();
        let {phoneNumbers,emailAddresses,address,socialIcons}=payload
        const result = new FooterModel({
            phoneNumbers:phoneNumbers,
            emailAddresses:emailAddresses,
            address:address,
            socialIcons:socialIcons 
        });
         await result.save();

         return NextResponse.json({status:201,message:'content added successfully',result:[result]})
         
    })
   
     
}
