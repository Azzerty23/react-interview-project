import { FetchStatus } from '@data/enum';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetchUsers from './useFetchUsers';

const useGetUserFromParams = () => {
  const [currentUser, setCurrentUser] = useState<User>();
  const { userId } = useParams();
  const users = useFetchUsers();

  useEffect(() => {
    if (users.status === FetchStatus.succeed) {
      const user = users.value.find(({ id }) => id.toString() === userId);
      setCurrentUser(user);
    }
  }, [users, userId]);

  return currentUser;
};

export default useGetUserFromParams;
