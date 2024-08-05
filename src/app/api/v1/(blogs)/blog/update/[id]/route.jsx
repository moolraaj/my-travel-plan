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
    const title = payload.get('title');
    const description = payload.get('description');
    const slug = payload.get('slug');
    const blog_category = payload.get('blog_category');
    const blog_overview = payload.get('blog_overview');
    const blog_description = JSON.parse(payload.get('blog_description'));
    const file = payload.get('file');
    const gallery_files = payload.getAll('gallery_files');

    // Check if all fields are empty
    if (!file && !title && !description && !slug && !blog_category && !blog_overview && !blog_description && gallery_files.length === 0) {
      return NextResponse.json({ status: 400, success: false, message: 'At least one field is required' });
    }

    // Check if blog exists
    let existingBlog = await BlogModel.findById(id);
    if (!existingBlog) {
      return NextResponse.json({ status: 404, success: false, message: 'Blog not found' });
    }

    // Update the fields if they are provided
    if (title) existingBlog.title = title;
    if (description) existingBlog.description = description;
    if (slug) existingBlog.slug = slug;
    if (blog_category) existingBlog.blog_category = blog_category;
    if (blog_overview) existingBlog.blog_overview = blog_overview;
    if (blog_description) existingBlog.blog_description = blog_description;

    // Upload new main image if provided
    if (file) {
      const uploadedFile = await HandleFileUpload(file);
      existingBlog.file = {
        name: uploadedFile.name,
        path: uploadedFile.path,
        contentType: uploadedFile.contentType,
      };
    }

    // Upload gallery images if provided
    if (gallery_files.length > 0) {
      const galleryImages = await Promise.all(gallery_files.map(file => HandleFileUpload(file)));
      existingBlog.gallery_files = galleryImages.map(img => ({
        name: img.name,
        path: img.path,
        contentType: img.contentType,
      }));
    }

    // Save the updated document
    const result = await existingBlog.save();
    return NextResponse.json({ status: 200, success: true, message: 'Blog updated successfully', result });
  });
}
