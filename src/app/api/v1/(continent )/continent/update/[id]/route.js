import { DbConnect } from "@/database/database";
import { HandleFileUpload } from "@/helpers/uploadFiles";
import continentModel from "@/model/continentModel";
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
        let existingContinent = await continentModel.findById(id);
        if (!existingContinent) {
            return NextResponse.json({ success: false, message: 'Country not found' });
        }

        // Update the fields if they are provided
        if (title) existingContinent.title = title;
        if (description) existingContinent.description = description;
        if (slug) existingContinent.slug = slug;

        // Upload new image if provided
        if (file) {
            const uploadedFile = await HandleFileUpload(file);
            const imageObject = {
                name: uploadedFile.name,
                path: uploadedFile.path,
                contentType: uploadedFile.contentType,
                imgurl: uploadedFile.url 
            };
            existingContinent.images = [imageObject];
        }

        // Save the updated document
        const result = await existingContinent.save();

        return NextResponse.json({ success: true, message: 'Country updated successfully', result });
    } catch (error) {
        console.error('Error in PUT handler:', error);
        return NextResponse.json({ success: false, message: 'An error occurred', error: error.message });
    }
}
