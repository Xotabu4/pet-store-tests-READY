module.exports = {
    require: [
        'ts-node/register',
    ],
    spec: './test/**/*.ts',
    timeout: 60000,
    // reporters does not support parallel mode
    parallel: false,
}