declare namespace Express {
  /**
   * Middleware verify the access token & assign more information to the Request params.
   */
  interface Request {
    payload: User;
  }

  interface User {
    id: number;
    tokenType: number;
    userType: string;
  }
}
