import { DbConnect } from "@/database/database";
import { handelAsyncErrors } from "@/helpers/asyncErrors";
import { getPaginationParams } from "@/helpers/paginations";
import CitiesModel from "@/model/citiesModel";
import { NextResponse } from "next/server";

DbConnect();

export async function GET(req, { params }) {

    return handelAsyncErrors(async () => {
        const { slug } = params;
        const { page, limit, skip } = getPaginationParams(req);
        // Fetch the city by slug and populate all packages
        const city = await CitiesModel.findOne({ slug }).populate('all_packages').exec();
        if (!city) {
            return NextResponse.json({ success: false, message: 'missing slug! please provide valid slug' });
        }
        // Calculate the total number of packages for the city
        const totalResults = city.all_packages.length;

        // Paginate the packages
        const paginatedPackages = city.all_packages.slice(skip, skip + limit);

        const result = {
            _id: city._id,
            title: city.title,
            totalResults, 
            packages: paginatedPackages.map(pkg => ({
                _id: pkg._id,
                images: pkg.images,
                title: pkg.title,
                description: pkg.description,
                slug: pkg.slug,
            })),
            page,
            limit
        };
        return NextResponse.json({status:200, success: true, result });
    })
}
