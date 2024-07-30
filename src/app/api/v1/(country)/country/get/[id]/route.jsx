import { DbConnect } from "@/database/database";
import countryModel from "@/model/countryModel";
import { NextResponse } from "next/server";
import { getPaginationParams } from "@/helpers/paginations"; // Assuming this helper is for pagination
import mongoose from "mongoose";

DbConnect();

export async function GET(req, { params }) {
    let { id } = params;
    let { page, limit, skip } = getPaginationParams(req);

    try {
        // Fetch the country by id and populate all cities and their packages
        const country = await countryModel.findOne({ _id: id }).populate({
            path: 'all_cities',
            populate: {
                path: 'all_packages',
            },
        }).exec();

        if (!country) {
            return NextResponse.json({ success: false, message: 'Country not found' });
        }

        // Get the total count of cities within the country
        const totalResults = await countryModel.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            { $unwind: '$all_cities' },
            { $group: { _id: '$_id', total: { $sum: 1 } } }
        ]).then(results => results[0]?.total || 0);

        // Get the paginated cities
        const paginatedCities = country.all_cities.slice(skip, skip + limit);

        // Map the result to include details of cities and packages
        const result = {
            _id: country._id,
            images: country.images,
            title: country.title,
            description: country.description,
            slug: country.slug,
            totalResults,
            cities: paginatedCities.map(city => ({
                _id: city._id,
                title: city.title,
                // Uncomment and complete this block if you need packages details
                // packages: city.all_packages.map(pkg => ({
                //     _id: pkg._id,
                //     title: pkg.title,
                // })),
                city_packages_count: city.all_packages.length,
            })),
            // total_cities: country.all_cities.length,
            page,
            limit
        };

        return NextResponse.json({ success: true,  result });
    } catch (error) {
        console.error('Error in GET handler:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch country and cities', error: error.message });
    }
}
