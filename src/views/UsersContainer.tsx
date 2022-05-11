import { FunctionComponent, useEffect } from 'react';
import Heading from '@components/ui/Heading';
import UsersTable from '@components/users/UsersTable';
import Spinner from '@components/ui/Spinner';
import UsersResidenceTabs from '@components/users/UsersResidenceTabs';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { fetchUsers, selectUsers } from '@slices/usersSlice';
import { FetchStatus } from '@data/enum';

const UsersContainer: FunctionComponent = ({}) => {
  const users = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (users.status === FetchStatus.idle) dispatch(fetchUsers());
  }, [dispatch, users.status]);

  if (users.error) return <div>An error has occurred.</div>;
  if (users.status === FetchStatus.loading)
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-12 md:px-16">
          <Heading title="Users" tabs={<UsersResidenceTabs />} />
          <div className="py-4">
            <UsersTable users={users.value} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersContainer;
