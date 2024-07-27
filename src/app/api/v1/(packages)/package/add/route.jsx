 
import { NextResponse } from "next/server";

 
 
import { DbConnect } from "@/database/database";
import PackagesModel from "@/model/packagesModel";
import { HandleFileUpload } from "@/helpers/uploadFiles";
 
 
 
 
DbConnect() 



export async function POST(req) {
    try {
        
        //extract data from formdata
        const payload = await req.formData();
        const file = payload.get('file');
        const title = payload.get('title');
        const description = payload.get('description');
        const slug = payload.get('slug');

      

        // check if slug is already exist
        
        let existingSlug=await PackagesModel.findOne({slug})
        if(existingSlug){
            return NextResponse.json({ success: false, message: 'slug is already exist' }); 
        }
       
        // upload single image
        const uploadedFile = await HandleFileUpload(file);

        const imageObject = {
            name: uploadedFile.name,
            path: uploadedFile.path,
            contentType: uploadedFile.contentType,
        };

     
        const response = new PackagesModel({
            images: [imageObject],
            title: title,
            description: description,
            slug: slug,
        });

        // get total result of the continents
        const result = await response.save();

        return NextResponse.json({ success: true, result });

    } catch (error) {
        console.error('Error in POST handler:', error);
        return NextResponse.json({ success: false, message: 'An error occurred', error: error.message });
    }
}
