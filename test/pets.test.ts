import got from 'got';
import { strict as assert } from 'assert'
import { URLSearchParams } from 'url';

describe('Pet', () => {
    it('can be received by id', async function () {
        const response = await got('http://93.126.97.71:10080/api/pet/1');
        const body = JSON.parse(response.body);
        assert(body.id == 1)
    })
    it('can be received by status', async function () {
        let searchParams = new URLSearchParams();
        searchParams.append('status', 'available')
        let response = await got('http://93.126.97.71:10080/api/pet/findByStatus', {
            searchParams
        });
        let body = JSON.parse(response.body);
        assert(body.length > 0)

        searchParams = new URLSearchParams();
        searchParams.append('status', 'pending')
        response = await got('http://93.126.97.71:10080/api/pet/findByStatus', {
            searchParams
        });
        body = JSON.parse(response.body);
        assert(body.length > 0)

        searchParams = new URLSearchParams();
        searchParams.append('status', 'sold')
        response = await got('http://93.126.97.71:10080/api/pet/findByStatus', {
            searchParams
        });
        body = JSON.parse(response.body);
        assert(body.length > 0)

        // Multiple statuses are applicable as well

        searchParams = new URLSearchParams();
        searchParams.append('status', 'pending,available')
        response = await got('http://93.126.97.71:10080/api/pet/findByStatus', {
            searchParams
        });
        body = JSON.parse(response.body);
        assert(body.length > 0)
        assert(body.some((pet: any) => pet.status == 'available'))
        assert(body.some((pet: any) => pet.status == 'pending'))
        assert(!body.some((pet: any) => pet.status == 'sold'))
    })
    it('can be received by tag', async function () {
        let searchParams = new URLSearchParams();
        searchParams.append('tags', 'tag1')
        const response = await got('http://93.126.97.71:10080/api/pet/findByTags', {
            searchParams
        });
        const body = JSON.parse(response.body);
        assert(body.length > 0)
        assert(body.some((pet: any) => pet.tags.some((tag: any) => tag.name == 'tag1')))
    })
}) 