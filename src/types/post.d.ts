type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
  date: string;
  likes: number;
  replies: number;
  views: number;
};

type PostsState = {
  value: Post[];
  status: FetchStatus;
  error: string | null;
};
