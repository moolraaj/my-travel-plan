import { DbConnect } from "@/database/database";
import { handelAsyncErrors } from "@/helpers/asyncErrors";
import { HandleFileUpload } from "@/helpers/uploadFiles";
import BlogModel from "@/model/blogModel";
import CategoryModel from "@/model/categoryModel";
import { NextResponse } from "next/server";



DbConnect()

export async function POST(req) {

    return handelAsyncErrors(async () => {
        // Extract data from form data
        const payload = await req.formData();
        const file = payload.get('file');
        const title = payload.get('title');
        const description = payload.get('description');
        const slug = payload.get('slug');
        let blog_category = payload.get('blog_category');

        // Check if the category exists
        let existCategory = await CategoryModel.findById(blog_category);
        if (!existCategory) {
            return NextResponse.json({ status: 400, message: 'missing credentials! please provide valid category id' });
        }


        // Check if slug already exists
        let existingSlug = await BlogModel.findOne({ slug });
        if (existingSlug) {
            return NextResponse.json({ status: 200, success: false, message: 'slug is already exist' });
        }



        // Upload single image
        const uploadedFile = await HandleFileUpload(file);

        const imageObject = {
            name: uploadedFile.name,
            path: uploadedFile.path,
            contentType: uploadedFile.contentType,

        };

        // Create the new city document
        const data = new BlogModel({
            images: [imageObject],
            title: title,
            description: description,
            slug: slug,
            blog_category:blog_category
        });

        // Save the new city document
        const result = await data.save();



        return NextResponse.json({ status: 201, success: true, message: 'blog created successfully', result });
    })



}
