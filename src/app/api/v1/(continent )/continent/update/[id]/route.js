import { DbConnect } from "@/database/database";
import continentModel from "@/model/continentModel";
import { HandleFileUpload } from "@/helpers/uploadFiles";
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


        if(!file||!title||!description||!slug){
            return NextResponse.json({ success: false, message: 'at least one more field is required' });  
        }
        // Check if continent exists
        let existingContinent = await continentModel.findById(id);
        if (!existingContinent) {
            return NextResponse.json({ success: false, message: 'Continent not found' });
        }

        console.log(`existingContinent`)
        console.log(existingContinent)

        // Update the fields
        existingContinent.title = title || existingContinent.title;
        existingContinent.description = description || existingContinent.description;
        existingContinent.slug = slug || existingContinent.slug;

        // Upload new image if provided
        if (file) {
            const uploadedFile = await HandleFileUpload(file);
            const imageObject = {
                name: uploadedFile.name,
                path: uploadedFile.path,
                contentType: uploadedFile.contentType,
            };
            existingContinent.images = [imageObject];
        }

        // Save the updated document
        const updatedContinent = await existingContinent.save();

        return NextResponse.json({ success: true, message: 'Continent updated successfully', updatedContinent });
    } catch (error) {
        console.error('Error in PUT handler:', error);
        return NextResponse.json({ success: false, message: 'An error occurred', error: error.message });
    }
}
