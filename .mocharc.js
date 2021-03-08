
module.exports = {
    require: [
        'ts-node/register',
        './config/default.config.ts'
    ],
    spec: "./test/**/*.ts",
    timeout: 60000,
    parallel: true,
}