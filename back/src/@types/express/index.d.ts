declare namespace Express {
  export interface Request {
    user: { id: string; email: string; nm_user: string; organization: { id: string; nm_organization: string } };
  }
}
