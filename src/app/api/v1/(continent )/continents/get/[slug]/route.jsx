 
import { DbConnect } from "@/database/database";
import continentModel from "@/model/continentModel";
import { NextResponse } from "next/server";

 DbConnect()

export async function GET(req,{params}) {

    let { slug } = params;
    try {
        const findSlug = await continentModel.findOne({ slug })
                                                 .populate( 
                                                    'all_countries'  
                                                 )
                                                 .exec();

        if (findSlug) {
            const result = findSlug.all_countries.map(e => ({
                _id: e._id,      
                images: e.images,
                title: e.title,
                description: e.description,
                slug: e.slug,
                
            }));
            return NextResponse.json({ success: true, result });
        } else {
            return NextResponse.json({ success: false, error: 'School not found' });
        }
    } catch (error) {
        console.error('Error fetching school and classes:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch school and classes' });
    }
}