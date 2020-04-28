export interface Endpoints {
  authentication: {
    signIn: string;
    signOut: string;
    refreshAccess: string;
  };
  users: {
    currentUser: string;
  };
  data: {};
  orders: {
    root: string;
  };
  orderStates: {
    root: string;
  };
}

export abstract class Environment {
  abstract production: boolean;
  abstract endpoints: Endpoints;
}
