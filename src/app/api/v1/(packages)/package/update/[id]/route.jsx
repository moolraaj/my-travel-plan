import { DbConnect } from "@/database/database";
import { HandleFileUpload } from "@/helpers/uploadFiles";
import PackagesModel from "@/model/packagesModel";
 
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
        const cityId = payload.get('city_id');

        // Check if all fields are empty
        if (!file && !title && !description && !slug&&!cityId) {
            return NextResponse.json({ success: false, message: 'At least one field is required to update' });
        }

        // Check if country exists
        let existingPackage = await PackagesModel.findById(id);
        if (!existingPackage) {
            return NextResponse.json({ success: false, message: 'Country not found' });
        }

        // Update the fields if they are provided
        if (title) existingPackage.title = title;
        if (description) existingPackage.description = description;
        if (slug) existingPackage.slug = slug;

        // Upload new image if provided
        if (file) {
            const uploadedFile = await HandleFileUpload(file);
            const imageObject = {
                name: uploadedFile.name,
                path: uploadedFile.path,
                contentType: uploadedFile.contentType,
            };
            existingPackage.images = [imageObject];
        }
        if(cityId){
            existingPackage.city_id=cityId
        }

        // Save the updated document
        const result = await existingPackage.save();

        return NextResponse.json({ success: true, message: 'Country updated successfully', result });
    } catch (error) {
        console.error('Error in PUT handler:', error);
        return NextResponse.json({ success: false, message: 'An error occurred', error: error.message });
    }
}
