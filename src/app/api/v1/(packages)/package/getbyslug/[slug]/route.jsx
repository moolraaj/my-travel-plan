import { DbConnect } from "@/database/database";
import { handelAsyncErrors } from "@/helpers/asyncErrors";
import PackagesModel from "@/model/packagesModel";
import { NextResponse } from "next/server";

DbConnect();

export async function GET(req, { params }) {
    return handelAsyncErrors(async () => {

        const { slug } = params;


        // Fetch the package and populate the necessary fields
        const result = await PackagesModel.findOne({ slug })
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
            return NextResponse.json({status:200, success: false, message: 'Package not found' });
        }

        // Structure the result to show the hierarchy in the desired order
        const formattedResult = {
            _id: result._id,
            title: result.title,
            description: result.description,
            slug: result.slug,
            package_price: result.package_price,
            package_discounted_price: result.package_discounted_price,
            package_overview: result.package_overview,
            package_top_summary: result.package_top_summary,
            package_itinerary: result.package_itinerary,
            packages_galleries: result.packages_galleries,
            packages_include: result.packages_include,
            packages_exclude: result.packages_exclude,
            package_under_continent: result.city_id && result.city_id.country_id && result.city_id.country_id.continent_id ? {
                _id: result.city_id.country_id.continent_id._id,
                title: result.city_id.country_id.continent_id.title,
                slug: result.city_id.country_id.continent_id.slug
            } : null,
            package_under_country: result.city_id && result.city_id.country_id ? {
                _id: result.city_id.country_id._id,
                title: result.city_id.country_id.title,
                slug: result.city_id.country_id.slug
            } : null,
            package_under_city: result.city_id ? {
                _id: result.city_id._id,
                title: result.city_id.title,
                slug: result.city_id.slug
            } : null
        };

        return NextResponse.json({status:200, success: true, result: formattedResult });
    })

}
