import { handelAsyncErrors } from "@/helpers/asyncErrors";
import CategoryModel from "@/model/categoryModel";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
    return handelAsyncErrors(async () => {
        let { id } = params;
        let payload = await req.formData();
        let name = payload.get('name');
        let slug = payload.get('slug');

        let isValidId = await CategoryModel.findById(id);
        if (!isValidId) {
            return NextResponse.json({ status: 200, success: false, message: 'missing credentials! please provide a valid id' });
        }

        let result = await CategoryModel.findByIdAndUpdate(id, { $set: { name: name, slug: slug } }, { new: true });

        return NextResponse.json({ status: 200, success: true, message: 'category updated successfully', result });
    });
}
