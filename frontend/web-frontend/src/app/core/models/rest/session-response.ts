import { JwtResponse } from "./jwt-response"

export interface SessionResponse {
    code: number
    data: JwtResponse,
    message?: string
}