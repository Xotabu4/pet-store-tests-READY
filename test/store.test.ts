import { strict as assert } from 'assert'
import { PetController } from '../api/controller/pet-no-builder.controller';
import { OrderController } from '../api/controller/order-no-builder.controller';

const pet = new PetController();
const order = new OrderController();

describe('Store', () => {

    it('order can be placed, found, and deleted', async function () {
        const pets = await pet.findByStatus('available')
        const placedOrder = await order.placeOrder({
            petId: pets[0].id,
            quantity: 1,
            shipDate: "2021-01-31T14:25:01.211Z",
            status: "placed",
            complete: false
        })
        const foundOrder = await order.findOrderById(placedOrder.id)
        assert(foundOrder.id === placedOrder.id, '')

        await order.deleteOrderById(foundOrder.id)

        const foundDeletedOrder = await order.findOrderById(placedOrder.id)
        // assert
    })

    it('inventory can be requested', async function () {

    })

}) 