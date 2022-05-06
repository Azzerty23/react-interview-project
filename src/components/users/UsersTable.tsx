import type { User } from '@views/UsersContainer';
import { Link, useSearchParams } from 'react-router-dom';

type TableProps = {
  users: User[];
};

const residenceMapping = {
  all: '',
  apartment: 'Apt',
  suite: 'Suite',
} as any;

const isUserInResidenceType = (user: User, type: string = '') =>
  user.address.suite?.startsWith(type);

const UsersTable = ({ users }: TableProps) => {
  const [searchParams] = useSearchParams();

  const residence = searchParams.get('residence') || '';
  const residenceType = residenceMapping[residence];
  const filteredUsers = users.filter((user) =>
    isUserInResidenceType(user, residenceType)
  );

  return (
    <>
      <div className="sm:flex-auto">
        <p className="mt-2 text-sm text-gray-700">
          A list of all the users including their name, company, residence and
          phone.
        </p>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Company
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Residence
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Phone
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <Link
                            to={`/users/${user.id}`}
                            className="font-medium text-primary-600 hover:text-primary-800"
                          >
                            {user.name}
                            <div className="text-gray-500">{user.email}</div>
                          </Link>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="text-gray-900">{user.company.name}</div>
                        <div className="text-gray-500">{user.company.bs}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {isUserInResidenceType(user, 'Apt') ? (
                          <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                            {user.address.suite}
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            {user.address.suite}
                          </span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {user.phone}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link
                          to={`/users/${user.id}?edit=true`}
                          className="text-primary-600 hover:text-primary-800"
                        >
                          Edit<span className="sr-only">, {user.name}</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersTable;
