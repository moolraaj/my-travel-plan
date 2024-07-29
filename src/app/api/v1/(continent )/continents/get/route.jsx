import { DbConnect } from "@/database/database";
import continentModel from "@/model/continentModel";
import { NextResponse } from "next/server";

DbConnect();

export async function GET() {
    try {
        // Fetch and populate all continents with their countries, cities, and packages
        const continents = await continentModel.find().populate({
            path: 'all_countries',
            populate: {
                path: 'all_cities',
                populate: {
                    path: 'all_packages',
                },
            },
        }).exec();

        let totalResults = await continentModel.countDocuments();

        // Map the results to include details of countries, cities, and packages
        let result = continents.map(continent => ({
            _id: continent._id,
            images: continent.images,
            title: continent.title,
            description: continent.description,
            slug: continent.slug,
            countries: continent.all_countries.map(country => ({
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
            })),
            total_countries: continent.all_countries.length,
        }));

        return NextResponse.json({ success: true, totalResults, result });
    } catch (error) {
        console.error('Error in GET handler:', error);
        return NextResponse.json({ success: false, message: 'An error occurred', error: error.message });
    }
}
