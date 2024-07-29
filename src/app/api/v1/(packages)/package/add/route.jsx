import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid"; // for generating random names
import { DbConnect } from "@/database/database";
import PackagesModel from "@/model/packagesModel";
import { HandleFileUpload } from "@/helpers/uploadFiles";

DbConnect();

export async function POST(req) {
    try {
        const host = req.headers.get('host');

        // Extract data from formdata
        const payload = await req.formData();
        const file = payload.get('file');
        const title = payload.get('title');
        const description = payload.get('description');
        const slug = payload.get('slug');
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

        // Upload single image
        const uploadedFile = await HandleFileUpload(file);
        const randomName = uuidv4() + uploadedFile.name.substring(uploadedFile.name.lastIndexOf('.'));
        const imageUrl = `http://${host}/uploads/${randomName}`;

        const imageObject = {
            name: randomName,
            path: uploadedFile.path,
            contentType: uploadedFile.contentType,
            imgurl: imageUrl
        };

        // Handle multiple gallery images
        const galleryFiles = payload.getAll('gallery_files'); // assuming 'gallery_files' is used for multiple images
        const galleryImages = [];
        for (const galleryFile of galleryFiles) {
            const uploadedGalleryFile = await HandleFileUpload(galleryFile);
            const randomGalleryName = uuidv4() + uploadedGalleryFile.name.substring(uploadedGalleryFile.name.lastIndexOf('.'));
            const galleryImageUrl = `http://${host}/uploads/${randomGalleryName}`;
            galleryImages.push({
                name: randomGalleryName,
                path: uploadedGalleryFile.path,
                contentType: uploadedGalleryFile.contentType,
                imgurl: galleryImageUrl
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
            packages_exclude: packagesExclude
        });

        // Save the package
        const result = await response.save();

        return NextResponse.json({ success: true, result });

    } catch (error) {
        console.error('Error in POST handler:', error);
        return NextResponse.json({ success: false, message: 'An error occurred', error: error.message });
    }
}
