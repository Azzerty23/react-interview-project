import { FunctionComponent, useEffect } from 'react';
import PostsFeed from '@components/posts/PostsFeed';
import Spinner from '@components/ui/Spinner';
import { fetchPosts, selectPosts } from '@slices/postsSlice';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { fetchUsers, selectUsers } from '@slices/usersSlice';
import { FetchStatus } from '@data/enum';

const PostsContainer: FunctionComponent = () => {
  const posts = useAppSelector(selectPosts);
  const users = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (posts.status === FetchStatus.idle) dispatch(fetchPosts());
  }, [dispatch, posts]);

  useEffect(() => {
    if (users.status === FetchStatus.idle) dispatch(fetchUsers());
  }, [dispatch, users]);

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
