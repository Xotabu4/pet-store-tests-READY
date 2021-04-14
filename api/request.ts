import { JsonRequest } from "http-req-builder";
import { ResponseValidator } from "response-openapi-validator";
import { CONFIG } from "../config/env";

const responseValidator = new ResponseValidator({
    openApiSpecPath: CONFIG.PETSTORE_SWAGGER_URL,
    apiPathPrefix: CONFIG.PETSTORE_API_PREFIX_PATH,
    ajvOptions: {
        allErrors: true,
        verbose: true,
        jsonPointers: true,
        formats: {
            double: "[+-]?\\d*\\.?\\d+",
            int32: /^\d+$/,
            int64: /^\d+$/,
        },
    },
})

export class JsonRequestWithValidation extends JsonRequest {
    async send<T = any>() {
        // Example is simplified: in case 4xx/5xx validation won't be applied
        const response = await super.send<T>()

        await responseValidator.assertResponse({
            method: response.request?.options?.method,
            requestUrl: response?.request?.requestUrl,
            statusCode: response?.statusCode,
            body: response.body,
        });
        return response
    }
}