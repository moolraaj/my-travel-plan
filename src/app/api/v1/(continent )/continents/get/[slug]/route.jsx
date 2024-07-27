import { DbConnect } from "@/database/database";
import continentModel from "@/model/continentModel";
import { NextResponse } from "next/server";

DbConnect();

export async function GET(req, { params }) {
    const { slug } = params;
    try {
        // Fetch the continent by slug and populate all countries, cities, and packages
        const findSlug = await continentModel.findOne({ slug }).populate({
            path: 'all_countries', // Populate countries
            populate: {
                path: 'all_cities', // Populate cities within each country
                populate: {
                    path: 'all_packages', // Populate packages within each city
                },
            },
        }).exec();

        if (findSlug) {
            // Map the result to include details of cities and packages
            const result = findSlug.all_countries.flatMap(country => ({
                _id: country._id,
                images: country.images,
                title: country.title,
                description: country.description,
                slug: country.slug,

                cities: country.all_cities.map(city => ({
                    _id: city._id,
                    city_name: city.title,
                    city_packages_Count: city.all_packages.length,
                })),
                totalCities: country.all_cities.length,
            }));

            return NextResponse.json({ success: true, result });
        } else {
            return NextResponse.json({ success: false, error: 'Continent not found' });
        }
    } catch (error) {
        console.error('Error in GET handler:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch continent and countries', message: error.message });
    }
}
