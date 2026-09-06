import { useResponseSuccess } from '~/utils/response';

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    email: string;
    message?: string;
    name?: string;
  }>(event);

  return useResponseSuccess({
    accepted: true,
    email: body.email,
    submittedAt: new Date().toISOString(),
  });
});
