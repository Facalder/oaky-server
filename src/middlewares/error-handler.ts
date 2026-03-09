import type { ErrorHandler } from 'hono'
import type { ContentfulStatusCode } from 'hono/utils/http-status'
import env from '@/configs/env'
import { ApiError } from '@/utils/api-error'
import { logger } from '@/utils/logger'

export const errorHandler: ErrorHandler = (err, c) => {
	let statusCode: ContentfulStatusCode = 500
	let message = 'Internal server error'
	let errors: unknown

	if (err instanceof ApiError) {
		statusCode = err.statusCode as ContentfulStatusCode
		message = err.message
		errors = err.errors
	}

	logger.error(
		`Error: ${message} | Status: ${statusCode} | Path: ${c.req.method} ${c.req.path}`,
		err
	)

	return c.json(
		{
			success: false,
			message,
			statusCode,
			...(errors !== undefined && { errors }),
			...(env.NODE_ENV === 'development' && { stack: err.stack }),
		},
		statusCode
	)
}
