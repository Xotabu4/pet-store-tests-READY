import { strict as assert } from 'assert'
import { definitions } from '../.temp/types';
import { ApiClient } from '../api/client';
import { RandomCreatePetModel } from '../api/model/pet.model';

describe('Store', () => {
    it('can return his inventory, and correctly updates statuses', async function () {
        // Potential issue when running in parallel, and other threads will add pets as well.
        const adminClient = await ApiClient.loginAs({ username: 'admin', password: 'admin' });
        const inventory = await adminClient.store.getInventory();
        assert(Object.keys(inventory).length > 0, `List of inventory statuses must not be empty`)

        await adminClient.pet.addNew({
            ...RandomCreatePetModel(),
            status: 'available'
        })
        const inventoryWithAvailableAdded = await adminClient.store.getInventory()
        assert.equal(inventoryWithAvailableAdded.available, inventory.available + 1, `Available value in inventory must be increased by 1`)

        await adminClient.pet.addNew({
            ...RandomCreatePetModel(),
            status: 'pending'
        })
        const inventoryWithPendingAdded = await adminClient.store.getInventory()
        assert.equal(inventoryWithPendingAdded.pending, inventory.pending + 1, `Pending value in inventory must be increased by 1`)

        await adminClient.pet.addNew({
            ...RandomCreatePetModel(),
            status: 'sold'
        })
        const inventoryWithSoldAdded = await adminClient.store.getInventory()
        assert.equal(inventoryWithSoldAdded.sold, inventory.sold + 1, `Sold value in inventory must be increased by 1`)
    })

    it('allows to place order by user, and admin can see created order', async function () {
        const userClient = await ApiClient.loginAs({ username: 'user', password: 'user' })
        const order: Omit<definitions['Order'], 'id'> = {
            petId: 1,
            quantity: 1,
            shipDate: new Date().toISOString(),
            status: 'placed'
        }
        const placedOrder = await userClient.store.placeOrder(order)
        const adminClient = await ApiClient.loginAs({ username: 'admin', password: 'admin' })
        await adminClient.store.getOrderById(placedOrder.id)
    })
})
