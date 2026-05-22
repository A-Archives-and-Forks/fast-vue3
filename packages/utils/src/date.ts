import dayjs from 'dayjs';

export function formatDate(date: string | number | Date, format = 'YYYY-MM-DD'): string {
  return dayjs(date).format(format);
}

export function formatDateTime(date: string | number | Date): string {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}

export function fromNow(date: string | number | Date): string {
  return dayjs(date).fromNow();
}
