import { NextResponse } from "next/server";
import { DbConnect } from "@/database/database";
import CitiesModel from "@/model/citiesModel";
import { HandleFileUpload } from "@/helpers/uploadFiles";
import countriesModel from "@/model/countryModel";

DbConnect();

export async function POST(req) {
    try {
        const host = req.headers.get('host'); 
        // Extract data from form data
        const payload = await req.formData();
        const file = payload.get('file');
        const title = payload.get('title');
        const description = payload.get('description');
        const slug = payload.get('slug');
        const country_id = payload.get('country_id');

        // Check if slug already exists
        let existingSlug = await CitiesModel.findOne({ slug });
        if (existingSlug) {
            return NextResponse.json({ success: false, message: 'Slug already exists' });
        }

        // Check if country ID exists
        let existingCountry = await countriesModel.findById(country_id);
        if (!existingCountry) {
            return NextResponse.json({ success: false, message: 'Country ID does not exist' });
        }

        // Upload single image
        const uploadedFile = await HandleFileUpload(file,host);

        const imageObject = {
            name: uploadedFile.name,
            path: uploadedFile.path,
            contentType: uploadedFile.contentType,
            imgurl: uploadedFile.url  
        };

        // Create the new city document
        const newCity = new CitiesModel({
            images: [imageObject],
            title: title,
            description: description,
            slug: slug,
            all_packages: [],
            country_id: country_id,
        });

        // Save the new city document
        const result = await newCity.save();

        // Add the new city's ID to the country's all_cities array
        existingCountry.all_cities.push(result._id);
        await existingCountry.save();

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error('Error in POST handler:', error);
        return NextResponse.json({ success: false, message: 'An error occurred', error: error.message });
    }
}
