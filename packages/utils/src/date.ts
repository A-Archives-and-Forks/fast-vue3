import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export function formatDate(
  date: Date | number | string,
  format = 'YYYY-MM-DD',
): string {
  return dayjs(date).format(format);
}

export function formatDateTime(date: Date | number | string): string {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}

export function fromNow(date: Date | number | string): string {
  return dayjs(date).fromNow();
}
