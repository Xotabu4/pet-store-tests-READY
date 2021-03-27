import { strict as assert } from 'assert'
import { definitions } from '../.temp/types';
import { ApiClient } from '../api/client';

describe('Pet', () => {
    it('can be received by id', async function () {
        console.log('$$$$', (global as any).config)

        const petResp = await ApiClient.unauthorized().pet.getById(1)
        assert(petResp.id == 1)
    })

    it('can be received by status', async function () {
        const client = ApiClient.unauthorized()
        let petResp = await client.pet.findByStatus('available')
        assert(petResp.length > 0)
        assert(petResp.every(pet => pet.status == 'available'))

        petResp = await client.pet.findByStatus('pending')
        assert(petResp.length > 0)
        assert(petResp.every(pet => pet.status == 'pending'))

        petResp = await client.pet.findByStatus('sold')
        assert(petResp.length > 0)
        assert(petResp.every(pet => pet.status == 'sold'))

        petResp = await client.pet.findByStatus(['pending', 'available'])
        assert(petResp.length > 0)
        assert(petResp.some(pet => pet.status == 'available'))
        assert(petResp.some(pet => pet.status == 'pending'))
        assert(!petResp.some(pet => pet.status == 'sold'))
    })

    it('can be received by tag', async function () {
        const client = ApiClient.unauthorized()
        const petResp = await client.pet.findByTags('tag1')
        assert(petResp.length > 0)
        assert(petResp.some(pet => pet.tags.some(tag => tag.name == 'tag1')))
    })

    it('can be added, updated, and deleted', async function () {
        const adminClient = await ApiClient.loginAs({ username: 'admin', password: 'admin' });

        const petToCreate: Omit<definitions['Pet'], "id"> = {
            category: {
                id: 0,
                name: "string"
            },
            name: "Cat",
            photoUrls: [
                "http://test.com/image.jpg"
            ],
            tags: [
                {
                    id: 0,
                    name: "string"
                }
            ],
            status: "available"
        }

        const addedPet = await adminClient.pet.addNew(petToCreate)
        assert.deepEqual(
            addedPet,
            {
                ...petToCreate,
                id: addedPet.id
            },
            `Expected created pet to match data used upon creation`
        )
        const foundAddedPet = await adminClient.pet.getById(addedPet.id)
        assert.deepEqual(
            foundAddedPet,
            {
                ...petToCreate,
                id: addedPet.id
            },
            `Expected found pet to match created pet`
        )
        const newerPet: definitions['Pet'] = {
            id: addedPet.id,
            category: {
                id: 1,
                name: "string2"
            },
            name: "Dog",
            photoUrls: [
                "http://test.com/image2.jpg"
            ],
            tags: [
                {
                    id: 1,
                    name: "string2"
                }
            ],
            status: "pending"
        }
        const updatedPet = await adminClient.pet.update(newerPet)
        assert.deepEqual(
            updatedPet,
            {
                ...newerPet,
                id: addedPet.id
            },
            `Expected updated pet to equal data used upon updating`
        )
        await adminClient.pet.delete(addedPet.id)
        // TODO: assert 404 error on attempt to get pet that was deleted
    })
})