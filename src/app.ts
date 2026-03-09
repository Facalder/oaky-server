import { Hono } from 'hono'
import { errorHandler } from '@/middlewares/error-handler'
import { notFoundHandler } from '@/middlewares/notfound-handler'

const app = new Hono()

// app.get('/', (c) =>
// 	ApiResponse.ok(c, 'Hello!', {
// 		greeting: 'Welcome to Oaky',
// 	})
// )

// Cara menggunakan ApiResponse

app.notFound(notFoundHandler)
app.onError(errorHandler)

export default app
