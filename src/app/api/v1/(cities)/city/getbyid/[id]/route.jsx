import { DbConnect } from "@/database/database";
import CitiesModel from "@/model/citiesModel";
import { NextResponse } from "next/server";

DbConnect();

export async function GET(req, { params }) {
    let { id } = params;
    try {
        const findById = await CitiesModel.findOne({ _id: id }).populate('all_packages').exec();

        if (!findById) {
            return NextResponse.json({ success: false, message: 'City not found' });
        }

        const result = {
            _id: findById._id,
            images: findById.images,
            title: findById.title,
            description: findById.description,
            slug: findById.slug,
            packages: findById.all_packages.map(e => ({
                _id: e._id,
                // images: e.images,
                title: e.title,
                // description: e.description,
                // slug: e.slug,
            })),
            packagesCount:findById.all_packages.length
        };

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error('Error in GET handler:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch city and packages', error: error.message });
    }
}
