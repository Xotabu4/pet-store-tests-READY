import { JsonRequest } from "http-req-builder";
import { ResponseValidator } from "response-openapi-validator";
import { HTTPError } from 'http-req-builder/node_modules/got/dist/source'

const responseValidator = new ResponseValidator({
    openApiSpecPath: 'http://93.126.97.71:10080/api/swagger.json',
    apiPathPrefix: '/api',
    ajvOptions: {
        allErrors: true,
        verbose: true,
        jsonPointers: true,
        formats: {
            double: "[+-]?\\d*\\.?\\d+",
            int32: /^(-?\d{1,9}|-?1\d{9}|-?20\d{8}|-?21[0-3]\d{7}|-?214[0-6]\d{6}|-?2147[0-3]\d{5}|-?21474[0-7]\d{4}|-?214748[012]\d{4}|-?2147483[0-5]\d{3}|-?21474836[0-3]\d{2}|214748364[0-7]|-214748364[0-8])$/,
            int64: /^\d+$/,
        },
    },
})

export class JsonRequestWithValidation extends JsonRequest {
    async send<T = any>() {
        // Example is simplified: in case 4xx/5xx validation won't be applied
        const stack = new Error().stack
        let response;
        try {
            response = await super.send<T>()
        } catch (err) {
            err.stack = stack
            if (err instanceof HTTPError) {
                err.message = `
                [${err?.options?.method}]: ${err?.options?.url} => ${err?.response?.statusCode} 

                ${err.message} 

                ${err?.response?.rawBody?.toString()}
                `
            }

            throw err
        }

        await responseValidator.assertResponse({
            method: response.request?.options?.method,
            requestUrl: response?.request?.requestUrl,
            statusCode: response?.statusCode,
            body: response.body,
        });
        return response
    }
}