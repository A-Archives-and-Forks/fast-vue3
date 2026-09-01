import { useResponseSuccess } from '~/utils/response';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return useResponseSuccess({
    id: Math.floor(Math.random() * 10_000),
    ...body,
  });
});
