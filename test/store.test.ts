import { strict as assert } from 'assert'
import { definitions } from '../.temp/types';
import { PetController } from '../api/controller/pet.controller';
import { StoreController } from '../api/controller/store.controller';

const pet = new PetController()
const store = new StoreController()

describe('Store', () => {
    it('can return his inventory, and correctly updates statuses', async function () {
        // Potential issue when running in parallel, and other threads will add pets as well.

        const inventory = await store.getInventory();
        assert(Object.keys(inventory).length > 0, `List of inventory statuses must not be empty`)

        await pet.addNew(petWithStatus('available'))
        const inventoryWithAvailableAdded = await store.getInventory()
        assert.equal(inventoryWithAvailableAdded.available, inventory.available + 1, `Available value in inventory must be increased by 1`)

        
        await pet.addNew(petWithStatus('pending'))
        const inventoryWithPendingAdded = await store.getInventory()
        assert.equal(inventoryWithPendingAdded.pending, inventory.pending + 1, `Pending value in inventory must be increased by 1`)

        await pet.addNew(petWithStatus('sold'))
        const inventoryWithSoldAdded = await store.getInventory()
        assert.equal(inventoryWithSoldAdded.sold, inventory.sold + 1, `Sold value in inventory must be increased by 1`)
    })
})

function petWithStatus(status: definitions['Pet']['status']) {
    return {
        "category": {
            "id": 0,
            "name": "string"
        },
        "name": "Cat",
        "photoUrls": [
            "http://test.com/image.jpg"
        ],
        "tags": [
            {
                "id": 0,
                "name": "string"
            }
        ],
        status
    }
}