import { URLSearchParams } from 'url'
import { JsonRequest } from 'http-req-builder'
import { definitions, operations } from '../../.temp/types'
import { validate } from '../validator'

export class PetController {
    async getById(id: number | string) {
        const body = (
            await new JsonRequest()
                .url(`http://93.126.97.71:10080/api/pet/${id}`)
                .send<operations['getPetById']['responses']['200']['schema']>()
        ).body
        const schema = {
            "$schema": "http://json-schema.org/draft-07/schema",
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer"
                },
                "category": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "integer"
                        },
                        "name": {
                            "type": "string"
                        }
                    }
                },
                "name": {
                    "type": "string"
                },
                "photoUrls": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "tags": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "id": {
                                "type": "integer"
                            },
                            "name": {
                                "type": "string"
                            }
                        }
                    }
                },
                "status": {
                    "type": "string"
                }
            }
        }

        validate(schema, {
            "id": 'Hello',
            "category": {
                "id": 2,
                "name": "Cats"
            },
            "name": 123,
            "photoUrls": [
                "url1",
                "url2"
            ],
            "tags": [{
                "id": 1,
                "name": "tag1"
            },
            {
                "id": 2,
                "name": "tag2"
            }
            ],
            "status": "available"
        })
        return body
    }

    async findByTags(tags: string | string[]) {
        return (
            await new JsonRequest()
                .url('http://93.126.97.71:10080/api/pet/findByTags')
                .searchParams(new URLSearchParams({ tags }))
                .send<operations['findPetsByTags']['responses']['200']['schema']>()
        ).body
    }

    async findByStatus(status: string | string[]) {
        return (
            await new JsonRequest()
                .url('http://93.126.97.71:10080/api/pet/findByStatus')
                .searchParams(new URLSearchParams({ status }))
                .send<operations['findPetsByStatus']['responses']['200']['schema']>()
        ).body
    }

    async addNew(pet: Omit<definitions['Pet'], 'id'>) {
        return (
            await new JsonRequest()
                .url(`http://93.126.97.71:10080/api/pet`)
                .method('POST')
                .body(pet)
                .send<operations['addPet']['responses']['200']['schema']>()
        ).body
    }

    async update(pet: definitions['Pet']) {
        return (
            await new JsonRequest()
                .url(`http://93.126.97.71:10080/api/pet`)
                .method('PUT')
                .body(pet)
                .send<operations['updatePet']['responses']['200']['schema']>()
        ).body
    }

    async delete(id: number | string) {
        return (
            await new JsonRequest()
                .url(`http://93.126.97.71:10080/api/pet/${id}`)
                .method('DELETE')
                .send<definitions['AbstractApiResponse']>()
        ).body
    }
}