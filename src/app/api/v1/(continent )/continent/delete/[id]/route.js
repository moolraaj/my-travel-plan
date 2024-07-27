import { DbConnect } from "@/database/database";
import continentModel from "@/model/continentModel";
import { NextResponse } from "next/server";

DbConnect();

export async function DELETE(req, { params }) {
    try {
        const { id } = params;
        const filterId = { _id: id };

        // Find the continent by ID and populate all countries, cities, and packages
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

        // Check if any countries have cities or packages
        const hasNonEmptyCountries = continent.all_countries.some(country => 
            country.all_cities.length > 0 || 
            country.all_cities.some(city => city.all_packages.length > 0)
        );

        if (hasNonEmptyCountries) {
            return NextResponse.json({ success: false, message: 'Continent cannot be deleted because it has associated countries, cities, or packages' });
        }

        // If no countries, cities, or packages are found, proceed with deletion
        const result = await continentModel.deleteOne(filterId);

        if (result.deletedCount === 0) {
            return NextResponse.json({ success: false, message: 'Continent not deleted' });
        }

        return NextResponse.json({ success: true, message: 'Continent deleted successfully' });
    } catch (error) {
        console.error('Error in DELETE handler:', error);
        return NextResponse.json({ success: false, message: 'An error occurred', error: error.message });
    }
}
