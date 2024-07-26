import { DbConnect } from "@/database/database";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import ContinentModel from "@/model/continentModel"; // Ensure correct import path

DbConnect();

export async function POST(req) {
    try {
        // Retrieve form data
        const payload = await req.formData();
        const file = payload.get('file');
        const title = payload.get('title');
        const description = payload.get('description');

        // Validate required fields
        if (!file || !title || !description) {
            return NextResponse.json({ success: false, message: 'Missing required fields' });
        }

        // Process file
        const bufferData = await file.arrayBuffer();
        const bufferObject = Buffer.from(bufferData);
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
        await mkdir(uploadsDir, { recursive: true });
        const filePath = path.join(uploadsDir, file.name);
        await writeFile(filePath, bufferObject);

        // Create image object
        const imageObject = {
            name: file.name,
            ContentType: file.type,
        };

        

        // Create and save new document
        const continentDocument = new ContinentModel({
            images: [imageObject],
            title: title,
            description: description,
        });
        const savedDocument = await continentDocument.save();
        return NextResponse.json({ success: true, response: savedDocument });

    } catch (error) {
        console.error('Error in POST handler:', error);
        return NextResponse.json({ success: false, message: 'An error occurred', error: error.message });
    }
}
