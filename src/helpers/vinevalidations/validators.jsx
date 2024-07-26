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
