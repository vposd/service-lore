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
    updateState: string;
  };
  orderStates: {
    root: string;
    single: string;
  };
}

export abstract class Environment {
  abstract production: boolean;
  abstract endpoints: Endpoints;
}
