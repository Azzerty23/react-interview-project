import { Link } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import {
  ChatAltIcon,
  CodeIcon,
  DotsVerticalIcon,
  EyeIcon,
  FlagIcon,
  ShareIcon,
  StarIcon,
  ThumbUpIcon,
} from '@heroicons/react/solid';
import clsx from 'clsx';

type PostProps = {
  post: Post;
  author: User;
};

const PostCard = ({ post, author }: PostProps) => {
  return (
    <li
      key={post.id}
      className="bg-white px-4 py-6 shadow sm:rounded-lg sm:p-6"
    >
      <article aria-labelledby={'post-title-' + post.id}>
        <div>
          <div className="flex space-x-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900">
                <Link to={`/users/${post.userId}`} className="hover:underline">
                  {author?.name}
                </Link>
              </p>
              <p className="text-sm text-gray-500">{post.date}</p>
            </div>
            <div className="flex flex-shrink-0 self-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600">
                    <span className="sr-only">Open options</span>
                    <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
                  </Menu.Button>
                </div>

                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <span
                          className={clsx(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'flex cursor-pointer px-4 py-2 text-sm'
                          )}
                        >
                          <StarIcon
                            className="mr-3 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <span>Add to favorites</span>
                        </span>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <span
                          className={clsx(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'flex cursor-pointer px-4 py-2 text-sm'
                          )}
                        >
                          <CodeIcon
                            className="mr-3 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <span>Embed</span>
                        </span>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <span
                          className={clsx(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'flex cursor-pointer px-4 py-2 text-sm'
                          )}
                        >
                          <FlagIcon
                            className="mr-3 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <span>Report content</span>
                        </span>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Menu>
            </div>
          </div>
          <h2
            id={'post-title-' + post.id}
            className="mt-4 text-base font-medium text-gray-900"
          >
            {post.title}
          </h2>
        </div>
        <div className="mt-2 space-y-4 text-sm text-gray-700">{post.body}</div>
        <div className="mt-6 flex justify-between space-x-8">
          <div className="flex space-x-6">
            <span className="inline-flex items-center text-sm">
              <button
                type="button"
                className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
              >
                <ThumbUpIcon className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium text-gray-900">{post.likes}</span>
                <span className="sr-only">likes</span>
              </button>
            </span>
            <span className="inline-flex items-center text-sm">
              <button
                type="button"
                className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
              >
                <ChatAltIcon className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium text-gray-900">
                  {post.replies}
                </span>
                <span className="sr-only">replies</span>
              </button>
            </span>
            <span className="inline-flex items-center text-sm">
              <button
                type="button"
                className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
              >
                <EyeIcon className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium text-gray-900">{post.views}</span>
                <span className="sr-only">views</span>
              </button>
            </span>
          </div>
          <div className="flex text-sm">
            <span className="inline-flex items-center text-sm">
              <button
                type="button"
                className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
              >
                <ShareIcon className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium text-gray-900">Share</span>
              </button>
            </span>
          </div>
        </div>
      </article>
    </li>
  );
};

export default PostCard;
