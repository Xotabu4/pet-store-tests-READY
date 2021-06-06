import { strict as assert } from 'assert'
import { definitions } from '../.temp/types';
import { ApiClient } from '../api/client';

describe('User', () => {
    it('can register', async function () {
        const userToCreate: Omit<definitions['User'], 'id' | 'userStatus'> = {
            firstName: 'Test',
            lastName: 'Test',
            email: `user+${Date.now()}@93.126.97.71`,
            phone: '123456789',
            username: `user${Date.now()}`,
            password: '123456789'
        }
        const createdUser = await ApiClient.unauthorized().user.register(userToCreate)

        assert.deepStrictEqual(
            createdUser,
            {
                ...userToCreate,
                id: createdUser.id,
                userStatus: createdUser.userStatus
            },
            `Expected user to be registered properly`
        )
    })
})
