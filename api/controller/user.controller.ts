import { operations, definitions } from "../../.temp/types";
import { BaseController } from "./base.controller";

export class UserController extends BaseController {
    async register(userModel: Omit<definitions['User'], 'id' | 'userStatus'>) {
        return (await this.request()
            .url(`user/register`)
            .method('POST')
            .body(userModel)
            .send<operations['registerUser']['responses']['200']['schema']>()
        ).body
    }
    async login(credentials: { username: string, password: string }) {
        return (await this.request()
            .url(`user/login`)
            .searchParams(credentials)
            .send<operations['loginUser']['responses']['200']['schema']>()
        ).headers['token'] as string
    }
}