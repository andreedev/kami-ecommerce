import { LoginResponse } from "./login-response"

export interface VerifyEmailCodeResponse {
    code?: number
    data?: LoginResponse
}