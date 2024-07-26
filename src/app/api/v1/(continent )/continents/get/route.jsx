import { DbConnect } from "@/database/database";
import continentModel from "@/model/continentModel";
import { NextResponse } from "next/server";

DbConnect();

export async function GET() {
    try {
        // Fetch and populate countries
        const response = await continentModel.find().populate('all_countries').exec();
        let totalResult=await continentModel.countDocuments()

        let result=response.map((e)=>({
            _id: e._id,
            images: e.images,
            title: e.title,
            description: e.description,
            slug: e.slug,
            countriesCount:e.all_countries.length  
        }))
        
        return NextResponse.json({ success: true,totalResult, result });
    } catch (error) {
        console.error('Error in GET handler:', error);
        return NextResponse.json({ success: false, message: 'An error occurred', error: error.message });
    }
}
