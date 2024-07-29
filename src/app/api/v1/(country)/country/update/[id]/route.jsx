import { DbConnect } from "@/database/database";
import { HandleFileUpload } from "@/helpers/uploadFiles";
import countryModel from "@/model/countryModel";
import { NextResponse } from "next/server";

DbConnect();

export async function PUT(req, { params }) {
    let { id } = params;
    try {
        // Extract data from formdata
        const payload = await req.formData();
        const file = payload.get('file');
        const title = payload.get('title');
        const description = payload.get('description');
        const slug = payload.get('slug');

        // Check if all fields are empty
        if (!file && !title && !description && !slug) {
            return NextResponse.json({ success: false, message: 'At least one field is required to update' });
        }

        // Check if country exists
        let existingCountry = await countryModel.findById(id);
        if (!existingCountry) {
            return NextResponse.json({ success: false, message: 'Country not found' });
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

        return NextResponse.json({ success: true, message: 'Country updated successfully', result });
    } catch (error) {
        console.error('Error in PUT handler:', error);
        return NextResponse.json({ success: false, message: 'An error occurred', error: error.message });
    }
}
