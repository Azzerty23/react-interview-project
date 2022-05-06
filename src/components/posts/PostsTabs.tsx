import clsx from 'clsx';
import { Link } from 'react-router-dom';

const tabs = [
  { name: 'Recent', href: '#', current: true },
  { name: 'Most Liked', href: '#', current: false },
  { name: 'Most Answers', href: '#', current: false },
];

const PostsTabs = () => {
  return (
    <div className="px-4 sm:px-0">
      <div className="sm:hidden">
        <label htmlFor="post-tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="post-tabs"
          className="block h-12 w-full rounded-md border-gray-300 p-2 text-base font-medium text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          defaultValue={tabs.find((tab) => tab.current)!.name}
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
              aria-current={tab.current ? 'page' : undefined}
              className={clsx(
                tab.current
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700',
                tabIdx === 0 ? 'rounded-l-lg' : '',
                tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-center text-sm font-medium hover:bg-gray-50 focus:z-10'
              )}
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={clsx(
                  tab.current ? 'bg-primary-500' : 'bg-transparent',
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
