import got from 'got';

export class OrderController {
    async deleteOrderById(id: string | number) {
        const response = await got(`http://93.126.97.71:10080/api/store/order/${id}`, {
            method: 'DELETE'
        });
        return JSON.parse(response.body);
    }

    async findOrderById(id: string | number) {
        const response = await got(`http://93.126.97.71:10080/api/store/order/${id}`);
        return JSON.parse(response.body);
    }

    async placeOrder(order: { petId: number; quantity: number; shipDate: string; status: string; complete: boolean; }) {
        const response = await got(`http://93.126.97.71:10080/api/store/order`, {
            method: 'POST',
            json: order
        });
        return JSON.parse(response.body);
    }

}