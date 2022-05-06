import React, { useEffect, useState } from 'react';

import {
  ChatAlt2Icon,
  ChartSquareBarIcon,
  UsersIcon,
} from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import fetcher from '@helpers/fetcher';
import useSWRImmutable from 'swr/immutable';
import { User } from '@views/UsersContainer';
import { Post } from '@views/PostsContainer';

type CountData = {
  totalUsers: any;
  totalPosts: any;
  avgPosts: any;
  activeUsers: any;
  maxActivity: any;
  mostActiveUser: any;
  recentPosts: any;
};

const Overview = () => {
  const [count, setCount] = useState<CountData>({
    totalUsers: '-',
    totalPosts: '-',
    avgPosts: '-',
    activeUsers: 9,
    maxActivity: '-',
    mostActiveUser: '-',
    recentPosts: 23,
  });
  const { data: users, error } = useSWRImmutable<User[]>(
    'https://jsonplaceholder.typicode.com/users/',
    fetcher
  );
  const { data: posts, error: postsError } = useSWRImmutable<Post[]>(
    'https://jsonplaceholder.typicode.com/posts/',
    fetcher
  );

  useEffect(() => {
    if (users && posts) {
      const activeUsers = users.filter((user) =>
        posts.map(({ userId }) => userId).includes(user.id)
      );
      let activityUsers = {} as any;
      users.forEach((user) => {
        activityUsers[user.id] = posts.filter(
          ({ userId }) => userId === user.id
        ).length;
      });

      const activityValues = Object.values(activityUsers) as number[];
      const maxActivity = Math.max(...activityValues);
      const mostActiveUser = users.find(
        (user) => activityUsers[user.id] === maxActivity
      );

      setCount({
        ...count,
        totalUsers: users.length,
        totalPosts: posts.length,
        avgPosts: posts.length / users.length,
        activeUsers: activeUsers.length,
        maxActivity,
        mostActiveUser: mostActiveUser,
      });
    }
  }, [users, posts]);

  const cards = [
    {
      name: '# Users',
      href: '/users',
      icon: UsersIcon,
      amount: count.totalUsers,
    },
    {
      name: '# Posts',
      href: 'posts',
      icon: ChatAlt2Icon,
      amount: count.totalPosts,
    },
    {
      name: 'Avg Post / User',
      href: '#',
      icon: ChartSquareBarIcon,
      amount: count.avgPosts,
    },
    {
      name: '# Active Users',
      href: '/users',
      icon: UsersIcon,
      amount: count.activeUsers,
    },
    {
      name: 'Most Active User',
      href: `/users/${count.mostActiveUser.id}`,
      icon: ChatAlt2Icon,
      amount: count.mostActiveUser?.name,
    },
    {
      name: 'Max Post / User',
      icon: ChartSquareBarIcon,
      amount: count.maxActivity,
    },
  ];

  return (
    <div className="mt-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg font-medium leading-6 text-gray-900">
          Overview
        </h2>
        <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {React.Children.toArray(
            cards.map((card) => (
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <card.icon
                        className="h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-sm font-medium text-gray-500">
                          {card.name}
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            {card.amount}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  {card.href && (
                    <Link to={card.href} className="text-sm">
                      <span className="font-medium text-primary-600 hover:text-primary-800">
                        View all
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;
