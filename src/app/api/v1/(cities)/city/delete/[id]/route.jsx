import { DbConnect } from "@/database/database";
import CitiesModel from "@/model/citiesModel";
import { NextResponse } from "next/server";
DbConnect()
export async function DELETE(req, { params }) {
    let { id } = params;

    if (!id) {
        return NextResponse.json({ success: false, message: 'missing credentials' });
    }

    let existingCountry = await CitiesModel.findOne({ _id: id });
    if (!existingCountry) {
        return NextResponse.json({ success: false, message: 'missing credentials' });
    }

    let result = await CitiesModel.deleteOne({ _id: id });
    if (!result) {
        return NextResponse.json({ success: false, message: 'unable to delete country' });
    }

    return NextResponse.json({ success: true, message: 'country deleted successfully', result });
}