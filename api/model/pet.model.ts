import * as faker from 'faker';
import { definitions } from "../../.temp/types";
import { randomArrayWith } from "../../utils/random/randomArrayWith";

export type CreatePetModel = Omit<definitions['Pet'], "id">

export const RandomCreatePetModel: () => CreatePetModel = () => ({
    category: {
        id: faker.datatype.number(),
        name: faker.name.jobTitle()
    },
    name: faker.name.firstName(),
    photoUrls: randomArrayWith(() => faker.internet.url()),
    tags: randomArrayWith(() => (
        {
            id: faker.datatype.number(),
            name: faker.commerce.productAdjective()
        }
    )),
    status: faker.random.arrayElement(['available', 'pending', 'sold'])
});
