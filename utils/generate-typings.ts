import 'dotenv/config'

import { execSync } from 'child_process'
import { CONFIG } from '../config/env'

execSync(`npx openapi-typescript ${CONFIG.PETSTORE_SWAGGER_URL} --output ./.temp/types.ts`, { stdio: 'inherit' })
