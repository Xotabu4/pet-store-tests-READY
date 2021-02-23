import { operations } from "../../.temp/types";
import { JsonRequestWithValidation } from "../request";
import { BaseController } from "./base.controller";

export class UserController extends BaseController {
    async login(credentials: { username: string, password: string }) {
        return (await new JsonRequestWithValidation()
            .url(`http://93.126.97.71:10080/api/user/login`)
            .headers({ token: this.params.token })
            .searchParams(credentials)
            .send<operations['loginUser']['responses']['200']['schema']>()
        ).headers['token'] as string
    }
}