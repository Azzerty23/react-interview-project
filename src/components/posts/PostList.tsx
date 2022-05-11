import PostCard from '@components/posts/PostCard';

type PostsListProps = {
  posts: Post[];
  users: User[];
};

const PostsList = ({ posts, users }: PostsListProps) => (
  <ul className="space-y-4">
    {posts.map((post) => {
      const author = users.find((user) => user.id === post.userId)!;
      return <PostCard key={post.id} post={post} author={author} />;
    })}
  </ul>
);

export default PostsList;
