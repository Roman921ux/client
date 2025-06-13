export type IUser = {
  userName: string;
  email: string;
  phone: string;
  role: "basic" | "admin";
};

export type IUserDto = IUser & {
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
};
