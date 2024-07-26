 
 
import { DbConnect } from "@/database/database";
import countriestModel from "@/model/countryModel";
import { NextResponse } from "next/server";

DbConnect()
export async function GET(req,{params}) {
    let { slug } = params;
    try {
        const findSlug = await countriestModel.findOne({ slug })
                                                 .populate( 
                                                    'all_cities'  
                                                 )
                                                 .exec();

        if (findSlug) {
            const result = findSlug.all_cities.map(e => ({
                _id: e._id,      
                images: e.images,
                title: e.title,
                description: e.description,
                slug: e.slug,
                
            }));
            return NextResponse.json({ success: true, result });
        } else {
            return NextResponse.json({ success: false, error: 'city not found' });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch country and city' });
    }
}