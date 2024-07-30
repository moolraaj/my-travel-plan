import { DbConnect } from "@/database/database";
import continentModel from "@/model/continentModel";
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

    await continentModel.updateMany(
        { all_countries: id },
        { $pull: { all_countries: id } }
    );

    return NextResponse.json({ success: true, message: 'country deleted successfully', result });
}