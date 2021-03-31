/**
 * @url https://github.com/kochetkov-ma/allure-server
*/

const got = require('got')
const fs = require('fs');
const FormData = require('form-data');

const baseUrl = new URL(`http://93.126.97.71:5001`)

const baseGot = got.extend({
    prefixUrl: baseUrl,
    responseType: 'json'
});

async function uploadAndGenerate() {
    const form = new FormData();
    form.append('allureResults', fs.createReadStream('./allure-results.zip'));
    const resultsResp = await baseGot('api/result', {
        method: 'POST',
        body: form,
    })
    console.log(`Upload done: `, resultsResp.body)
    const results_id = resultsResp.body.uuid
    const reportUrl = await baseGot('api/report', {
        method: 'POST',
        json: {
            "reportSpec": {
                "path": [
                    "pet-store-tests-READY"
                ]
            },
            "results": [
                results_id
            ],
            "deleteResults": true
        }
    })
    console.log(`Report generation done: `, reportUrl.body)

    console.log(`========================================================================`)
    console.log(`REPORT URL: `, reportUrl.body.url)
    console.log(`========================================================================`)
}

uploadAndGenerate().catch(err => {
    throw err
})