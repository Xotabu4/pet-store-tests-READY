import { strict as assert } from 'assert'
import { PetController } from '../api/controller/pet.controller';

const pet = new PetController()

describe('Pet', () => {

    it('can be received by id', async function () {
        const petResp = await pet.getById(1)
        assert(petResp.id == 1)
    })

    it('can be received by status', async function () {
        let petResp = await pet.findByStatus('available')
        assert(petResp.length > 0)
        assert(petResp.every((pet: any) => pet.status == 'available'))

        petResp = await pet.findByStatus('pending')
        assert(petResp.length > 0)
        assert(petResp.every((pet: any) => pet.status == 'pending'))

        petResp = await pet.findByStatus('sold')
        assert(petResp.length > 0)
        assert(petResp.every((pet: any) => pet.status == 'sold'))

        petResp = await pet.findByStatus(['pending', 'available'])
        assert(petResp.length > 0)
        assert(petResp.some((pet: any) => pet.status == 'available'))
        assert(petResp.some((pet: any) => pet.status == 'pending'))
        assert(!petResp.some((pet: any) => pet.status == 'sold'))
    })

    it('can be received by tag', async function () {
        const petResp = await pet.findByTags('tag1')
        assert(petResp.length > 0)
        assert(petResp.some((pet: any) => pet.tags.some((tag: any) => tag.name == 'tag1')))
    })

    it('can be added, updated, and deleted', async function () {
        const petToCreate = {
            "category": {
                "id": 0,
                "name": "string"
            },
            "name": "Cat",
            "photoUrls": [
                "http://test.com/image.jpg"
            ],
            "tags": [
                {
                    "id": 0,
                    "name": "string"
                }
            ],
            "status": "available"
        }
        const addedPet = await pet.addNew(petToCreate)
        assert.deepEqual(
            addedPet,
            {
                ...petToCreate,
                id: addedPet.id
            },
            `Expected created pet to match data used upon creation`
        )
        const foundAddedPet = await pet.getById(addedPet.id)
        assert.deepEqual(
            foundAddedPet,
            {
                ...petToCreate,
                id: addedPet.id
            },
            `Expected found pet to match created pet`
        )
        const newerPet = {
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
        const updatedPet = await pet.update(newerPet)
        assert.deepEqual(
            updatedPet,
            {
                ...newerPet,
                id: addedPet.id
            },
            `Expected updated pet to equal data used upon updating`
        )
        await pet.delete(addedPet.id)
        
        // TODO: assert 404 error on attempt to get pet that was deleted

    })

}) 