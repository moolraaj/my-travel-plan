import { DbConnect } from "@/database/database";
import continentModel from "@/model/continentModel";
import { NextResponse } from "next/server";

DbConnect();

export async function GET(req, { params }) {
    const { id } = params;
    try {
        // Fetch and populate countries, cities, and packages
        const result = await continentModel.findById(id)
            .populate({
                path: 'all_countries',
                populate: {
                    path: 'all_cities',
                    populate: {
                        path: 'all_packages'
                    }
                }
            }).exec();

        if (!result) {
            return NextResponse.json({ success: false, message: 'Continent not found' });
        }

        // Calculate the number of cities in each country and the number of packages in each city
        const countriesWithCounts = result.all_countries.map(country => {
            const citiesWithCounts = country.all_cities.map(city => {
                return {
                    _id: city._id,
                    all_packages_count: city.all_packages.length
                };
            });
            return {
                _id: country._id,
                all_cities_count: country.all_cities.length,
                all_cities: citiesWithCounts
            };
        });

        const response = {
            _id: result._id,
            images: result.images,
            title: result.title,
            description: result.description,
            slug: result.slug,
            totalCountries: result.all_countries.length,
            all_countries: countriesWithCounts
        };

        return NextResponse.json({ success: true, result: response });
    } catch (error) {
        console.error('Error in GET handler:', error);
        return NextResponse.json({ success: false, message: 'An error occurred', error: error.message });
    }
}
