import Ajv from 'ajv';
import SwaggerParser from "@apidevtools/swagger-parser";

export async function loadAPISpec() {
    return SwaggerParser.dereference('http://93.126.97.71:10080/api/swagger.json');
}

export function validate(schema: any, body: any) {
    const ajv = new Ajv({
        strict: false,
        allErrors: true,
        verbose: true,
        formats: {
            double: "[+-]?\\d*\\.?\\d+",
            int32: /^(-?\d{1,9}|-?1\d{9}|-?20\d{8}|-?21[0-3]\d{7}|-?214[0-6]\d{6}|-?2147[0-3]\d{5}|-?21474[0-7]\d{4}|-?214748[012]\d{4}|-?2147483[0-5]\d{3}|-?21474836[0-3]\d{2}|214748364[0-7]|-214748364[0-8])$/,
            int64: /^\d+$/,
        },
    });
    const validate = ajv.compile(schema);
    const valid = validate(body);
    if (!valid) {
        throw new Error(`Swagger validation errors: ${JSON.stringify({
            // body: body,
            validationErrors: validate.errors
        }, null, 2)}`)
    }
}