import { useResponseSuccess } from '~/utils/response';

const departments = [
  {
    id: 1,
    name: 'Fast Vue3 集团',
    leader: '管理员',
    order: 0,
    status: 'active',
    createdAt: '2024-01-01 08:00:00',
    children: [
      {
        id: 2,
        name: '技术部',
        leader: '张三',
        order: 1,
        status: 'active',
        createdAt: '2024-01-05 09:00:00',
        children: [
          {
            id: 5,
            name: '前端组',
            leader: '李四',
            order: 1,
            status: 'active',
            createdAt: '2024-02-01 10:00:00',
          },
          {
            id: 6,
            name: '后端组',
            leader: '王五',
            order: 2,
            status: 'active',
            createdAt: '2024-02-01 10:00:00',
          },
        ],
      },
      {
        id: 3,
        name: '产品部',
        leader: '赵六',
        order: 2,
        status: 'active',
        createdAt: '2024-01-08 09:30:00',
      },
      {
        id: 4,
        name: '运营部',
        leader: '孙七',
        order: 3,
        status: 'inactive',
        createdAt: '2024-01-10 14:00:00',
      },
    ],
  },
];

export default defineEventHandler(() => {
  return useResponseSuccess(departments);
});
