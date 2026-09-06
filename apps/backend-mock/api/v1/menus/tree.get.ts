import { menus } from '~/api/v1/menus.get';
import { useResponseSuccess } from '~/utils/response';

export default defineEventHandler(() => useResponseSuccess(menus));
