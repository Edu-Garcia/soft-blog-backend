export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}

export interface ICreateUserInput {
  name: string;
  email: string;
  password: string;
}

export interface IUpdateUserInput {
  id: string;
  name?: string;
}

export interface IUsersRepository {
  create(data: ICreateUserInput): Promise<IUser>;
  save(user: IUser): Promise<IUser>;
  remove(user: IUser): Promise<void>;
  find(): Promise<IUser[]>;
  findAdmin(id: string): Promise<IUser | undefined>;
  findById(id: string): Promise<IUser | undefined>;
  findByEmail(email: string): Promise<IUser | undefined>;
}
