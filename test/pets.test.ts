import { strict as assert } from 'assert'
import { PetController } from '../api/controller/pet-no-builder.controller';

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
        // {
        //     "id": 0,
        //     "category": {
        //       "id": 0,
        //       "name": "string"
        //     },
        //     "name": "doggie",
        //     "photoUrls": [
        //       "string"
        //     ],
        //     "tags": [
        //       {
        //         "id": 0,
        //         "name": "string"
        //       }
        //     ],
        //     "status": "available"
        //   }
    })
    
}) 