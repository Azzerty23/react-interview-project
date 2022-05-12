import { useSearchParams } from 'react-router-dom';
import PostsList from './PostList';
import PostsTabs from './PostsTabs';
import { useEffect, useState } from 'react';

type PostsFeedProps = {
  posts: Post[];
  users: User[];
};

const PostsFeed = ({ posts, users }: PostsFeedProps) => {
  const [sortedPosts, setSortedPosts] = useState(posts);
  const [searchParams] = useSearchParams();

  const sorting = searchParams.get('sortBy');

  useEffect(() => {
    if (posts.length === 0) return;
    let newSortedPosts: Post[];
    switch (sorting) {
      case 'recent': {
        newSortedPosts = [...posts].sort(
          (a, b) => (new Date(b.date) as any) - (new Date(a.date) as any)
        );
        break;
      }
      case 'liked': {
        newSortedPosts = [...posts].sort((a, b) => b.likes - a.likes);
        break;
      }
      case 'answered': {
        newSortedPosts = [...posts].sort((a, b) => b.replies - a.replies);
        break;
      }
      default: {
        newSortedPosts = [...posts].sort(
          (a, b) => (new Date(b.date) as any) - (new Date(a.date) as any)
        );
      }
    }
    setSortedPosts(newSortedPosts);
  }, [sorting, posts]);

  return (
    <>
      <PostsTabs />
      <div className="mt-4">
        <h1 className="sr-only">Recent posts</h1>
        <PostsList posts={sortedPosts} users={users} />
      </div>
    </>
  );
};

export default PostsFeed;
