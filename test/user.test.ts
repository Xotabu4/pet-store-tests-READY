import { definitions } from "../.temp/types"
import { ApiClient } from "../api/client"
import { strict as assert } from "assert"

describe('User', () => {
    it('can register', async function () {
        const userToCreate: Omit<definitions['User'], 'id' | 'userStatus'> = {
            firstName: 'Test',
            lastName: 'Test',
            email: `user+${Date.now()}@93.126.97.71`,
            phone: '12312312',
            username: `user${Date.now()}`,
            password: '123456'
        }

        const createdUser = await ApiClient.unauthorized().user.register(userToCreate)

        assert.deepEqual(
            createdUser,
            {
                ...userToCreate,
                id: createdUser.id,
                userStatus: createdUser.userStatus,
            }
        )
    })
})