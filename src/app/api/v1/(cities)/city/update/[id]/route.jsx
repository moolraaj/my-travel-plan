import { DbConnect } from "@/database/database";
import { handelAsyncErrors } from "@/helpers/asyncErrors";
import { HandleFileUpload } from "@/helpers/uploadFiles";
import CitiesModel from "@/model/citiesModel";

import { NextResponse } from "next/server";

DbConnect();

export async function PUT(req, { params }) {
    return handelAsyncErrors(async () => {
        let { id } = params;

        // Extract data from formdata
        const payload = await req.formData();
        const file = payload.get('file');
        const title = payload.get('title');
        const description = payload.get('description');
        const slug = payload.get('slug');

        // Check if all fields are empty
        if (!file && !title && !description && !slug) {
            return NextResponse.json({status:404, success: false, message: 'at least one more field is required' });
        }
        // Check if country exists
        let existingCountry = await CitiesModel.findById(id);
        if (!existingCountry) {
            return NextResponse.json({status:404, success: false, message: 'sorry! country not found' });
        }
        // Update the fields if they are provided
        if (title) existingCountry.title = title;
        if (description) existingCountry.description = description;
        if (slug) existingCountry.slug = slug;
        // Upload new image if provided
        if (file) {
            const uploadedFile = await HandleFileUpload(file);
            const imageObject = {
                name: uploadedFile.name,
                path: uploadedFile.path,
                contentType: uploadedFile.contentType,

            };
            existingCountry.images = [imageObject];
        }
        // Save the updated document
        const result = await existingCountry.save();
        return NextResponse.json({status:201, success: true, message:'city updated successfully',result });
    })


}
