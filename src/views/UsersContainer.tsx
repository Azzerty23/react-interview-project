import { FunctionComponent, useState } from 'react';
import Heading from '@components/ui/Heading';
import UsersTable from '@components/users/UsersTable';
import useSWRImmutable from 'swr/immutable';
import fetcher from '@helpers/fetcher';
import Spinner from '@components/ui/Spinner';
import UsersResidenceTabs from '@components/users/UsersResidenceTabs';

type UserAddress = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
};

export type User = {
  id: number;
  name: string;
  username: string;
  address: Partial<UserAddress>;
  phone: string;
  department: string;
  email: string;
  role: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  website: string;
};

const UsersContainer: FunctionComponent = ({}) => {
  const { data: users, error } = useSWRImmutable<User[]>(
    'https://jsonplaceholder.typicode.com/users/',
    fetcher
  );

  // const [users, setUsers] = useState(data)

  if (error) return <div>An error has occurred.</div>;
  if (!users)
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-12 md:px-16">
          {/* <h1 className="text-2xl font-semibold text-gray-900">Users</h1> */}
          <Heading title="Users" tabs={<UsersResidenceTabs />} />
          <div className="py-4">
            <UsersTable users={users} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersContainer;
