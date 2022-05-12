import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { fetchPosts, selectPosts } from '@slices/postsSlice';
import { FetchStatus } from '@data/enum';

const useFetchPosts = (): PostsState => {
  const posts = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (posts.status === FetchStatus.idle) dispatch(fetchPosts());
  }, [dispatch, posts.status]);

  return posts;
};

export default useFetchPosts;
