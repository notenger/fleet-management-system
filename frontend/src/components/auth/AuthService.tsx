import { User, UserManager } from "oidc-client-ts";

export default class AuthService {
  userManager: UserManager;

  constructor() {
    const settings = {
      authority: process.env.REACT_APP_AUTHORITY!,
      client_id: process.env.REACT_APP_CLIENT_ID!,
      redirect_uri: `${process.env.REACT_APP_CLIENT_BASE_URL}/openid/callback`,
      silent_redirect_uri: `${process.env.REACT_APP_CLIENT_BASE_URL}/openid/callback`,
      post_logout_redirect_uri: `${process.env.REACT_APP_CLIENT_BASE_URL}`,
      response_type: "code",
      scope: process.env.REACT_APP_CLIENT_SCOPE,
    };
    this.userManager = new UserManager(settings);
  }

  public getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }

  public login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  public loginCallback(): Promise<User> {
    return this.userManager.signinRedirectCallback();
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }
}
