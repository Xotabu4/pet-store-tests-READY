import { URLSearchParams } from 'url';
import { definitions, operations } from '../../.temp/types'
import { JsonRequest } from 'http-req-builder';
import { loadAPISpec, validate } from '../validator';

export class PetController {
    async getById(id: number | string) {
        let body = (
            await new JsonRequest()
                .url(`http://93.126.97.71:10080/api/pet/${id}`)
                .send<operations['getPetById']['responses']['200']['schema']>()
        ).body;

        const apiSpec = await loadAPISpec()
        const schema = apiSpec.paths['/pet/{petId}']['get']['responses']['200']['schema']

        body = { test: 'hello' } as any
        validate(schema, body)

        return body
    }
    
    async findByTags(tags: string | string[]) {
        return (
            await new JsonRequest()
                .url(`http://93.126.97.71:10080/api/pet/findByTags`)
                .searchParams(new URLSearchParams({ tags }))
                .send<operations['findPetsByTags']['responses']['200']['schema']>()
        ).body;
    }

    async findByStatus(status: string | string[]) {
        return (
            await new JsonRequest()
                .url(`http://93.126.97.71:10080/api/pet/findByStatus`)
                .searchParams(new URLSearchParams({ status }))
                .send<operations['findPetsByStatus']['responses']['200']['schema']>()
        ).body;
    }

    async addNew(pet: Omit<definitions['Pet'], "id">) {
        return (
            await new JsonRequest()
                .url(`http://93.126.97.71:10080/api/pet`)
                .method('POST')
                .body(pet)
                .send<Required<operations['addPet']['responses']['200']['schema']>>()
        ).body;
    }

    async update(pet: definitions['Pet']) {
        return (
            await new JsonRequest()
                .url(`http://93.126.97.71:10080/api/pet`)
                .method('PUT')
                .body(pet)
                .send<operations['updatePet']['responses']['200']['schema']>()
        ).body;
    }

    async delete(id: number | string) {
        return (
            await new JsonRequest()
                .url(`http://93.126.97.71:10080/api/pet/${id}`)
                .method('DELETE')
                .send<{ message: string }>()
        ).body;
    }

}