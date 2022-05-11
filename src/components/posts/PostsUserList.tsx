import { useMemo } from 'react';
import PostCard from '@components/posts/PostCard';

type PostsUserListProps = {
  posts: Post[];
  user: User;
};

const PostsUserList = ({ posts, user }: PostsUserListProps) => {
  const userPosts = useMemo(
    () => posts.filter((post) => post.userId === user.id),
    [posts, user]
  );
  return (
    <ul className="space-y-4">
      {userPosts.map((post) => {
        return <PostCard key={post.id} post={post} author={user} />;
      })}
    </ul>
  );
};

export default PostsUserList;
