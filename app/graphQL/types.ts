export type TUser = {
  avatar?: string;
  email: string;
  first_name: string;
  id: string;
  last_name: string;
};

export type TGetUsers = {
  getAllUsers: TUser[];
};

export type TGetUser = {
  getUser: TUser;
};

export type TCreateUser = {
  createUser: TUser;
};

export type TDeleteUser = {
  deleteUser: Boolean;
};
