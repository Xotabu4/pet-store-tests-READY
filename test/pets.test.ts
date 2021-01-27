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

        petResp = await pet.findByStatus('pending')
        assert(petResp.length > 0)

        petResp = await pet.findByStatus('sold')
        assert(petResp.length > 0)

        // Multiple statuses are applicable as well
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
}) 