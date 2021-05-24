import { JsonRequest } from "http-req-builder";
import { ResponseValidator } from "response-openapi-validator";
import { CONFIG } from "../config/env";
import { allure } from 'allure-mocha/dist/MochaAllureReporter'

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
    constructor() {
        super()
        this.options = {
            ...this.options,
            hooks: {
                afterResponse: [
                    (response) => {
                        const stepName = `[${response.statusCode}] ${this?.options?.method ?? 'GET'} ${this?.options?.url}`

                        const step = allure.createStep(stepName, () => {
                            if (this?.options?.json) {
                                allure.createAttachment(
                                    'JSON REQUEST BODY',
                                    JSON.stringify(this?.options?.json, null, 2),
                                    'application/json' as any
                                )
                            }

                            if (response?.body) {
                                allure.createAttachment(
                                    'JSON RESPONSE BODY',
                                    JSON.stringify(response?.body, null, 2),
                                    'application/json' as any
                                )
                            }
                        })

                        step()

                        return response
                    }
                ]
            }
        }
    }

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