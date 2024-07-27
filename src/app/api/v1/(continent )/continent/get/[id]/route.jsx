import { DbConnect } from "@/database/database";
import continentModel from "@/model/continentModel";
import { NextResponse } from "next/server";

DbConnect();

export async function GET(req, { params }) {
    const { id } = params;
    try {
        // Fetch the continent by id and populate all countries, cities, and packages
        const continent = await continentModel.findById(id).populate({
            path: 'all_countries',
            populate: {
                path: 'all_cities',
                populate: {
                    path: 'all_packages',
                },
            },
        }).exec();

        if (!continent) {
            return NextResponse.json({ success: false, message: 'Continent not found' });
        }

        // Map the result to include details of cities and packages
        const result = continent.all_countries.flatMap(country => ({
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
            totalCities: country.all_cities.length,
        }));

        const response = {
            _id: continent._id,
            images: continent.images,
            title: continent.title,
            description: continent.description,
            slug: continent.slug,
            countries: result,
            total_countries: continent.all_countries.length,
        };

        return NextResponse.json({ success: true, result: response });
    } catch (error) {
        console.error('Error in GET handler:', error);
        return NextResponse.json({ success: false, message: 'An error occurred', error: error.message });
    }
}
