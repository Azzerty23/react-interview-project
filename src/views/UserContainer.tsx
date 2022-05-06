import { FunctionComponent, useEffect, useState } from 'react';
import Heading from '@components/ui/Heading';
import { useSearchParams, useParams } from 'react-router-dom';
import fetcher from '@helpers/fetcher';
import useSWRImmutable from 'swr/immutable';
import type { User } from './UsersContainer';
import UserProfile from '@components/users/UserProfile';
import Spinner from '@components/ui/Spinner';
import type { Post } from './PostsContainer';
import PostsUserList from '@components/posts/PostsUserList';
import SlideOver from '@components/ui/SlideOver';
import UserFormEdit from '@components/users/UserFormEdit';

const UserContainer: FunctionComponent = () => {
  const [slideOverOpen, setSlideOverOpen] = useState<boolean>(false);

  const { userId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const edit = searchParams.get('edit');

  const openSlideOver = () => {
    setSearchParams({ edit: 'true' }, { replace: true });
  };
  const closeSlideOver = () => {
    setSearchParams({ edit: 'false' }, { replace: true });
  };

  const { data: user, error } = useSWRImmutable<User>(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
    fetcher
  );

  const { data: posts, error: postsError } = useSWRImmutable<Post[]>(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
    fetcher
  );

  useEffect(() => {
    if (edit === 'true') {
      setSlideOverOpen(true);
    } else {
      setSlideOverOpen(false);
    }
  }, [edit]);

  if (error || postsError) return <div>An error has occurred.</div>;
  if (!user || !posts)
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <Heading title={user.name} editable onEdit={openSlideOver} />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="py-8">{<UserProfile user={user} />}</div>
        </div>
        <div className="mx-auto max-w-3xl">
          <h3 className="my-4 pl-4 text-lg font-medium leading-6 text-gray-900 sm:pl-6">
            Latest Posts
          </h3>
          <PostsUserList posts={posts} user={user} />
        </div>
      </div>
      <SlideOver
        title={`Edit user #${user.id}`}
        content={<UserFormEdit user={user} onCancel={closeSlideOver} />}
        open={slideOverOpen}
        onClose={closeSlideOver}
      />
    </>
  );
};

export default UserContainer;
