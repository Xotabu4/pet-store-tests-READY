import got from 'got';
import { strict as assert } from 'assert'

describe('Pets', () => {
    it('can get pet by id', async function () {
        const response = await got('http://93.126.97.71:10080/api/pet/1');
        const body = JSON.parse(response.body);
        assert(body.id == 1)
    })
}) 