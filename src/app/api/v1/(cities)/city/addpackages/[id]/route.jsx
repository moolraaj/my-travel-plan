 
import { DbConnect } from "@/database/database";
import CitiesModel from "@/model/citiesModel";
import {  NextResponse } from "next/server"

DbConnect()

 

export async function PUT(req, { params }) {
    let { id } = params;
    let payload = await req.json();
    let { packagesRef } = payload;

    // Ensure countryRef is a non-empty array
    if (!Array.isArray(packagesRef) || packagesRef.length === 0) {
        return NextResponse.json({ success: false, message: 'No packages provided' });
    }

    let filterId = { _id: id };

    // Retrieve the existing continent document
    let existingCities = await CitiesModel.findById(filterId);

    if (!existingCities) {
        return NextResponse.json({ success: false, message: 'Continent not found' });
    }

    // Get the current list of country IDs in the continent
    const existingPackages = existingCities.all_packages.map(String);  

    // Check for duplicates in the provided countryRef
    const duplicates = packagesRef.filter(id => existingPackages.includes(id));

    if (duplicates.length > 0) {
        return NextResponse.json({
            success: false,
            message: 'duplicates countries found !please remove the duplicate entries then proceed to ahaed',
            duplicateEntries:duplicates
        });
    }

    // Proceed with adding new country IDs to the continent
    let resp = await CitiesModel.findByIdAndUpdate(
        filterId,
        { $addToSet: { all_packages: { $each: packagesRef } } },
        { new: true }
    );

    console.log(`resp`)
    console.log(resp)
     

     

    return NextResponse.json({ success: true, message: 'Packages added successfully'});
}
