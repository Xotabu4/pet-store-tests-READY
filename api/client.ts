import { PetController } from "./controller/pet.controller";
import { StoreController } from "./controller/store.controller";
import { UserController } from "./controller/user.controller";
import type { ControllerOptions } from "./controller/base.controller";

export class ApiClient {
    public readonly pet: PetController;
    public readonly store: StoreController;
    public readonly user: UserController;

    private constructor(params?: ControllerOptions) {
        this.pet = new PetController(params)
        this.store = new StoreController(params)
        this.user = new UserController(params)
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