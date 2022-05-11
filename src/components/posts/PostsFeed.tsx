import PostsList from './PostList';
import PostsTabs from './PostsTabs';

type PostsFeedProps = {
  posts: Post[];
  users: User[];
};

const PostsFeed = ({ posts, users }: PostsFeedProps) => {
  return (
    <>
      <PostsTabs />
      <div className="mt-4">
        <h1 className="sr-only">Recent posts</h1>
        <PostsList posts={posts} users={users} />
      </div>
    </>
  );
};

export default PostsFeed;
