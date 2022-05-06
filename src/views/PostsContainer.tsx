import type { FunctionComponent } from 'react';
import fetcher from '@helpers/fetcher';
import useSWRImmutable from 'swr/immutable';
import PostsFeed from '@components/posts/PostsFeed';
import Spinner from '@components/ui/Spinner';
import type { User } from './UsersContainer';

export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

const PostsContainer: FunctionComponent = () => {
  const { data: posts, error } = useSWRImmutable<Post[]>(
    'https://jsonplaceholder.typicode.com/posts/',
    fetcher
  );

  const { data: users, error: usersError } = useSWRImmutable<User[]>(
    'https://jsonplaceholder.typicode.com/users/',
    fetcher
  );

  if (error || usersError) return <div>An error has occurred.</div>;
  if (!posts || !users)
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="mx-auto mt-8 max-w-3xl">
      <PostsFeed posts={posts} users={users} />
    </div>
  );
};

export default PostsContainer;
