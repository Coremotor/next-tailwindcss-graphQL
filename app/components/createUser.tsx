import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import { useMutation } from "@apollo/client";
import { TCreateUser, TUser } from "../graphQL/types";
import { CREATE_USER } from "../graphQL/mutations/createUser";

type TProps = {
  users: TUser[];
  setUsers: Dispatch<SetStateAction<TUser[]>>;
};

export const CreateUser: FC<TProps> = ({ users, setUsers }) => {
  const [newUser] = useMutation<TCreateUser>(CREATE_USER);

  const [values, setValues] = useState({
    email: "",
    last_name: "",
    first_name: "",
    avatar: "",
  });

  const changeValues = (e: FormEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const addUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    newUser({
      variables: {
        input: {
          email: values.email,
          last_name: values.last_name,
          first_name: values.first_name,
          avatar: values.avatar,
        },
      },
    }).then(({ data }) => {
      if (data) {
        setUsers([...users, data.createUser]);
      }
    });
    setValues({
      email: "",
      last_name: "",
      first_name: "",
      avatar: "",
    });
  };

  return (
    <form onSubmit={addUser} className="container mx-auto">
      <div className="max-w-xl p-5 mx-auto my-10 bg-white rounded-md shadow-sm">
        <div className="text-center">
          <h1 className="my-3 text-3xl font-semibold text-gray-700">
            Create user
          </h1>
        </div>
        <div>
          <div>
            <div className="mb-6">
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm text-gray-600"
              >
                First Name
              </label>
              <input
                onInput={changeValues}
                value={values.first_name}
                type="text"
                name="first_name"
                placeholder="John"
                required
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="last_name"
                className="block mb-2 text-sm text-gray-600"
              >
                Last Name
              </label>
              <input
                onInput={changeValues}
                value={values.last_name}
                type="text"
                name="last_name"
                placeholder="Doe"
                required
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm text-gray-600"
              >
                Email Address
              </label>
              <input
                onInput={changeValues}
                value={values.email}
                type="email"
                name="email"
                placeholder="you@email.com"
                required
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="avatar" className="text-sm text-gray-600">
                Avatar url
              </label>
              <input
                onInput={changeValues}
                value={values.avatar}
                type="text"
                name="avatar"
                placeholder="https://placekitten.com/200/300"
                required
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              />
            </div>

            <div className="mb-6">
              <button
                type="submit"
                className="w-full px-2 py-4 text-white bg-indigo-500 rounded-md  focus:bg-indigo-600 focus:outline-none"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
