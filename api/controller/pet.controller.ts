// // Set up Chai
// const chai = require('chai');
// const expect = chai.expect;

// // Import this plugin
// import chaiResponseValidator from 'chai-openapi-response-validator';

// // Load an OpenAPI file (YAML or JSON) into this plugin
// chai.use(chaiResponseValidator('/mnt/c/GitHub/api-project-examples/pet-store-tests-READY/api/controller/swagger.json'));

import { OpenApiValidator } from 'openapi-request-validator/built/v2/OpenApiValidator'

import got from 'got';
import { URLSearchParams } from 'url';

const validator = new OpenApiValidator({
    openApiSpecPath: "./swagger.json",
    apiPathPrefix: '/api',
    // You can see all AJV options here
    // https://github.com/ajv-validator/ajv#options
    ajvOptions: {
        // I recommend to keep allErrors, verbose, and jsonPointers options enabled
        allErrors: true,
        verbose: true,
        jsonPointers: true,

        // Define additional JSON schema formats, if needed
        formats: {
            double: "[+-]?\\d*\\.?\\d+",
            int32: /^(-?\d{1,9}|-?1\d{9}|-?20\d{8}|-?21[0-3]\d{7}|-?214[0-6]\d{6}|-?2147[0-3]\d{5}|-?21474[0-7]\d{4}|-?214748[012]\d{4}|-?2147483[0-5]\d{3}|-?21474836[0-3]\d{2}|214748364[0-7]|-214748364[0-8])$/,
            int64: /^\d+$/,
        },
    },
});

export class PetController {
    async findByTags(tags: string | string[]) {
        const response = await got<any>('http://93.126.97.71:10080/api/pet/findByTags', {
            responseType: 'json',
            searchParams: new URLSearchParams({ tags })
        });
        // expect(response).to.satisfyApiSpec;
        await validator.assertResponse({
            method: response?.request?.options?.method,
            requestUrl: response?.request?.requestUrl,
            statusCode: response?.statusCode,
            body: response.body
        })
        return response.body
    }

    async findByStatus(status: string | string[]) {
        let response = await got<any>('http://93.126.97.71:10080/api/pet/findByStatus', {
            responseType: 'json',
            searchParams: new URLSearchParams({ status })
        });
        // expect(response).to.satisfyApiSpec;
        await validator.assertResponse({
            method: response?.request?.options?.method,
            requestUrl: response?.request?.requestUrl,
            statusCode: response?.statusCode,
            body: response.body
        })
        return response.body;
    }

    async getById(id: number | string) {
        const response = await got<any>(`http://93.126.97.71:10080/api/pet/${id}`, {
            responseType: 'json',
        });
        response.body.id = 'hello world'
        // expect(response).to.satisfyApiSpec;
        await validator.assertResponse({
            method: response?.request?.options?.method,
            requestUrl: response?.request?.requestUrl,
            statusCode: response?.statusCode,
            body: response.body
        })
        return response.body;
    }

}