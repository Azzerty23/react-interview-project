import { useAppDispatch } from '@app/hooks';
import { editUser } from '@slices/usersSlice';
import { FormEventHandler, useState } from 'react';

interface UserForm extends User, Record<string, any> {}

type UserFormEditProps = {
  user: UserForm;
  onCancel: Function;
};

const UserFormEdit = ({ user, onCancel }: UserFormEditProps) => {
  const userForm = { ...user };
  userForm.firstname = user.name.split(' ')[0];
  userForm.lastname = user.name.split(' ')[1];

  const [form, setForm] = useState<UserForm>(userForm);

  const dispatch = useAppDispatch();

  const onSubmit = async (e: any): Promise<void> => {
    e.preventDefault();
    const { firstname, lastname, ...editingUser } = form;
    editingUser.name = `${firstname} ${lastname}`;
    try {
      const editedUser = await fetch(
        `https://jsonplaceholder.typicode.com/users/${user.id}`,
        {
          method: 'PUT',
          body: JSON.stringify({
            ...editingUser,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      ).then((response) => response.json());
      dispatch(editUser(editedUser));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={onSubmit as FormEventHandler<HTMLFormElement>}
      className="space-t-6 sm:space-t-5 flex h-full flex-col pt-8 sm:pt-6"
    >
      <div className="h-full overflow-y-auto">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Personal Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Use a permanent address where you can receive mail.
          </p>
        </div>
        <div className="space-y-6 sm:space-y-5">
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Username
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                value={form.username}
                onChange={(e) =>
                  setForm({
                    ...form,
                    username: e.target.value,
                  })
                }
                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="firstname"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              First name
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <input
                type="text"
                name="firstname"
                id="firstname"
                autoComplete="given-name"
                value={form.firstname}
                onChange={(e) =>
                  setForm({
                    ...form,
                    firstname: e.target.value,
                  })
                }
                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:max-w-xs sm:text-sm"
              />
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Last name
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <input
                type="text"
                name="lastname"
                id="lastname"
                autoComplete="family-name"
                value={form.lastname}
                onChange={(e) =>
                  setForm({
                    ...form,
                    lastname: e.target.value,
                  })
                }
                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:max-w-xs sm:text-sm"
              />
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Email address
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email.toLowerCase()}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Phone number
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <input
                id="phone"
                name="phone"
                type="text"
                autoComplete="phone"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="street-address"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Street address
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <input
                type="text"
                name="street"
                id="street"
                autoComplete="street"
                value={form.address.street}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: { street: e.target.value },
                  })
                }
                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="postal-code"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              ZIP / Postal code
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <input
                type="text"
                name="postal-code"
                id="postal-code"
                autoComplete="postal-code"
                value={form.address.zipcode}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: { zipcode: e.target.value },
                  })
                }
                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:max-w-xs sm:text-sm"
              />
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              City
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <input
                type="text"
                name="city"
                id="city"
                autoComplete="city"
                value={form.address.city}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: { city: e.target.value },
                  })
                }
                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:max-w-xs sm:text-sm"
              />
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="company"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Company
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <input
                type="text"
                name="company"
                id="company"
                autoComplete="company"
                value={form.company.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    company: { ...form.company, name: e.target.value },
                  })
                }
                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:max-w-xs sm:text-sm"
              />
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="website"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Website
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <input
                type="text"
                name="website"
                id="website"
                autoComplete="website"
                value={form.website}
                onChange={(e) =>
                  setForm({
                    ...form,
                    website: e.target.value,
                  })
                }
                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:max-w-xs sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-shrink-0 justify-end gap-x-1 py-4">
        <button
          type="button"
          onClick={() => onCancel()}
          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default UserFormEdit;
