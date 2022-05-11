import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import isUserInResidenceType, {
  ResidenceTypeFilter,
} from '@helpers/isUserInResidenceType';
import { cards } from './ressources';

type OverviewProps = {
  users: User[];
  posts: Post[];
};

const Overview = ({ users, posts }: OverviewProps) => {
  const [count, setCount] = useState<CountData>({
    totalUsers: '-',
    totalPosts: '-',
    avgPosts: '-',
    activeUsers: '-',
    maxActivity: '-',
    recentPosts: 23, // arbritrary value
    usersInApt: '-',
    usersInSuite: '-',
  });

  useEffect(() => {
    if (users.length > 0 && posts.length > 0) {
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

      const usersInApt = users.filter((user) =>
        isUserInResidenceType(user, ResidenceTypeFilter.apartment)
      ).length;

      const usersInSuite = users.filter((user) =>
        isUserInResidenceType(user, ResidenceTypeFilter.suite)
      ).length;

      setCount((count) => ({
        ...count,
        totalUsers: users.length,
        totalPosts: posts.length,
        avgPosts: posts.length / users.length,
        activeUsers: activeUsers.length,
        maxActivity,
        mostActiveUser,
        usersInApt,
        usersInSuite,
      }));
    }
  }, [users, posts]);

  return (
    <div className="mt-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg font-medium leading-6 text-gray-900">
          Overview
        </h2>
        <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {React.Children.toArray(
            cards(count).map((card) => {
              return (
                <div className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <card.Icon
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
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;
