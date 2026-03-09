import app from '@/app'
import env from '@/configs/env'
import { logger } from '@/utils/logger'

const port = env.PORT || 9000

const server = Bun.serve({
	port,
	development: false,
	fetch: app.fetch,
})

logger.info(`[server]: Server is running at http://localhost:${port}`)

const GRACEFUL_SHUTDOWN_TIMEOUT = 10_000

const shutdown = async (signal: string) => {
	logger.info(`[server]: ${signal} received, shutting down gracefully...`)

	server.stop()

	const forceExit = setTimeout(() => {
		logger.warn('[server]: Graceful shutdown timed out, forcing exit')
		process.exit(1)
	}, GRACEFUL_SHUTDOWN_TIMEOUT)

	forceExit.unref()

	logger.info('[server]: Shutdown complete')
	process.exit(0)
}

process.once('SIGINT', () => shutdown('SIGINT'))
process.once('SIGTERM', () => shutdown('SIGTERM'))

export default server
