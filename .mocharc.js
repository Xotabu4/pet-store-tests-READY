module.exports = {
    require: [
        'ts-node/register',
        'dotenv/config'
    ],
    spec: './test/**/*.test.ts',
    reporter: 'mocha-multi-reporters',
    reporterOptions: ['configFile=reporterConfig.json'],
    slow: 50000,
    timeout: 60000,
}