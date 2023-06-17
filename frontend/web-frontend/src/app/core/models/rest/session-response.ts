import { LoginResponse } from "./login-response"

export interface SessionResponse {
    code?: number
    data?: LoginResponse,
    message?: string
}