module.exports = {
    require: [
        'ts-node/register',
        'dotenv/config'
    ],
    spec: './test/**/*.test.ts',
    slow: 50000,
    timeout: 60000,
}