import { strict as assert } from 'assert'
import { ApiClient } from '../api/client';

describe('User', function () {
    it('can register', async function () {
        const client = ApiClient.unauthorized()

        const registerUserModel = {
            username: `username${Date.now()}`,
            firstName: 'First Name',
            lastName: 'Last Name',
            email: `petstore+${Date.now()}@93.126.97.71`,
            password: '111111',
            phone: '0931111111',
        }
        const registeredUser = await client.user.register(registerUserModel)

        assert.deepEqual(
            registeredUser,
            {
                ...registerUserModel,
                id: registeredUser.id,
                userStatus: 0
            },
            `Expected registered user to equal data used upon registration`
        )
    })

    it('can be created, updated by admin', async function () {
        const adminClient = await ApiClient.loginAs({ username: 'admin', password: 'admin' })
        const createdUserModel = {
            username: `username${Date.now()}`,
            firstName: 'First Name',
            lastName: 'Last Name',
            email: `petstore+${Date.now()}@93.126.97.71`,
            password: '111111',
            phone: '0931111111',
        }
        const createdUser = await adminClient.user.createUser(createdUserModel)
        assert.deepEqual(createdUser, {
            ...createdUserModel,
            id: createdUser.id,
            userStatus: createdUser.userStatus
        }, `Expected user to be properly created`)
        const updatedUserModel = {
            id: createdUser.id,
            userStatus: 0,
            username: `username${Date.now()}`,
            firstName: 'First Name updated',
            lastName: 'Last Name',
            email: `petstore+${Date.now()}@93.126.97.71`,
            password: '222222',
            phone: '0932222222',
        }
        const updateUserResponse = await adminClient.user.updateUser(updatedUserModel)
        assert.deepEqual(updatedUserModel, updateUserResponse, `Expected user to be properly updated`)
        await adminClient.user.deleteUser(createdUser.id)
        // TODO: assert 404
        // await adminClient.user.getUser(createdUser.id)
    })
})
