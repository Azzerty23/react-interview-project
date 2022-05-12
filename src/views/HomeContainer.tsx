import { FunctionComponent } from 'react';
import Overview from '@components/overview/Overview';
import useFetchPosts from '@hooks/useFetchPosts';
import useFetchUsers from '@hooks/useFetchUsers';

const HomeContainer: FunctionComponent = () => {
  const posts = useFetchPosts();
  const users = useFetchUsers();

  return <Overview users={users.value} posts={posts.value} />;
};

export default HomeContainer;
