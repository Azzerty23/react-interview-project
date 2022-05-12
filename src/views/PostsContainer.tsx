import { FunctionComponent } from 'react';
import PostsFeed from '@components/posts/PostsFeed';
import Spinner from '@components/ui/Spinner';
import { FetchStatus } from '@data/enum';
import useFetchPosts from '@hooks/useFetchPosts';
import useFetchUsers from '@hooks/useFetchUsers';

const PostsContainer: FunctionComponent = () => {
  const posts = useFetchPosts();
  const users = useFetchUsers();

  if (posts.error || users.error) return <div>An error has occurred.</div>;
  if (
    posts.status === FetchStatus.loading ||
    users.status === FetchStatus.loading
  ) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mx-auto mt-8 max-w-3xl">
      <PostsFeed posts={posts.value} users={users.value} />
    </div>
  );
};

export default PostsContainer;
