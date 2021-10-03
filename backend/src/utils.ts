import { verify } from 'jsonwebtoken';
import { Context } from './context';

// TODO - CREATE NEW APP SECRET IN ENV FILE
export const APP_SECRET = 'appsecret321';

interface Token {
  userId: string;
}

export function getUserId(context: Context): string | null {
  const { req } = context;

  const secureCookie = false;
  const cookieName = secureCookie
    ? '__Secure-next-auth.session-token'
    : 'next-auth.session-token';

  const token = req.cookies[cookieName];
  if (token) {
    const verifiedToken = verify(token, APP_SECRET) as Token;
    console.log({ token });
    console.log('verified:', verifiedToken);
    return verifiedToken && String(verifiedToken.userId);
  }

  const authHeader = context.req.get('Authorization');
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '');
    const verifiedToken = verify(token, APP_SECRET) as Token;
    return verifiedToken && String(verifiedToken.userId);
  }

  return null;
}
