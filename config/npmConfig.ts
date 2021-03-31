type ConfigKeys = 'petstore_url' |
    'petstore_url_prefix_path' |
    'petstore_swagger_url'

export const CONFIG = {
    get(configKey: ConfigKeys): string {
        const value = process.env[`npm_config_${configKey}`]
        if (value == null) {
            console.log('$$$', process.env)
            throw new Error(`Configuration error: 
            npm_config_${configKey} 
            is missing. Make sure .npmrc file has this key, or it was passed with CLI or env variable`)
        }
        return value
    }
}