import got from 'got';
import { URLSearchParams } from 'url';

export class PetController {
    async addNew(pet: { category: { id: number; name: string; }; name: string; photoUrls: string[]; tags: { id: number; name: string; }[]; status: string; }) {
        const response = await got(`http://93.126.97.71:10080/api/pet`, {
            method: 'POST',
            json: pet
        });
        return JSON.parse(response.body);
    }

    async update(pet: { id: number, category: { id: number; name: string; }; name: string; photoUrls: string[]; tags: { id: number; name: string; }[]; status: string; }) {
        const response = await got(`http://93.126.97.71:10080/api/pet`, {
            method: 'PUT',
            json: pet
        });
        return JSON.parse(response.body);
    }

    async delete(id: number | string) {
        const response = await got(`http://93.126.97.71:10080/api/pet/${id}`, {
            method: 'DELETE',
        });
        return JSON.parse(response.body);
    }

    async findByTags(tags: string | string[]) {
        const response = await got('http://93.126.97.71:10080/api/pet/findByTags', {
            searchParams: new URLSearchParams({ tags })
        });
        return JSON.parse(response.body);
    }

    async findByStatus(status: string | string[]) {
        let response = await got('http://93.126.97.71:10080/api/pet/findByStatus', {
            searchParams: new URLSearchParams({ status })
        });
        return JSON.parse(response.body);
    }

    async getById(id: number | string) {
        const response = await got(`http://93.126.97.71:10080/api/pet/${id}`);
        return JSON.parse(response.body);
    }
}