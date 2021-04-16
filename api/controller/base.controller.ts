import { BaseHttpRequest } from "http-req-builder";
import type { CookieJar } from "tough-cookie";

export type ControllerOptions = {
    token?: string,
    cookieJar: CookieJar,
    prefixUrl: string,
    prefixPath: string,
    RequestBuilder: new () => BaseHttpRequest
}

export class BaseController {
    constructor(protected readonly options: ControllerOptions) { }


}