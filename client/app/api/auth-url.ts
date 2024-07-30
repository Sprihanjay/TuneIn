import { NextApiRequest, NextApiResponse } from 'next';
import { authorize } from '../lib/google-auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { authUrl } = await authorize();
  res.status(200).json({ authUrl });
}
