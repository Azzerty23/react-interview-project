import { FunctionComponent, useEffect, useState } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import Heading from '@components/ui/Heading';
import UserProfile from '@components/users/UserProfile';
import Spinner from '@components/ui/Spinner';
import PostsUserList from '@components/posts/PostsUserList';
import SlideOver from '@components/ui/SlideOver';
import UserFormEdit from '@components/users/UserFormEdit';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { fetchUsers, selectUsers } from '@slices/usersSlice';
import { fetchPosts, selectPosts } from '@slices/postsSlice';
import { FetchStatus } from '@data/enum';

const UserContainer: FunctionComponent = () => {
  const [slideOverOpen, setSlideOverOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User>();

  const { userId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const edit = searchParams.get('edit');

  const openSlideOver = () => {
    setSearchParams({ edit: 'true' }, { replace: true });
  };
  const closeSlideOver = () => {
    setSearchParams({ edit: 'false' }, { replace: true });
  };

  const users = useAppSelector(selectUsers);
  const posts = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (users.status === FetchStatus.idle) dispatch(fetchUsers());
    const user = users.value.find(({ id }) => id.toString() === userId);
    setCurrentUser(user);
  }, [dispatch, users, userId]);

  useEffect(() => {
    if (posts.status === FetchStatus.idle) dispatch(fetchPosts());
  }, [dispatch, posts]);

  useEffect(() => {
    if (edit === 'true') {
      setSlideOverOpen(true);
    } else {
      setSlideOverOpen(false);
    }
  }, [edit]);

  if (users.error || posts.error) return <div>An error has occurred.</div>;
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
