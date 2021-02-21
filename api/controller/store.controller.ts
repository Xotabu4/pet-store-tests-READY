import { definitions, operations } from "../../.temp/types";
import { JsonRequestWithValidation } from "../request";
import { BaseController } from "./base.controller";

export class StoreController extends BaseController {
    async getOrderById(orderId: number | string) {
        return (await new JsonRequestWithValidation()
            .prefixUrl(this.params.baseUrl)
            .url(`store/order/${orderId}`)
            .headers({ token: this.params.token })
            .send<operations['getOrderById']['responses']['200']['schema']>()
        ).body
    }
    async placeOrder(order: Omit<definitions["Order"], "id">) {
        return (await new JsonRequestWithValidation()
            .prefixUrl(this.params.baseUrl)
            .url(`store/order`)
            .headers({ token: this.params.token })
            .method('POST')
            .body(order)
            // TODO: fix required in docs
            .send<Required<operations['placeOrder']['responses']['200']['schema']>>()
        ).body
    }
    async getInventory() {
        return (await new JsonRequestWithValidation()
            .prefixUrl(this.params.baseUrl)
            .url(`store/inventory`)
            .headers({ token: this.params.token })
            .send<operations['getInventory']['responses']['200']['schema']>()
        ).body
    }
}