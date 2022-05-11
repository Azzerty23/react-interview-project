import { FunctionComponent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { fetchPosts, selectPosts } from '@slices/postsSlice';
import { fetchUsers, selectUsers } from '@slices/usersSlice';
import Overview from '@components/overview/Overview';
import { FetchStatus } from '@data/enum';

const HomeContainer: FunctionComponent = () => {
  const posts = useAppSelector(selectPosts);
  const users = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (posts.status === FetchStatus.idle) dispatch(fetchPosts());
  }, [dispatch, posts]);

  useEffect(() => {
    if (users.status === FetchStatus.idle) dispatch(fetchUsers());
  }, [dispatch, users]);

  return <Overview users={users.value} posts={posts.value} />;
};

export default HomeContainer;
