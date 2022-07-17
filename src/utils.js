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

export function get_time_from_date(req_date) {
    const date = new Date(req_date);
    let hours = date.getHours(); 
    hours = hours < 10 ? "0" + hours : hours;

    let minutes = date.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;

    const time = hours + ":" + minutes;
    return time;
} 

export async function post(url, payload, config) {
    const result = await axios.post(url, payload, config);
    return result;
}

export async function get(url, config) {
    const result = await axios.get(url, config);
    return result;
}