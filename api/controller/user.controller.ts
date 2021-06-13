import { definitions, operations } from "../../.temp/types";
import { AllureStep } from "../../utils/allureStep";
import { JsonRequestWithValidation } from "../request";
import { BaseController } from "./base.controller";

export class UserController extends BaseController {

    @AllureStep(`[UserController] register`)
    async register(userToCreate: Omit<definitions['User'], "id" | "userStatus">) {
        return (await new JsonRequestWithValidation()
            .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
            .headers({ token: this.options.token })
            .cookieJar(this.options.cookieJar)
            .url(`user/register`)
            .method('POST')
            .body(userToCreate)
            .send<operations['registerUser']['responses']['200']['schema']>()
        ).body
    }

    @AllureStep(`[UserController] login`)
    async login(credentials: { username: string, password: string }) {
        return (
            await new JsonRequestWithValidation()
                .prefixUrl(new URL(this.options.prefixPath, this.options.prefixUrl))
                .headers({ token: this.options.token })
                .cookieJar(this.options.cookieJar)
                .url(`user/login`)
                .searchParams(credentials)
                .send<operations['loginUser']['responses']['200']['schema']>()
        ).headers['token'] as string
    }
}