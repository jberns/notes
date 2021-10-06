import { verify } from 'jsonwebtoken';
import { Context } from './context';

// TODO - CREATE NEW APP SECRET IN ENV FILE
export const APP_SECRET = process.env.APP_SECRET;

interface Token {
  userId: string;
}

export function getUserId(context: Context): string | null {
  // const { req } = context;

  // const secureCookie = false;
  // const cookieName = secureCookie
  //   ? '__Secure-next-auth.session-token'
  //   : 'next-auth.session-token';

  // const token = req.cookies[cookieName];
  // console.log(token);

  // if (token && APP_SECRET) {
  //   const verifiedToken = verify(token, APP_SECRET) as Token;
  //   return verifiedToken && String(verifiedToken.userId);
  // }

  const authHeader = context.req.get('Authorization');
  if (authHeader && APP_SECRET) {
    console.log('Bearer Auth');
    const token = authHeader.replace('Bearer ', '');
    const verifiedToken = verify(token, APP_SECRET) as Token;
    return verifiedToken && String(verifiedToken.userId);
  }

  return null;
}
