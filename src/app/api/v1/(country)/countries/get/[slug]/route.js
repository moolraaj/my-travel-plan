import { DbConnect } from "@/database/database";
import countriestModel from "@/model/countryModel";
import { NextResponse } from "next/server";
import { getPaginationParams } from "@/helpers/paginations";

DbConnect();

export async function GET(req, { params }) {
    let { slug } = params;
    let { page, limit, skip } = getPaginationParams(req);

    try {
        // Aggregation pipeline
        const pipeline = [
            // Match the country by slug
            { $match: { slug } },

            // Lookup to join with cities
            { $lookup: {
                from: 'cities', // The collection where 'all_cities' are stored
                localField: 'all_cities',
                foreignField: '_id',
                as: 'cities'
            }},
            { $unwind: '$cities' }, // Unwind cities array

            // Lookup to join cities with their packages
            { $lookup: {
                from: 'packages', // The collection where 'all_packages' are stored
                localField: 'cities.all_packages',
                foreignField: '_id',
                as: 'cities.all_packages'
            }},

            // Project fields and count packages
            { $project: {
                _id: 1,
                'cities._id': 1,
                'cities.images': 1,
                'cities.title': 1,
                'cities.description': 1,
                'cities.slug': 1,
                'cities.all_packages_count': { $size: '$cities.all_packages' }
            }},

            // Pagination
            { $skip: skip },
            { $limit: limit }
        ];

        const country = await countriestModel.aggregate(pipeline).exec();

        if (country.length === 0) {
            return NextResponse.json({ success: false, message: 'Country not found' });
        }

        // Count total results
        const totalResults = await countriestModel.aggregate([
            { $match: { slug } },
            { $lookup: {
                from: 'cities',
                localField: 'all_cities',
                foreignField: '_id',
                as: 'cities'
            }},
            { $unwind: '$cities' },
            { $count: 'total' }
        ]).exec();

        const total = totalResults.length ? totalResults[0].total : 0;

        // Set caching headers
        const headers = new Headers();
        headers.set('Cache-Control', 'max-age=60'); // Cache for 60 seconds

        return NextResponse.json({
            success: true,
            result: country,  
            totalResults: total,
            page,
            limit,
        }, { headers });
    } catch (error) {
        console.error('Error in GET handler:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch country and cities', error: error.message });
    }
}
