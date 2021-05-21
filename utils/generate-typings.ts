import 'dotenv/config'

import { CONFIG } from '../config/env'
import { execSync } from 'child_process'

execSync(`npx openapi-typescript ${CONFIG.PETSTORE_SWAGGER_URL} --output ./.temp/types.ts`, { stdio: 'inherit' })
