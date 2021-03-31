import { allure } from "allure-mocha/dist/MochaAllureReporter";
import { JsonRequest } from "http-req-builder";
import { ResponseValidator } from "response-openapi-validator";
import { CONFIG } from "../config/npmConfig";

const defaultSwaggerURL = new URL(CONFIG.get('petstore_swagger_url'))
defaultSwaggerURL.pathname = CONFIG.get('petstore_url_prefix_path') + '/swagger.json'

const responseValidator = new ResponseValidator({
    openApiSpecPath: defaultSwaggerURL.toString(),
    apiPathPrefix: CONFIG.get('petstore_url_prefix_path'),
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
    constructor() {
        super();
        this.options = {
            ...this.options,
            hooks: {
                afterResponse: [
                    (response, retryWithMergedOptions) => {
                        const stepName = `${response.statusCode} | ${this?.options?.method ?? 'GET'} ${this?.options?.url} | ${response?.timings?.phases?.total}ms`
                        allure.createStep(stepName, () => {
                            if (this?.options?.json) {
                                allure.createAttachment(`JSON Request BODY`, JSON.stringify(this?.options?.json, null, 2), 'application/json' as any);
                            }
                            if (response.body) {
                                allure.createAttachment(`JSON Response BODY`, JSON.stringify(response.body, null, 2), 'application/json' as any);
                            }
                        })();
                        return response;
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