import { DbConnect } from "@/database/database";
import { handelAsyncErrors } from "@/helpers/asyncErrors";
import PackageCategoryModel from "@/model/packageCategories";
import PackagesModel from "@/model/packagesModel";
 
import { NextResponse } from "next/server";

DbConnect();

export async function GET(req, { params }) {
    return handelAsyncErrors(async () => {
        let { id } = params;

        // Find the category by ID
        let result = await PackageCategoryModel.findById(id);

        if (!result) {
            return NextResponse.json({ status: 200, success: false, message: 'Category not found! Please provide a valid ID.' });
        }

        // Find the packages associated with this category and populate the relevant fields
        let packages = await PackagesModel.find({ package_categories_id: result._id })
            .populate('package_categories_id')  
            .populate('city_id')  
            .exec();

        return NextResponse.json({ status: 200, success: true, result, packages });
    });
}
