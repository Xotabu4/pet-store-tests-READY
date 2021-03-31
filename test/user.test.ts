import { strict as assert } from 'assert'
import { ApiClient } from '../api/client';

describe('User', function () {
    it.skip('can register', async function () {

    })

    it('can be created, updated, and deleted by admin', async function () {
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
        assert.deepEqual(updatedUserModel, updateUserResponse)
        const updatedUser = await adminClient.user.getUser(createdUser.id)
        assert.deepEqual(updateUserResponse, updatedUser)
        await adminClient.user.deleteUser(createdUser.id)
        const deletedUser = await adminClient.user.getUser(createdUser.id)

        console.log('####', deletedUser)
    })
})
