import { DbConnect } from "@/database/database";
import { getPaginationParams } from "@/helpers/paginations";
import continentModel from "@/model/continentModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

DbConnect();

export async function GET(req, { params }) {
    const { id } = params;

    // Get pagination parameters
    const { page, limit, skip } = getPaginationParams(req);

    try {
        // Fetch the continent with its related data
        const continent = await continentModel.findById(id).populate({
            path: 'all_countries',
            populate: {
                path: 'all_cities',
                populate: {
                    path: 'all_packages',
                },
            },
        }).exec();

        // Check if the continent exists
        if (!continent) {
            return NextResponse.json({ success: false, error: 'Continent not found' });
        }

        // Get the total count of countries within the continent
        const totalResults = await continentModel.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id)}},
            { $unwind: '$all_countries' },
            { $group: { _id: '$_id', total: { $sum: 1 } } }
        ]).then(results => results[0]?.total || 0);

        // Get the paginated countries
        const countries = continent.all_countries.slice(skip, skip + limit);

        const result = countries.map(country => ({
            _id: country._id,
            images: country.images,
            title: country.title,
            description: country.description,
            slug: country.slug,
            cities: country.all_cities.map(city => ({
                _id: city._id,
                city_name: city.title,
                city_packages_count: city.all_packages.length,
            })),
            total_cities: country.all_cities.length,
        }));

        return NextResponse.json({
            success: true,
            totalResults, // Correctly reflects the total number of countries
            result,
            page,
            limit,
        });
    } catch (error) {
        console.error('Error in GET handler:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch continent and countries', message: error.message });
    }
}
