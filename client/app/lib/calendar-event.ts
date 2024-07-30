import { google, calendar_v3 } from 'googleapis';
import { authorize, getAccessToken } from './google-auth';

async function createEvent(auth: any, event: calendar_v3.Schema$Event) {
  const calendar = google.calendar({ version: 'v3', auth });
  
  try {
    return await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event, 
    });
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
}

export async function addEventToCalendar(event: calendar_v3.Schema$Event, code: string | null, callback: () => void) {
  try {
    const { oAuth2Client } = await authorize();
    if (code) {
      await getAccessToken(oAuth2Client, code);
    }
    await createEvent(oAuth2Client, event);
    callback();
  } catch (error) {
    console.error('Error adding event to calendar:', error);
  }
}
