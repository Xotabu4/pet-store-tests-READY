declare namespace NodeJS {
    export interface Global {
        config: {
            prefixUrl: string
            prefixPath: string
            swaggerUrl: string
        }
    }
}