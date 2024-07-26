import { DbConnect } from "@/database/database"
import continentModel from "@/model/continentModel"
import {  NextResponse } from "next/server"

DbConnect()

 

export async function PUT(req, { params }) {
    let { id } = params;
    let payload = await req.json();
    let { countryRef } = payload;

    // Ensure countryRef is a non-empty array
    if (!Array.isArray(countryRef) || countryRef.length === 0) {
        return NextResponse.json({ success: false, message: 'No countries provided' });
    }

    let filterId = { _id: id };

    // Retrieve the existing continent document
    let existingContinent = await continentModel.findById(filterId);

    if (!existingContinent) {
        return NextResponse.json({ success: false, message: 'Continent not found' });
    }

    // Get the current list of country IDs in the continent
    const existingCountries = existingContinent.all_countries.map(String);  

    // Check for duplicates in the provided countryRef
    const duplicates = countryRef.filter(id => existingCountries.includes(id));

    if (duplicates.length > 0) {
        return NextResponse.json({
            success: false,
            message: 'duplicates countries found !please remove the duplicate entries then proceed to ahaed',
            duplicateEntries:duplicates
        });
    }

    // Proceed with adding new country IDs to the continent
    let resp = await continentModel.findByIdAndUpdate(
        filterId,
        { $addToSet: { all_countries: { $each: countryRef } } },
        { new: true }
    );

    console.log(resp);

    return NextResponse.json({ success: true, message: 'Countries added successfully'});
}
