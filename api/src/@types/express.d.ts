declare namespace Express {
  interface Request {
    user?: {
      id: string;
      name: string;
      login: string;
      email: string;
      isAdmin: boolean;
    };
  }
}
