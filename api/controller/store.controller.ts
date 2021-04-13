import { definitions, operations } from "../../.temp/types";
import { JsonRequestWithValidation } from "../request";
import { BaseController } from "./base.controller";

export class StoreController extends BaseController {
    async getOrderById(orderId: number | string) {
        return (await new JsonRequestWithValidation()
            .url(`http://93.126.97.71:10080/api/store/order/${orderId}`)
            .headers({ token: this.params.token })
            .send<operations['getOrderById']['responses']['200']['schema']>()
        ).body
    }
    async placeOrder(order: Omit<definitions["Order"], "id" | "status">) {
        return (await new JsonRequestWithValidation()
            .url(`http://93.126.97.71:10080/api/store/order`)
            .headers({ token: this.params.token })
            .method('POST')
            .body(order)
            // TODO: fix required in docs
            .send<Required<operations['placeOrder']['responses']['200']['schema']>>()
        ).body
    }
    async getInventory() {
        return (await new JsonRequestWithValidation()
            .url(`http://93.126.97.71:10080/api/store/inventory`)
            .headers({ token: this.params.token })
            .send<operations['getInventory']['responses']['200']['schema']>()
        ).body
    }
}