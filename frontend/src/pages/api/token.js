import { getToken } from 'next-auth/jwt';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const secret = process.env.JWT_SECRET;

export default function token(req, res) {
  const token = getToken({ req, secret });
  res.statusCode = 200;
  res.json({ token, req: req.cookies });
}
