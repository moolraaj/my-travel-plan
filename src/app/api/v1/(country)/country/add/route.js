import { DbConnect } from "@/database/database";
import { NextResponse } from "next/server";
import countriesModel from "@/model/countryModel";
import continentModel from "@/model/continentModel";
import { HandleFileUpload } from "@/helpers/uploadFiles";

DbConnect();

export async function POST(req) {
    try {
        // Extract data from formdata
        const payload = await req.formData();
        const file = payload.get('file');
        const title = payload.get('title');
        const description = payload.get('description');
        const slug = payload.get('slug');
        const continent_id = payload.get('continent_id'); // Get the continent ID from the form data

        // Check if slug is already exist
        let existingSlug = await countriesModel.findOne({ slug });

        if (existingSlug) {
            return NextResponse.json({ success: false, message: 'Slug already exists' });
        }

        // Check if the continent ID is valid
        let existingContinent = await continentModel.findById(continent_id);

        if (!existingContinent) {
            return NextResponse.json({ success: false, message: 'Invalid continent ID' });
        }

        // Upload single image
        const uploadedFile = await HandleFileUpload(file);

        const imageObject = {
            name: uploadedFile.name,
            path: uploadedFile.path,
            contentType: uploadedFile.contentType,
        };

        const countryDocument = new countriesModel({
            images: [imageObject],
            title: title,
            description: description,
            slug: slug,
            continent_id: continent_id,
            all_cities: [],
            all_packages: []
        });

        // Save the country document
        const country = await countryDocument.save();

        // Update the continent document to include the new country
        existingContinent.all_countries.push(country._id);
        await existingContinent.save();

        return NextResponse.json({ success: true, country });

    } catch (error) {
        console.error('Error in POST handler:', error);
        return NextResponse.json({ success: false, message: 'An error occurred', error: error.message });
    }
}
