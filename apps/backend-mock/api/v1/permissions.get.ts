import { permissions } from '~/utils/permissions';
import { useResponseSuccess } from '~/utils/response';

export default defineEventHandler(() => {
  return useResponseSuccess(permissions);
});
