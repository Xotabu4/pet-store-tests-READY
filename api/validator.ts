import Ajv from 'ajv'

export function validate(schema: any, body: any) {
    const ajv = new Ajv({
        strict: false,
        allErrors: true,
        verbose: true,
    })
    const validate = ajv.compile(schema)
    const valid = validate(body)
    if (!valid) {
        throw new Error(`Schema validation error: ${JSON.stringify({
            validationErrors: validate.errors
        }, null, 2)}`)
    }
}