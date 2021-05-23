import { URLSearchParams } from 'url';
import { definitions, operations } from '../../.temp/types'
import { BaseController } from './base.controller';

export class PetController extends BaseController {
    async getById(id: number | string) {
        return (
            await this.request()
                .url(`pet/${id}`)
                .send<operations['getPetById']['responses']['200']['schema']>()
        ).body;
    }

    async findByTags(tags: string | string[]) {
        return (
            await this.request()
                .url('pet/findByTags')
                .searchParams(new URLSearchParams({ tags }))
                .send<operations['findPetsByTags']['responses']['200']['schema']>()
        ).body;
    }

    async findByStatus(status: string | string[]) {
        return (
            await this.request()
                .url(`pet/findByStatus`)
                .searchParams(new URLSearchParams({ status }))
                .send<operations['findPetsByStatus']['responses']['200']['schema']>()
        ).body;
    }


    async addNew(pet: Omit<definitions['Pet'], "id">) {
        return (
            await this.request()
                .url(`pet`)
                .method('POST')
                .body(pet)
                .send<Required<operations['addPet']['responses']['200']['schema']>>()
        ).body;
    }

    async update(pet: definitions['Pet']) {
        return (
            await this.request()
                .url(`pet`)
                .method('PUT')
                .body(pet)
                .send<operations['updatePet']['responses']['200']['schema']>()
        ).body;
    }

    async delete(id: number | string) {
        return (
            await this.request()
                .url(`pet/${id}`)
                .method('DELETE')
                .send<{ message: string }>()
        ).body;
    }
}