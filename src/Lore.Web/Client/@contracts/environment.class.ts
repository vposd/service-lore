export interface Endpoints {
  customers: {
    root: string;
  };
  authentication: {
    signIn: string;
    signOut: string;
    refreshAccess: string;
  };
  attributes: {
    root: string;
    values: string;
    value: string;
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
  products: {
    root: string;
  };
  productGroups: {
    root: string;
  };
  failures: {
    root: string;
  };
}

export abstract class Environment {
  abstract production: boolean;
  abstract endpoints: Endpoints;
}
