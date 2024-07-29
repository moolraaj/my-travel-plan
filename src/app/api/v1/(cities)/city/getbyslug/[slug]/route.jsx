import { DbConnect } from "@/database/database";
import CitiesModel from "@/model/citiesModel";
import { NextResponse } from "next/server";

DbConnect();

export async function GET(req, { params }) {
    let { slug } = params;
    try {
        const findBySlug = await CitiesModel.findOne({ slug }).populate('all_packages').exec();

        if (!findBySlug) {
            return NextResponse.json({ success: false, message: 'City not found' });
        }

        const result = {
            _id: findBySlug._id,
            images: findBySlug.images,
            title: findBySlug.title,
            description: findBySlug.description,
            slug: findBySlug.slug,
            packages: findBySlug.all_packages.map(e => ({
                _id: e._id,
                // images: e.images,
                title: e.title,
                // description: e.description,
                // slug: e.slug,
            })),
            packagesCount:findBySlug.all_packages.length
        };

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error('Error in GET handler:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch city and packages', error: error.message });
    }
}
