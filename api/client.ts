import { PetController } from "./controller/pet.controller";
import { StoreController } from "./controller/store.controller";
import { UserController } from "./controller/user.controller";
import { CookieJar } from 'tough-cookie';

export class ApiClient {
    public readonly pet: PetController;
    public readonly store: StoreController;
    public readonly user: UserController;

    private constructor(params?: { token?: string, cookies?: CookieJar, baseUrl?: string }) {
        const defaultParams = {
            baseUrl: 'http://93.126.97.71:10080/api/',
            cookies: new CookieJar()
        }
        const mergedParams = {
            ...defaultParams,
            ...params
        }
        this.pet = new PetController(mergedParams)
        this.store = new StoreController(mergedParams)
        this.user = new UserController(mergedParams)
    }

    static unauthorized() {
        return new ApiClient();
    }

    static async loginAs(credentials: { username: string, password: string }) {
        return new ApiClient({
            token: await new ApiClient().user.login(credentials)
        })
    }

}