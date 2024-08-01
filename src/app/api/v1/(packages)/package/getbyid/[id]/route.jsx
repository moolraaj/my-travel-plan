import { DbConnect } from "@/database/database";
import PackagesModel from "@/model/packagesModel";
import { NextResponse } from "next/server";

DbConnect();

export async function GET(req, { params }) {
    const { id } = params;

    try {
        // Fetch the package and populate the necessary fields
        const result = await PackagesModel.findById(id)
            .populate({
                path: 'city_id',
                populate: {
                    path: 'country_id',
                    populate: {
                        path: 'continent_id',
                    }
                }
            });

        if (!result) {
            return NextResponse.json({ success: false, message: 'Package not found' });
        }

        // Structure the result to show the hierarchy in the desired order
        const formattedResult = {
            _id: result._id,
            title: result.title,
            description: result.description,
            slug: result.slug,
            package_overview: result.package_overview,
            package_top_summary: result.package_top_summary,
            package_itinerary: result.package_itinerary,
            packages_galleries: result.packages_galleries,
            packages_include: result.packages_include,
            packages_exclude: result.packages_exclude,
            package_under_continent: {
                _id:result.city_id.country_id.continent_id._id,
                title: result.city_id.country_id.continent_id.title,
                slug: result.city_id.country_id.continent_id.slug
            },
            package_under_country: {
                _id:result.city_id.country_id._id,
                title: result.city_id.country_id.title,
                slug: result.city_id.country_id.slug
            },
            package_under_city: {
                _id: result.city_id._id,
                title: result.city_id.title,
                slug: result.city_id.slug
            }
        };

        return NextResponse.json({ success: true, result: formattedResult });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Internal server error' });
    }
}
