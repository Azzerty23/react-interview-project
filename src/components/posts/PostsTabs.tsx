import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import clsx from 'clsx';

export enum TabPostType {
  'recent',
  'liked',
  'answered',
}

const tabs = [
  { name: 'Recent', href: '/posts?sortBy=recent' },
  { name: 'Most Liked', href: '/posts?sortBy=liked' },
  { name: 'Most Answers', href: '/posts?sortBy=answered' },
];

const PostsTabs = () => {
  const [current, setCurrent] = useState<number>(TabPostType.recent);
  const [searchParams] = useSearchParams();

  const sorting = searchParams.get('sortBy') || '';

  useEffect(() => {
    const currentTab = Object.values(TabPostType).indexOf(sorting);
    // if current in tabs
    if (currentTab !== -1) {
      setCurrent(currentTab);
    }
  }, [sorting]);

  return (
    <div className="px-4 sm:px-0">
      <div className="sm:hidden">
        <label htmlFor="post-tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="post-tabs"
          className="block h-12 w-full rounded-md border-gray-300 p-2 text-base font-medium text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          defaultValue={tabs[current].name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav
          className="relative z-0 flex divide-x divide-gray-200 rounded-lg shadow"
          aria-label="Tabs"
        >
          {tabs.map((tab, tabIdx) => (
            <Link
              to={tab.href}
              key={tab.name}
              aria-current={tabIdx === current ? 'page' : undefined}
              className={clsx(
                tabIdx === current
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700',
                tabIdx === 0 && 'rounded-l-lg',
                tabIdx === tabs.length - 1 && 'rounded-r-lg',
                'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-center text-sm font-medium hover:bg-gray-50 focus:z-10'
              )}
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={clsx(
                  tabIdx === current ? 'bg-primary-500' : 'bg-transparent',
                  'absolute inset-x-0 bottom-0 h-0.5'
                )}
              />
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default PostsTabs;
