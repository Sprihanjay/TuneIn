import { NextApiRequest, NextApiResponse } from 'next';
import { addEventToCalendar } from '../lib/calendar-event';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { event, code } = req.body;
  await addEventToCalendar(event, code, () => {
    res.status(200).json({ message: 'Event created' });
  });
}
