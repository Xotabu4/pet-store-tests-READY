import { definitions } from '../../.temp/types';
import { mergeWithConcat } from '../utils/mergeWithConcat';

export type NewPet = Omit<definitions['Pet'], "id">

export const ValidPet = (pet: Partial<NewPet> = {}) => mergeWithConcat({
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
    status: 'available'
}, pet)

export const WrongStatusPet = (pet: Partial<NewPet>) => mergeWithConcat(ValidPet(), pet)