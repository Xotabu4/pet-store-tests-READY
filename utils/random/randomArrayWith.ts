import * as faker from 'faker';

export function randomArrayWith<T>(something: () => T, length = faker.datatype.number(10)): T[] {
    let arr = [];
    for (let i = 0; i < length; i++) {
        arr.push(something());
    }
    return arr;
}