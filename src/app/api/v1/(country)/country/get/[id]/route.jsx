import { DbConnect } from "@/database/database";
import countryModel from "@/model/countryModel";
import { NextResponse } from "next/server";


DbConnect();

export async function GET(req, { params }) {
    let { id } = params;
    try {
         let result=await countryModel.findOne({_id:id})
         if(!result){
             return NextResponse.json({ success: false,  message:'missing credentials' });
         }
         return NextResponse.json({ success: true,  result });
    } catch (error) {
        console.error('Error in GET handler:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch country and cities', error: error.message });
    }
}
