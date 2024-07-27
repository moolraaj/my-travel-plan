import { DbConnect } from "@/database/database";
import continentModel from "@/model/continentModel";
import { NextResponse } from "next/server";

DbConnect();

export async function GET(req, { params }) {
    const { slug } = params;
    try {
        const continent = await continentModel.findOne({ slug }).populate({
            path: 'all_countries',
            populate: {
                path: 'all_cities',
                populate: {
                    path: 'all_packages',
                },
            },
        }).exec();

        if (continent) {
            const result = continent.all_countries.map(country => ({
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

            return NextResponse.json({ success: true, result });
        } else {
            return NextResponse.json({ success: false, error: 'Continent not found' });
        }
    } catch (error) {
        console.error('Error in GET handler:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch continent and countries', message: error.message });
    }
}
