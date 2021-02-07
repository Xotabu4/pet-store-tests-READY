import { JsonRequest } from "http-req-builder";
import { operations } from "../../.temp/types";
import { ResponseValidator } from 'response-openapi-validator'

export class StoreController {
    async getInventory() {
        const validator = new ResponseValidator({
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
        const response = await new JsonRequest()
                .url(`http://93.126.97.71:10080/api/store/inventory`)
                .send<operations['getInventory']['responses']['200']['schema']>()

        response.body = {
            hello: 'world'
        } as any
        await validator.assertResponse({
            method: response.request?.options?.method,
            requestUrl: response?.request?.requestUrl,
            statusCode: response?.statusCode,
            body: response.body,
        });

        return response.body;
    }
}