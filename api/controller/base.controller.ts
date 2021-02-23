import type { CookieJar } from "tough-cookie";

export class BaseController {
    constructor(protected readonly params: { token?: string, cookies: CookieJar }) {

    }
}