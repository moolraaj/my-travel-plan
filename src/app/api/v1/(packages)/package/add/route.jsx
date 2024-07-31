import { NextResponse } from "next/server";
import { DbConnect } from "@/database/database";
import PackagesModel from "@/model/packagesModel";
import { HandleFileUpload } from "@/helpers/uploadFiles";
import CitiesModel from "@/model/citiesModel";

DbConnect();

export async function POST(req) {
    try {
        const host = req.headers.get('host'); // Get host from request headers

        // Extract data from formdata
        const payload = await req.formData();
        const file = payload.get('file');
        const title = payload.get('title');
        const description = payload.get('description');
        const slug = payload.get('slug');
        const city_id = payload.get('city_id');
        const packageOverview = payload.get('package_overview');
        const packageTopSummary = payload.get('package_top_summary');
        const packageItinerary = JSON.parse(payload.get('package_itinerary'));
        const packagesInclude = JSON.parse(payload.get('packages_include'));
        const packagesExclude = JSON.parse(payload.get('packages_exclude'));

        // Check if slug already exists
        let existingSlug = await PackagesModel.findOne({ slug });
        if (existingSlug) {
            return NextResponse.json({ success: false, message: 'Slug already exists' });
        }

        // Check if city ID exists
        let existingCity = await CitiesModel.findById(city_id);
        if (!existingCity) {
            return NextResponse.json({ success: false, message: 'City ID not found' });
        }

        // Upload single image
        const uploadedFile = await HandleFileUpload(file, host);

        const imageObject = {
            name: uploadedFile.name,
            path: uploadedFile.path,
            contentType: uploadedFile.contentType,
            imgurl: uploadedFile.url 
        };

        // Handle multiple gallery images
        const galleryFiles = payload.getAll('gallery_files'); // assuming 'gallery_files' is used for multiple images
        const galleryImages = [];
        for (const galleryFile of galleryFiles) {
            const uploadedGalleryFile = await HandleFileUpload(galleryFile, host);
            galleryImages.push({
                name: uploadedGalleryFile.name,
                path: uploadedGalleryFile.path,
                contentType: uploadedGalleryFile.contentType,
                imgurl: uploadedGalleryFile.url // Use the URL from the helper function
            });
        }

        // Create the package
        const response = new PackagesModel({
            images: [imageObject],
            title: title,
            description: description,
            slug: slug,
            package_overview: packageOverview,
            package_top_summary: packageTopSummary,
            package_itinerary: packageItinerary,
            packages_galleries: galleryImages,
            packages_include: packagesInclude,
            packages_exclude: packagesExclude,
            city_id: city_id,
        });

        // Save the package
        const result = await response.save();

       
        existingCity.all_packages.push(result._id);
        await existingCity.save();

        return NextResponse.json({ success: true, result });

    } catch (error) {
        console.error('Error in POST handler:', error);
        return NextResponse.json({ success: false, message: 'An error occurred', error: error.message });
    }
}
