import { useResponseSuccess } from '~/utils/response';

export default defineEventHandler(() => {
  return useResponseSuccess({
    cpu: { usage: 42.6, cores: 8, model: 'Apple M3 Pro' },
    memory: { total: '36 GB', used: '21.4 GB', usage: 59.4 },
    disk: { total: '1 TB', used: '612 GB', usage: 61.2 },
    runtime: {
      node: 'v20.12.0',
      os: 'darwin arm64',
      uptime: '12 天 6 小时',
      port: 5320,
    },
    trend: [
      { time: '09:00', cpu: 32, memory: 55 },
      { time: '09:30', cpu: 41, memory: 57 },
      { time: '10:00', cpu: 38, memory: 58 },
      { time: '10:30', cpu: 52, memory: 60 },
      { time: '11:00', cpu: 47, memory: 59 },
      { time: '11:30', cpu: 43, memory: 60 },
      { time: '12:00', cpu: 36, memory: 58 },
    ],
  });
});
