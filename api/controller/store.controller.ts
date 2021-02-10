import { operations } from "../../.temp/types";
import { JsonRequest } from 'http-req-builder';

export class StoreController {
    async getInventory() {
        return (await new JsonRequest()
            .url(`http://93.126.97.71:10080/api/store/inventory`)
            .send<operations['getInventory']['responses']['200']['schema']>()
        ).body
    }
}