type ConfigKeys = 'petstore_URL' |
    'petstore_URL_prefix_path' |
    'petstore_swagger_URL'

export const CONFIG = {
    get(configKey: ConfigKeys): string {
        const value = process.env[`npm_config_${configKey}`]
        if (value == null) {
            throw new Error(`Configuration error: 
            npm_config_petstore_${configKey} 
            is missing. Make sure .npmrc file has this key, or it was passed with CLI or env variable`)
        }
        return value
    }
}