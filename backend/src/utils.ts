import { verify } from 'jsonwebtoken'
import { Context } from './context'


// TODO - CREATE NEW APP SECRET IN ENV FILE
export const APP_SECRET = 'appsecret321'

interface Token {
  userId: string
}

export function getUserId(context: Context) {
  const authHeader = context.req.get('Authorization')
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '')
    const verifiedToken = verify(token, APP_SECRET) as Token
    return verifiedToken && String(verifiedToken.userId)
  }
}
