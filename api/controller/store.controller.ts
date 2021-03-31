import type { definitions, operations } from "../../.temp/types";
import { BaseController } from "./base.controller";

export class StoreController extends BaseController {
    async getOrderById(orderId: number | string) {
        return (await this.request()
            .url(`store/order/${orderId}`)
            .send<operations['getOrderById']['responses']['200']['schema']>()
        ).body
    }
    async placeOrder(order: Omit<Required<definitions["Order"]>, "id" | 'status' | 'complete'>) {
        return (await this.request()
            .url(`store/order`)
            .method('POST')
            .body(order)
            // TODO: fix required in docs
            .send<Required<operations['placeOrder']['responses']['200']['schema']>>()
        ).body
    }
    async getInventory() {
        return (await this.request()
            .url(`store/inventory`)
            .headers({ token: this.options.token })
            .send<operations['getInventory']['responses']['200']['schema']>()
        ).body
    }
}