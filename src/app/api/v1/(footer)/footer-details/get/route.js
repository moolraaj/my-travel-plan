import { DbConnect } from "@/database/database";
import { handelAsyncErrors } from "@/helpers/asyncErrors";
import FooterModel from "@/model/footerModel";
import { NextResponse } from "next/server";

 


DbConnect()
export async function GET() {
    return handelAsyncErrors(async()=>{
        const result = await FooterModel.find();
        if (!result) {
            return new NextResponse.json({status:200,message:'there is no record available'});
        }
        return NextResponse.json({status:200,result:[result]})
    })  
}
