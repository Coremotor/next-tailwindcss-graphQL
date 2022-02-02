import { FC } from "react";
import { useRouter } from "next/router";
import { TUser } from "../graphQL/types";
import { Card } from "./card";

type TProps = {
  users: TUser[];
};

export const Users: FC<TProps> = ({ users }) => {
  const router = useRouter();
  const goToUserPage = (id: string) => router.push(`/user/?id=${id}`);

  return (
    <div className="flex flex-wrap my-10 justify-center">
      {users.map((user) => (
        <div
          className="mr-2 mb-2"
          key={user.id}
          onClick={() => goToUserPage(user.id)}
        >
          <Card user={user} />
        </div>
      ))}
    </div>
  );
};
