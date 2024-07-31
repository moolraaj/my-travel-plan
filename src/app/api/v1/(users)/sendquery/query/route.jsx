import { DbConnect } from "@/database/database"
import { SendEmail } from "@/helpers/sendMail"
import { ErrorReporter } from "@/helpers/vinevalidations/errorreporter"
import { contactSchema } from "@/helpers/vinevalidations/validators"
import ContactModel from "@/model/userModel"
import vine, { errors } from "@vinejs/vine"
import { NextResponse } from "next/server"
DbConnect()

export async function POST(req) {
    try {
        let payload = await req.formData();
        let name = payload.get('name');
        let email = payload.get('email');
        let phone_number = payload.get('phone_number');
        let message = payload.get('message');

      

        let data = { name, email, phone_number, message };

        const validator = vine.compile(contactSchema);
        validator.errorReporter = () => new ErrorReporter();
        const output = await validator.validate(data);

        let result = new ContactModel({
            name: output.name,
            email: output.email,
            phone_number: output.phone_number,
            message: output.message,
        });

        await result.save();

        console.log('Validated Output:', output);

        await SendEmail(output);

        return NextResponse.json({ success: true, message: `Dear ${output.name}, your query sent successfully!` });
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            return NextResponse.json({ status: 400, success: false, errors: error.messages });
        } else {
            return NextResponse.json({ status: 400, success: false, errors: { message: 'All fields are required' } });
        }
    }
}



