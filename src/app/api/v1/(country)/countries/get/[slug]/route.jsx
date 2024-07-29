import { DbConnect } from "@/database/database";
import { getPaginationParams } from "@/helpers/paginations";
import countriestModel from "@/model/countryModel";
import { NextResponse } from "next/server";

DbConnect();

export async function GET(req, { params }) {
    let { slug } = params;
    let { page, limit, skip } = getPaginationParams(req);

    try {
        // Fetch the country by slug and populate all cities and their packages
        const country = await countriestModel.findOne({ slug }).populate({
            path: 'all_cities',
            populate: {
                path: 'all_packages',
            },
        }).exec();

        if (!country) {
            return NextResponse.json({ success: false, message: 'Country not found' });
        }

        // Get the total count of cities within the country
        const totalResults = await countriestModel.aggregate([
            { $match: { slug } },
            { $unwind: '$all_cities' },
            { $group: { _id: '$slug', total: { $sum: 1 } } } // Correct the grouping
        ]).then(results => results[0]?.total || 0);

        // Get the paginated cities
        const paginatedCities = country.all_cities.slice(skip, skip + limit);

        // Include parent country details and paginated cities
        const result = {
            _id: country._id,
            
            title: country.title,
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

        return NextResponse.json({ success: true,result  });
    } catch (error) {
        console.error('Error in GET handler:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch country and cities', error: error.message });
    }
}
