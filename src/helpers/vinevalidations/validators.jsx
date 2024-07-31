import  vine  from '@vinejs/vine';

const imageValidationSchema = vine.object({
    name: vine.string().minLength(1),
    path: vine.string().minLength(1),
    contentType: vine.string().minLength(1),
});

const ContinentSchema = vine.object({
    title: vine.string().minLength(4),
    description: vine.string().minLength(20),
    slug: vine.string().minLength(4),
    image: vine.any(imageValidationSchema),
});





export default ContinentSchema;




export const contactSchema = vine.object({
    name: vine.string().minLength(4),
    email: vine.string().email(),
    phone_number: vine.string().maxLength(10, 'phone number can\'t exceed 10 digits').regex(/^\d{10}$/, 'phone number must be exactly 10 digits'),
    message: vine.string().minLength(10)
});

