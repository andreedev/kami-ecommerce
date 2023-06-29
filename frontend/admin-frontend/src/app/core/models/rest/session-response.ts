import { JwtResponse } from ".."

export interface SessionResponse {
    code: number
    data: JwtResponse,
    message?: string
}