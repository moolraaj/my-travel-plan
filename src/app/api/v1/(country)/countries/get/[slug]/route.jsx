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
        const totalResults = country.all_cities.length;

        // Get the paginated cities
        const paginatedCities = country.all_cities.slice(skip, skip + limit);

        // Map cities to desired format
        const result = paginatedCities.map(city => ({
            _id: city._id,
            images: city.images,
            title: city.title,
            description: city.description,
            slug: city.description,
            city_packages_count: city.all_packages.length,   
        }));

        return NextResponse.json({
            success: true,
            result,  // Only include city details in the result
            totalResults,
            page,
            limit,
        });
    } catch (error) {
        console.error('Error in GET handler:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch country and cities', error: error.message });
    }
}
