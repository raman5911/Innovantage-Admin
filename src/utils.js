import axios from 'axios';
import { formatInTimeZone, utcToZonedTime, format } from 'date-fns-tz';

export function format_date(date, timezone, format) {
    const formattedDate = formatInTimeZone(date, timezone, format);
    return formattedDate;
}

export function format_date_in_user_time_zone(date, zone, formatString) {
    const zonedDate = utcToZonedTime(date, zone);
    const currentTime = format(zonedDate, formatString, { timeZone: zone });
    return currentTime;
}

export async function post(url, payload, config) {
    const result = await axios.post(url, payload, config);
    return result;
}

export async function get(url, config) {
    const result = await axios.get(url, config);
    return result;
}