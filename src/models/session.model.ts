export interface ISession {
  email: string;
  password: string;
}

export interface ISessionResponse {
  token: string;
  user: {
    id: string;
    role: string;
  };
}
