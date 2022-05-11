import { MailIcon, PhoneIcon, UserCircleIcon } from '@heroicons/react/solid';

type UserProfileProps = {
  user: User;
};

const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <div
      key={user.id}
      className="mx-auto max-w-lg divide-y divide-gray-200 rounded-lg bg-white shadow"
    >
      <div className="flex w-full items-center justify-between space-x-6 p-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="truncate text-sm font-medium text-gray-900">
              {user.name}
            </h3>
            <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
              {user.address.suite}
            </span>
          </div>
          <p className="mt-1 truncate text-sm text-gray-500">
            Company: {user.company.name}
          </p>
          <p className="mt-1 truncate text-sm text-gray-500">
            City: {user.address.city}
          </p>
        </div>
        <UserCircleIcon className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 text-gray-500" />
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <a
              href={`mailto:${user.email}`}
              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
            >
              <MailIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              <span className="ml-3">Email</span>
            </a>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <a
              href={`tel:${user.phone}`}
              className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
            >
              <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              <span className="ml-3">Call</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
