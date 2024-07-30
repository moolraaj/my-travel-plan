import { DbConnect } from "@/database/database";
import CitiesModel from "@/model/citiesModel";
import { NextResponse } from "next/server";

DbConnect();

export async function GET(req, { params }) {
    let { id } = params;
    try {
        let result=await CitiesModel.findOne({_id:id})
        if(!result){
            return NextResponse.json({ success: false, message:'missing credentials' }); 
        }


        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error('Error in GET handler:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch city and packages', error: error.message });
    }
}
