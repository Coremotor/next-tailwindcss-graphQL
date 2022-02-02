import { FC, useEffect, useState } from "react";
import { ClientOnly } from "../../components/clientOnly";
import { Users } from "../../components/users";
import { CreateUser } from "../../components/createUser";
import { useQuery } from "@apollo/client";
import { TGetUsers, TUser } from "../../graphQL/types";
import { GET_ALL_USERS } from "../../graphQL/query/getAllUsers";

export const HomePage: FC = () => {
  const { data, loading, error, refetch } = useQuery<TGetUsers>(GET_ALL_USERS);
  const [users, setUsers] = useState<TUser[]>([]);

  useEffect(() => {
    if (!loading && data) {
      setUsers(data.getAllUsers);
    }
  }, [data, loading]);

  useEffect(() => {
    refetch().then();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return <div>error</div>;
  }

  return (
    <ClientOnly>
      <div className="container mx-auto px-4 h-screen flex flex-col">
        <Users users={users} />
        <CreateUser users={users} setUsers={setUsers} />
      </div>
    </ClientOnly>
  );
};
