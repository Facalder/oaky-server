import type { NotFoundHandler } from 'hono'
import { ApiError } from '@/utils/api-error'

export const notFoundHandler: NotFoundHandler = (c) => {
	throw ApiError.notFound(`Route ${c.req.method} ${c.req.path} not found`)
}
