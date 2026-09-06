import { useResponseError, useResponseSuccess } from '~/utils/response';
import { createPaymentId, payablePlans } from '~/utils/site-interactions';

const channels = new Set(['alipay', 'card', 'wechat']);

export default defineEventHandler(async (event) => {
  const body = await readBody<{ channel?: string; planId?: number }>(event);
  const plan = payablePlans.get(Number(body.planId));
  if (!plan || !body.channel || !channels.has(body.channel)) {
    setResponseStatus(event, 400);
    return useResponseError('请选择可购买套餐和支付方式', 400);
  }

  const now = new Date();
  const id = createPaymentId();
  const orderNo = `FV${now.getTime()}${String(id).padStart(4, '0')}`;
  return useResponseSuccess({
    amountCents: plan.amountCents,
    channel: body.channel,
    checkoutUrl: `/payment/demo/${orderNo}`,
    createdAt: now.toISOString(),
    currency: 'CNY',
    expiresAt: new Date(now.getTime() + 15 * 60_000).toISOString(),
    id,
    orderNo,
    planId: body.planId,
    planName: plan.name,
    status: 'pending',
  });
});
