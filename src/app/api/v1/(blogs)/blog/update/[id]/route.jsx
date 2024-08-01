import { DbConnect } from "@/database/database";
import { handelAsyncErrors } from "@/helpers/asyncErrors";
import { HandleFileUpload } from "@/helpers/uploadFiles";
import BlogModel from "@/model/blogModel";
import { NextResponse } from "next/server";

DbConnect();

export async function PUT(req, { params }) {
    return handelAsyncErrors(async () => {
        let { id } = params;

        // Extract data from formdata
        const payload = await req.formData();
        const file = payload.get('file');
        const title = payload.get('title');
        const description = payload.get('description');
        const slug = payload.get('slug');
        const categoryId = payload.get('blog_category');  

        // Check if all fields are empty
        if (!file && !title && !description && !slug && !categoryId) {
            return NextResponse.json({ status: 200, success: false, message: 'at least one field is required' });
        }

        // Check if blog exists
        let existingBlog = await BlogModel.findById(id);
        if (!existingBlog) {
            return NextResponse.json({ status: 200, success: false, message: 'sorry! Blog not found' });
        }

        // Update the fields if they are provided
        if (title) existingBlog.title = title;
        if (description) existingBlog.description = description;
        if (slug) existingBlog.slug = slug;

        // Upload new image if provided
        if (file) {
            const uploadedFile = await HandleFileUpload(file);
            const imageObject = {
                name: uploadedFile.name,
                path: uploadedFile.path,
                contentType: uploadedFile.contentType,
            };
            existingBlog.images = [imageObject];
        }

 
        if (categoryId) {
            existingBlog.blog_category = categoryId;  
        }

        // Save the updated document
        const result = await existingBlog.save();
        return NextResponse.json({ status: 200, success: true, message: 'Blog updated successfully', result });
    });
}
