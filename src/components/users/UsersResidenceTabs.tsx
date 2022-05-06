import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

enum TabResidence {
  'all',
  'apartment',
  'suite',
}

const userTabs = [
  { name: 'All', href: '/users?residence=all' },
  { name: 'Apartment', href: '/users?residence=apartment' },
  { name: 'Suite', href: '/users?residence=suite' },
];

const UsersResidenceTabs = () => {
  const [current, setCurrent] = useState<number>(TabResidence.all);
  const [searchParams] = useSearchParams();

  const residence = searchParams.get('residence');

  useEffect(() => {
    if (residence) {
      const currentTab = Object.values(TabResidence).indexOf(residence);
      setCurrent(currentTab);
    }
  }, [residence]);
  return (
    <div className="mt-4 sm:mt-0 sm:ml-10">
      <nav className="-mb-px flex space-x-8">
        {userTabs.map((tab, index) => (
          <Link
            to={tab.href}
            key={tab.name}
            className={clsx(
              index === current
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
              'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium'
            )}
            aria-current={index === current ? 'page' : undefined}
          >
            {tab.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default UsersResidenceTabs;
