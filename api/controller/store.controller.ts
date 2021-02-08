import { operations } from "../../.temp/types";
import { JsonRequestWithValidation } from "../request";

export class StoreController {
    async getInventory() {
        return (await new JsonRequestWithValidation()
            .url(`http://93.126.97.71:10080/api/store/inventory`)
            .send<operations['getInventory']['responses']['200']['schema']>()
        ).body
    }
}