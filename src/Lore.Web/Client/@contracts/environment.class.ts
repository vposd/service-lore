export interface Endpoints {
  authentication: {
    signIn: string;
    signOut: string;
    refreshAccess: string;
  };
  classifiers: string;
  data: {
    clients: string;
    outlets: string;
    employees: string;
    products: string;
    promotions: string;
    promotionStatuses: string;
    promotionMechanics: string;
  };
  promotions: {
    process: string;
  };
  reports: {
    promotionProgress: string;
  };
  users: {
    currentUser: string;
  };
}

export abstract class Environment {
  abstract production: boolean;
  abstract endpoints: Endpoints;
}
