import type { Context } from 'hono'
import type { ContentfulStatusCode } from 'hono/utils/http-status'
import { STATUS_CODES } from '@/constants/status-code'

type ApiResponseParams<T> = {
	success: boolean
	message: string
	statusCode: ContentfulStatusCode
	data?: T | null
	errors?: unknown
}

export class ApiResponse<T = unknown> {
	public readonly success: boolean
	public readonly message: string
	public readonly statusCode: ContentfulStatusCode
	public readonly data?: T | null
	public readonly errors?: unknown

	constructor({
		success,
		message,
		statusCode,
		data = null,
		errors,
	}: ApiResponseParams<T>) {
		this.success = success
		this.message = message
		this.statusCode = statusCode
		this.data = data
		this.errors = errors
	}

	send(c: Context) {
		return c.json(
			{
				success: this.success,
				message: this.message,
				statusCode: this.statusCode,
				...(this.data !== undefined && { data: this.data }),
				...(this.errors !== undefined && { errors: this.errors }),
			},
			this.statusCode
		)
	}

	static Success<T>(
		c: Context,
		message: string,
		data?: T,
		statusCode: ContentfulStatusCode = STATUS_CODES.OK
	) {
		return new ApiResponse<T>({
			success: true,
			message,
			data,
			statusCode,
		}).send(c)
	}

	static ok<T>(c: Context, message = 'OK', data?: T) {
		return ApiResponse.Success(c, message, data, STATUS_CODES.OK)
	}

	static created<T>(c: Context, message = 'Created', data?: T) {
		return ApiResponse.Success(c, message, data, STATUS_CODES.CREATED)
	}
}
