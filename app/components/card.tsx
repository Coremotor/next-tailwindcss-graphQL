import { FC } from "react";
import { TUser } from "../graphQL/types";

type TProps = {
  user: TUser;
};

export const Card: FC<TProps> = ({ user }) => {
  return (
    <div className="flex flex-col p-6 rounded-md shadow-sm rounded bg-white hover:shadow-2xl cursor-pointer">
      <img src={user.avatar} alt="ava" className="rounded-full w-60 h-60" />
      <div className="mt-10 font-bold text-slate-600">{user.first_name}</div>
    </div>
  );
};
