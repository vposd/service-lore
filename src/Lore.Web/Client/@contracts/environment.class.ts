export interface Endpoints {
  authentication: {
    signIn: string;
    signOut: string;
    refreshAccess: string;
  };
  attributes: {
    root: string;
    attributeValues: string;
  };
  users: {
    currentUser: string;
  };
  data: {};
  orders: {
    root: string;
    updateState: string;
  };
  orderStatuses: {
    root: string;
    single: string;
  };
  failures: {
    root: string;
  };
}

export abstract class Environment {
  abstract production: boolean;
  abstract endpoints: Endpoints;
}
