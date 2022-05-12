import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { fetchUsers, selectUsers } from '@slices/usersSlice';
import { FetchStatus } from '@data/enum';

const useFetchUsers = (): UsersState => {
  const users = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (users.status === FetchStatus.idle) dispatch(fetchUsers());
  }, [dispatch, users.status]);

  return users;
};

export default useFetchUsers;
