import { NextResponse } from "next/server";
import { DbConnect } from "@/database/database";
 
import { HandleFileUpload } from "@/helpers/uploadFiles";
 
import { handelAsyncErrors } from "@/helpers/asyncErrors";
import PackagesModel from "@/model/packagesModel";
import CitiesModel from "@/model/citiesModel";

DbConnect();

export async function POST(req) {
    return handelAsyncErrors(async () => {
        const host = req.headers.get('host');

        // Extract data from formdata
        const payload = await req.formData();
        const file = payload.get('file');
        const title = payload.get('title');
        const description = payload.get('description');
        const slug = payload.get('slug');
        const package_price = payload.get('package_price');
        const package_discounted_price = payload.get('package_discounted_price');
        const package_days = payload.get('package_days');
        const package_nights = payload.get('package_nights');
        const city_id = payload.get('city_id');
        const packageOverview = payload.get('package_overview');
        const packageTopSummary = payload.get('package_top_summary');
        const packageItinerary = JSON.parse(payload.get('package_itinerary'));
        const packagesInclude = JSON.parse(payload.get('packages_include'));
        const packagesExclude = JSON.parse(payload.get('packages_exclude'));

      

       

        // Check if slug already exists
        let existingSlug = await PackagesModel.findOne({ slug });
        if (existingSlug) {
            return NextResponse.json({ status: 404, success: false, message: 'Slug already exists' });
        }

        // Check if city ID exists
        let existingCity = await CitiesModel.findById(city_id);
        if (!existingCity) {
            return NextResponse.json({ status: 404, success: false, message: 'City ID does not exist! Please provide a valid city ID' });
        }

        // Upload single image
        const uploadedFile = await HandleFileUpload(file, host);

        const imageObject = {
            name: uploadedFile.name,
            path: uploadedFile.path,
            contentType: uploadedFile.contentType,
        };

        // Handle multiple gallery images
        const galleryFiles = payload.getAll('gallery_files');
        const galleryImages = [];
        for (const galleryFile of galleryFiles) {
            const uploadedGalleryFile = await HandleFileUpload(galleryFile, host);
            galleryImages.push({
                name: uploadedGalleryFile.name,
                path: uploadedGalleryFile.path,
                contentType: uploadedGalleryFile.contentType,
            });
        }

        // Create the package
        const response = new PackagesModel({
            images: [imageObject],
            title: title,
            description: description,
            slug: slug,
            package_price:package_price,
            package_discounted_price:package_discounted_price,
            package_days:package_days,
            package_nights:package_nights,
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

        return NextResponse.json({ status: 201, success: true, result });
    });
}
