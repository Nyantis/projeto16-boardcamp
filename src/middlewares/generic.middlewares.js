export default function schemaValidation(schema, data){
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return {
            code: 400,
            message: errors
        }
    }
    return _continue
}

export async function idParamSanitization(req, res, next) {
    let { id } = req.params
    id = Number.parseInt(id)
    id = isNaN(id) ? "" : id

    res.locals.id = id
    
    next();
  }

export function _continue(info) {
    return {
    code: null,
    message: null,
    ...info
    }
}