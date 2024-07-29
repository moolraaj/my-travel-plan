import { DbConnect } from "@/database/database";
import countriestModel from "@/model/countryModel";
import { NextResponse } from "next/server";
DbConnect()
export async function DELETE(req, { params }) {
    let { id } = params;

    if (!id) {
        return NextResponse.json({ success: false, message: 'missing credentials' });
    }

    let existingCountry = await countriestModel.findOne({ _id: id });
    if (!existingCountry) {
        return NextResponse.json({ success: false, message: 'missing credentials' });
    }

    let result = await countriestModel.deleteOne({ _id: id });
    if (!result) {
        return NextResponse.json({ success: false, message: 'unable to delete country' });
    }

    return NextResponse.json({ success: true, message: 'country deleted successfully', result });
}