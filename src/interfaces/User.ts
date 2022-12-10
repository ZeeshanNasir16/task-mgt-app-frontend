// ^ Client Side
export interface LoginUser {
  email: string;
  password: string;
}

export interface UserBase {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  address: string;
}

export interface AddUser extends UserBase {
  password: string;
  passwordConfirm: string;
}

export interface UpdateUser {
  id: string;
  body: UserBase;
}

// ^ From DB
export interface User extends UserBase {
  _id: string;
  createdAt: string;
  fullName: string;
}
