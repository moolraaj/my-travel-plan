 
import { DbConnect } from "@/database/database";
import continentModel from "@/model/continentModel";
import { NextResponse } from "next/server";

 DbConnect()

export async function GET(req,{params}) {

    let { slug } = params;
    try {
        const findSlug = await continentModel.findOne({ slug }).populate('all_countries').exec();
     
                                                 

        if (findSlug) {
            const result = findSlug.all_countries.map(e => ({
                _id: e._id,      
                images: e.images,
                title: e.title,
                description: e.description,
                slug: e.slug,
                citiesCount:e.all_cities.length
                
            }));

            return NextResponse.json({ success: true,result });
        } else {
            return NextResponse.json({ success: false, error: 'country not found' });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch continent and country' });
    }
}