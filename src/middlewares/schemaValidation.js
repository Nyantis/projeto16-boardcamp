export default function schemaValidation(schema, data){
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return errors
    }
    return
}