import { DbConnect } from "@/database/database";
import { getPaginationParams } from "@/helpers/paginations";
import CitiesModel from "@/model/citiesModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

DbConnect();

export async function GET(req, { params }) {
    let { id } = params;
    try {
        // Extract pagination parameters from the request
        const { page, limit, skip } = getPaginationParams(req);

        // Fetch the city by its ID and populate all packages
        const findById = await CitiesModel.findOne({ _id: id }).populate('all_packages').exec();

        if (!findById) {
            return NextResponse.json({ success: false, message: 'City not found' });
        }

        // Get the total count of packages within the city
        const totalResults = await CitiesModel.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            { $unwind: '$all_packages' },
            { $group: { _id: '$_id', total: { $sum: 1 } } }
        ]).then(results => results[0]?.total || 0);


     

        // Get the paginated packages
        const paginatedPackages = findById.all_packages.slice(skip, skip + limit);

        // Map the result to include details of the city and its packages
        const result = {
            _id: findById._id,
            title: findById.title,
            totalResults,
            packages: paginatedPackages.map(pkg => ({
                _id: pkg._id,
                images: pkg.images,
                title: pkg.title,
                description: pkg.description,
                slug: pkg.slug,
            })),
            page,
            limit
        };

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error('Error in GET handler:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch city and packages', error: error.message });
    }
}
