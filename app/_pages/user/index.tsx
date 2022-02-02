import { FC } from "react";
import { ClientOnly } from "../../components/clientOnly";
import { User } from "../../components/user";

export const UserPage: FC = () => {
  return (
    <ClientOnly>
      <User />
    </ClientOnly>
  );
};
