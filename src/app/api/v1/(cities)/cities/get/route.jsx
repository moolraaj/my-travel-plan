import { DbConnect } from "@/database/database";
import CitiesModel from "@/model/citiesModel";
import { NextResponse } from "next/server";
import { getPaginationParams } from "@/helpers/paginations";
DbConnect();

export async function GET(req) {
    let {page,limit,skip}=getPaginationParams(req)
    try {
        const data = await CitiesModel.find()
            .populate('all_packages')
            .skip(skip)
            .limit(limit)
            .exec();

        const result = data.map(e => ({
            _id: e._id,
            images: e.images,
            title: e.title,
            description: e.description,
            slug: e.slug,
            packages: e.all_packages.map(pkg => ({
                _id: pkg._id,
                title: pkg.title,
            })),
            packagesCount: e.all_packages.length
        }));

        const totalResults = await CitiesModel.countDocuments();

        return NextResponse.json({ success: true, totalResults,result,page,limit});
    } catch (error) {
        console.error('Error in GET handler:', error);
        return NextResponse.json({ success: false, message: 'An error occurred', error: error.message });
    }
}
