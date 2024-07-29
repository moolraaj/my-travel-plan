import { DbConnect } from "@/database/database";
import countryModel from "@/model/countryModel";
import { NextResponse } from "next/server";

DbConnect();

export async function GET(req, { params }) {
    let { id } = params;
    try {
        // Fetch the country by slug and populate all cities and their packages
        const country = await countryModel.findOne({ _id:id }).populate({
            path: 'all_cities',
            populate: {
                path: 'all_packages',
            },
        }).exec();

        if (!country) {
            return NextResponse.json({ success: false, message: 'Country not found' });
        }

        // Map the result to include details of cities and packages
        const result = {
            _id: country._id,
            images: country.images,
            title: country.title,
            description: country.description,
            slug: country.slug,
            cities: country.all_cities.map(city => ({
                _id: city._id,
                title: city.title,
               
                //comment to map all packages inside the city
                
                // packages: city.all_packages.map(pkg => ({
                //     _id: pkg._id,
                //     title: pkg.title,
                // })),

                city_packages_count: city.all_packages.length,
            })),
            total_cities: country.all_cities.length,
        };

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error('Error in GET handler:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch country and cities', error: error.message });
    }
}
