export interface MockBlogComment {
  articleId: number;
  content: string;
  createdAt: string;
  id: number;
  username: string;
}

export const blogComments: MockBlogComment[] = [
  {
    articleId: 1,
    content: '接口边界讲得很清楚，期待更多完整案例。',
    createdAt: '2026-08-13 09:30:00',
    id: 1,
    username: 'admin',
  },
];

let nextCommentId = 2;
let nextPaymentId = 1;

export function createCommentId() {
  return nextCommentId++;
}

export function createPaymentId() {
  return nextPaymentId++;
}

export function getMockUsername(authorization?: string) {
  return authorization?.replace(/^Bearer mock-access-token-/, '') || 'user';
}

export const payablePlans = new Map([
  [2, { amountCents: 29_900, name: '团队版' }],
  [3, { amountCents: 99_900, name: '企业版' }],
]);
