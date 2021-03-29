module.exports = {
    require: [
        'ts-node/register',
    ],
    spec: './test/**/*.ts',
    timeout: 60000,
    parallel: true,
}