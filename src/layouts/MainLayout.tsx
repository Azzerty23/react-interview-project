import { Fragment, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { Dialog, Transition } from '@headlessui/react';
import {
  ChatAlt2Icon,
  HomeIcon,
  MenuIcon,
  UsersIcon,
  XIcon,
} from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import Logo from '@components/ui/Logo';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon, current: true },
  { name: 'Users', href: '/users', icon: UsersIcon, current: false },
  { name: 'Posts', href: '/posts', icon: ChatAlt2Icon, current: false },
];

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { pathname } = useLocation();
  const isCurrentRoute = (item: { href: string }) => item.href === pathname;

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 md:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                  <Link to="/">
                    <div className="px-4 text-primary-600">
                      <Logo />
                    </div>
                  </Link>
                  <nav className="mt-5 space-y-1 px-2">
                    {navigation.map((item) => (
                      <Link
                        to={item.href}
                        key={item.name}
                        className={clsx(
                          isCurrentRoute(item)
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'group flex items-center rounded-md px-2 py-2 text-base font-medium'
                        )}
                      >
                        <item.icon
                          className={clsx(
                            isCurrentRoute(item)
                              ? 'text-gray-300'
                              : 'text-gray-400 group-hover:text-gray-300',
                            'mr-4 h-6 w-6 flex-shrink-0'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="flex flex-shrink-0 bg-gray-700 p-4">
                  <Link to="/" className="group flex flex-shrink-0">
                    <div className="flex items-center">
                      <img
                        className="inline-block h-10 w-10 rounded-full"
                        src="https://www.minautor.fr/favicon.png"
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-base font-medium text-white">
                        Minautor
                      </p>
                      <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300">
                        View profile
                      </p>
                    </div>
                  </Link>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <Link to="/">
              <div className="px-4 text-primary-600">
                <Logo />
              </div>
            </Link>
            <nav className="mt-5 flex-1 space-y-1 px-2">
              {navigation.map((item) => (
                <Link
                  to={item.href}
                  key={item.name}
                  className={clsx(
                    isCurrentRoute(item)
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
                  )}
                >
                  <item.icon
                    className={clsx(
                      isCurrentRoute(item)
                        ? 'text-gray-300'
                        : 'text-gray-400 group-hover:text-gray-300',
                      'mr-3 h-6 w-6 flex-shrink-0'
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-shrink-0 bg-gray-700 p-4">
            <Link to="/" className="group block w-full flex-shrink-0">
              <div className="flex items-center">
                <img
                  className="inline-block h-9 w-9 rounded-full"
                  src="https://www.minautor.fr/favicon.png"
                  alt=""
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">Minautor</p>
                  <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">
                    View profile
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex min-h-full flex-1 flex-col md:pl-64">
        <div className="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:py-2 sm:pl-3 md:hidden">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <main className="relative flex-1">
          <Outlet />
        </main>
      </div>
    </>
  );
}
