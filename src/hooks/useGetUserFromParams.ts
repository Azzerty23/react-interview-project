import { useAppDispatch } from '@app/hooks';
import { FetchStatus } from '@data/enum';
import { fetchUsers } from '@slices/usersSlice';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetchUsers from './useFetchUsers';

const useGetUserFromParams = () => {
  const { userId } = useParams();
  const users = useFetchUsers();
  const dispatch = useAppDispatch();
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    if (users.status === FetchStatus.idle) dispatch(fetchUsers());
    const user = users.value.find(({ id }) => id.toString() === userId);
    setCurrentUser(user);
  }, [dispatch, users.status, userId]);

  return currentUser;
};

export default useGetUserFromParams;
