const { program } = require('commander');

program
    .option('-a.u, --api.URL <string>', 'API config file name to load', 'TEST');

program.parse(process.argv)
const options = program.opts()
console.log('Got options from commandline', options)

global.options = options

module.exports = {
    require: [
        'ts-node/register',
        // `./config/${options['api.configName']}.config.ts`
    ],
    spec: './test/**/*.ts',
    timeout: 60000,
    parallel: true,
}