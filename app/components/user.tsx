import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import { TDeleteUser, TGetUser, TUser } from "../graphQL/types";
import { GET_USER } from "../graphQL/query/getUser";
import { DELETE_USER } from "../graphQL/mutations/deleteUser";

export const User: FC = () => {
  const [delUser] = useMutation<TDeleteUser>(DELETE_USER);
  const router = useRouter();
  const { query } = router;
  const [user, setUser] = useState<TUser>();
  const goBack = () => router.back();

  const deleteUser = () => {
    const c = confirm("Delete user?");
    if (c) {
      delUser({
        variables: {
          id: query.id,
        },
      }).then((r) => {
        if (r.data?.deleteUser) {
          goBack();
        }
      });
    }
  };

  const { data, loading, error } = useQuery<TGetUser>(GET_USER, {
    variables: {
      id: query.id,
    },
  });

  useEffect(() => {
    if (!loading && data) {
      setUser(data.getUser);
    }
  }, [data, loading]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return <div>error</div>;
  }

  return (
    <>
      <div className="w-screen flex flex-row flex-wrap p-3">
        <div className="mx-auto w-2/3">
          <div
            className="rounded-lg shadow-lg bg-gray-600 w-full flex flex-row flex-wrap p-3 antialiased"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1578836537282-3171d77f8632?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80')",
              backgroundRepeat: "no-repat",
              backgroundSize: "cover",
              backgroundBlendMode: "multiply",
            }}
          >
            <div className="md:w-1/3 w-full">
              <img
                className="rounded-lg shadow-lg antialiased"
                src={user?.avatar}
              />
            </div>
            <div className="md:w-2/3 w-full px-3 flex flex-row flex-wrap">
              <div className="w-full text-right text-gray-700 font-semibold relative pt-3 md:pt-0">
                <div className="text-2xl text-white leading-tight">
                  {user?.first_name}
                </div>
                <div className="text-normal text-gray-300 hover:text-gray-400 cursor-pointer">
                  <span className="border-b border-dashed border-gray-500 pb-1">
                    {user?.last_name}
                  </span>
                </div>
                <div className="text-sm text-gray-300 hover:text-gray-400 cursor-pointer md:absolute pt-3 md:pt-0 bottom-0 right-0">
                  {user?.email}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mx-auto w-1/2 justify-between my-4">
        <div
          onClick={goBack}
          className="cursor-pointer text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700"
        >
          Go back
        </div>
        <div
          onClick={deleteUser}
          className="cursor-pointer text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Delete user
        </div>
      </div>
    </>
  );
};
