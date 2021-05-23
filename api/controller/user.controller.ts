import { operations } from "../../.temp/types";
import { BaseController } from "./base.controller";

export class UserController extends BaseController {
    async login(credentials: { username: string, password: string }) {
        return (await this.request()
            .url(`user/login`)
            .searchParams(credentials)
            .send<operations['loginUser']['responses']['200']['schema']>()
        ).headers['token'] as string
    }
}