import { DbConnect } from "@/database/database";
import { handelAsyncErrors } from "@/helpers/asyncErrors";
import PackageCategoryModel from "@/model/packageCategories";
import PackagesModel from "@/model/packagesModel"; // Import the PackagesModel
import { NextResponse } from "next/server";

DbConnect();

export async function GET(req, { params }) {
    return handelAsyncErrors(async () => {
        let { slug } = params;

        // Find the category by slug
        let result = await PackageCategoryModel.findOne({ slug });

        if (!category) {
            return NextResponse.json({ status: 200, success: false, message: 'Category not found! Please provide a valid slug.' });
        }

        // Find the packages associated with this category and populate the relevant fields
        let packages = await PackagesModel.find({ package_categories_id: category._id })
            .populate('package_categories_id')  
            .populate('city_id') 
            .exec();

        return NextResponse.json({ status: 200, success: true, result, packages });
    });
}
