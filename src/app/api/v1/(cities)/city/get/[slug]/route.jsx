 
 
import { DbConnect } from "@/database/database";
import CitiesModel from "@/model/citiesModel";
 
import { NextResponse } from "next/server";

DbConnect()
export async function GET(req,{params}) {
    let { slug } = params;
    try {
        const findSlug = await CitiesModel.findOne({ slug }).populate('all_packages').exec();
        if (findSlug) {
            const result = findSlug.all_packages.map(e => ({
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