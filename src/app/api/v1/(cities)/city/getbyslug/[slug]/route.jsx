import { DbConnect } from "@/database/database";
import { getPaginationParams } from "@/helpers/paginations";
import CitiesModel from "@/model/citiesModel";
import { NextResponse } from "next/server";

DbConnect();

export async function GET(req, { params }) {
    const { slug } = params;
    const { page, limit, skip } = getPaginationParams(req);

    try {
        // Fetch the city by slug and populate all packages
        const city = await CitiesModel.findOne({ slug }).populate('all_packages').exec();

        if (!city) {
            return NextResponse.json({ success: false, message: 'City not found' });
        }

        // Calculate the total number of packages for the city
        const totalResults = city.all_packages.length;

        // Paginate the packages
        const paginatedPackages = city.all_packages.slice(skip, skip + limit);

        // Prepare the result object
        const result = {
            _id: city._id,
            title: city.title,
            totalResults, // Total number of packages
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
