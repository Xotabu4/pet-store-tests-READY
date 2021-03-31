import type { definitions, operations } from "../../.temp/types";
import { BaseController } from "./base.controller";

export class UserController extends BaseController {
    async register(user: Omit<definitions['User'], 'id' | 'userStatus'>) {
        return (await this.request()
            .method('POST')
            .url(`user/register`)
            .body(user)
            .send<operations['createUser']['responses']['200']['schema']>()
        ).body
    }
    async login(credentials: { username: string, password: string }) {
        return (await this.request()
            .url(`user/login`)
            .searchParams(credentials)
            .send<operations['loginUser']['responses']['200']['schema']>()
        ).headers['token'] as string
    }
    async createUser(user: Omit<definitions['User'], 'id' | 'userStatus'>) {
        return (await this.request()
            .method('POST')
            .url(`user/create`)
            .body(user)
            .send<operations['createUser']['responses']['200']['schema']>()
        ).body
    }
    async getUser(id: number | string) {
        return (await this.request()
            .url(`user/${id}`)
            .send<operations['getUserById']['responses']['200']['schema']>()
        ).body
    }
    async updateUser(updatedUserModel: definitions['User']) {
        return (await this.request()
            .url(`user`)
            .method('PUT')
            .body(updatedUserModel)
            .send<operations['updateUser']['responses']['200']['schema']>()
        ).body
    }
    async deleteUser(id: number | string) {
        return (await this.request()
            .url(`user/${id}`)
            .method('DELETE')
            .send<{ message: string }>()
        ).body
    }
}