import type { BaseHttpRequest } from "http-req-builder";
import { JsonRequestWithValidation } from "../request";
import { CookieJar } from "tough-cookie";
import { CONFIG } from "../../config/npmConfig";

export type ControllerOptions = {
    prefixUrl?: string,
    token?: string,
    cookies?: CookieJar,
    RequestBuilder?: new () => BaseHttpRequest
}

export class BaseController {
    private readonly DefaultRequestBuilder = JsonRequestWithValidation;

    protected readonly options: {
        prefixUrl: string,
        token?: string,
        cookies: CookieJar,
        RequestBuilder?: new () => BaseHttpRequest
    }

    constructor(options?: ControllerOptions) {
        const defaultUrl = new URL(CONFIG.get('petstore_URL'))
        defaultUrl.pathname = CONFIG.get('petstore_URL_prefix_path')
        const defaultOptions = {
            cookies: new CookieJar(),
            prefixUrl: defaultUrl.toString(),
        }
        this.options = {
            ...defaultOptions,
            ...options
        };
    }

    protected request(): BaseHttpRequest {
        const Request = this.options.RequestBuilder ?? this.DefaultRequestBuilder;
        const request = new Request()
            .prefixUrl(this.options.prefixUrl)
            .cookieJar(this.options.cookies)
        if (this.options.token ?? false) {
            request.headers({ token: this.options.token })
        }
        return request
    }
}