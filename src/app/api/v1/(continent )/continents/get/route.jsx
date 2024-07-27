import { DbConnect } from "@/database/database";
import continentModel from "@/model/continentModel";
import { NextResponse } from "next/server";

DbConnect();

export async function GET() {
    try {
        // Fetch and populate countries
        const response = await continentModel.find().populate('all_countries').exec();
        let totalResults=await continentModel.countDocuments()

        let result=response.map((e)=>({
            _id: e._id,
            images: e.images,
            title: e.title,
            description: e.description,
            slug: e.slug,
            countriesCount:e.all_countries.length  
        }))
<<<<<<< HEAD

        return NextResponse.json({ success: true,totalResult, result });
=======
        
        return NextResponse.json({ success: true,totalResults, result });
>>>>>>> 84af8ab7b7b709b5cc3d8380d538f4a673e7f7d9
    } catch (error) {
        console.error('Error in GET handler:', error);
        return NextResponse.json({ success: false, message: 'An error occurred', error: error.message });
    }
}
