import {
  ChatAlt2Icon,
  ChartSquareBarIcon,
  UsersIcon,
  HomeIcon,
  OfficeBuildingIcon,
} from '@heroicons/react/outline';

type Card = {
  name: string;
  href: string;
  Icon: any;
  amount: CountData[keyof CountData];
};

export const cards = (count: CountData): Card[] => [
  {
    name: '# Users',
    href: '/users',
    Icon: UsersIcon,
    amount: count.totalUsers,
  },
  {
    name: '# Users in Apartment',
    href: '/users?residence=apartment',
    Icon: OfficeBuildingIcon,
    amount: count.usersInApt,
  },
  {
    name: '# Users in Suite',
    href: '/users?residence=suite',
    Icon: HomeIcon,
    amount: count.usersInSuite,
  },
  {
    name: '# Posts',
    href: '/posts',
    Icon: ChatAlt2Icon,
    amount: count.totalPosts,
  },
  {
    name: 'Avg Post / User',
    href: '/posts',
    Icon: ChartSquareBarIcon,
    amount: count.avgPosts,
  },
  {
    name: '# Active Users',
    href: '/users',
    Icon: UsersIcon,
    amount: count.activeUsers,
  },
  {
    name: 'Most Active User',
    href: `/users/${count.mostActiveUser?.id}`,
    Icon: ChatAlt2Icon,
    amount: count.mostActiveUser?.name || '-',
  },
  {
    name: 'Max Post / User',
    href: '/posts',
    Icon: ChartSquareBarIcon,
    amount: count.maxActivity,
  },
];
