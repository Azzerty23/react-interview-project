import { FunctionComponent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Heading from '@components/ui/Heading';
import UserProfile from '@components/users/UserProfile';
import Spinner from '@components/ui/Spinner';
import PostsUserList from '@components/posts/PostsUserList';
import SlideOver from '@components/ui/SlideOver';
import UserFormEdit from '@components/users/UserFormEdit';
import useFetchPosts from '@hooks/useFetchPosts';
import useGetUserFromParams from '@hooks/useGetUserFromParams';

const UserContainer: FunctionComponent = () => {
  const [slideOverOpen, setSlideOverOpen] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const edit = searchParams.get('edit');

  const openSlideOver = () => {
    setSearchParams({ edit: 'true' }, { replace: true });
  };
  const closeSlideOver = () => {
    setSearchParams({ edit: 'false' }, { replace: true });
  };

  const posts = useFetchPosts();
  const currentUser = useGetUserFromParams();

  useEffect(() => {
    if (edit === 'true') {
      setSlideOverOpen(true);
    } else {
      setSlideOverOpen(false);
    }
  }, [edit]);

  if (posts.error) return <div>An error has occurred.</div>;
  if (!currentUser || !posts)
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <Heading title={currentUser.name} onEdit={openSlideOver} />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="py-8">{<UserProfile user={currentUser} />}</div>
        </div>
        <div className="mx-auto max-w-3xl">
          <h3 className="my-4 pl-4 text-lg font-medium leading-6 text-gray-900 sm:pl-6">
            Latest Posts
          </h3>
          <PostsUserList posts={posts.value} user={currentUser} />
        </div>
      </div>
      <SlideOver
        title={`Edit user #${currentUser.id}`}
        content={<UserFormEdit user={currentUser} onCancel={closeSlideOver} />}
        open={slideOverOpen}
        onClose={closeSlideOver}
      />
    </>
  );
};

export default UserContainer;
