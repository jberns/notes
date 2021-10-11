import { verify } from 'jsonwebtoken';
import { Context } from './context';

// TODO - CREATE NEW APP SECRET IN ENV FILE
export const APP_SECRET = process.env.APP_SECRET;

interface Token {
  userId: string;
}

export function getUserId(context: Context): string | null {
  const authHeader = context.req.get('Authorization');
  console.log({ authHeader });
  if (authHeader && APP_SECRET) {
    console.log({ authHeader });
    const token = authHeader.replace('Bearer ', '');
    const verifiedToken = verify(token, APP_SECRET) as Token;
    return verifiedToken && String(verifiedToken.userId);
  }

  return null;
}
