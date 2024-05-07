import { apiServer } from '$lib/api/server.js'

import { prisma } from '$lib/private/prisma.js'
import { apiConfig } from '$lib/private/api.js'

const api = apiServer(apiConfig, prisma)

export const GET = api.GET
