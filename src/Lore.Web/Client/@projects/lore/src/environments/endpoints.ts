import { Endpoints } from '@contracts/environment.class';
import { isUndefined } from 'lodash/fp';

export const endpoints: Endpoints = {
  authentication: {
    signIn: '/api/authentication/signIn',
    signOut: '/api/authentication/signOut',
    refreshAccess: '/api/authentication/refreshAccess'
  },
  classifiers: '/api/classifiers/{codeKey}',
  data: {
    clients: '/api/clients',
    outlets: '/api/outlets',
    employees: '/api/employees',
    products: '/api/products',
    promotions: '/api/loretions',
    promotionStatuses: '/api/loretionStatuses',
    promotionMechanics: '/api/loretionMechanics'
  },
  promotions: {
    process: '/api/loretions/{id}'
  },
  reports: {
    promotionProgress: '/api/reports/loretionProgress'
  },
  users: {
    currentUser: '/api/users/current'
  }
};

export const format = <T>(
  urlTemplate: string,
  params: { [key: string]: string | number | boolean | T }
) => {
  let output = urlTemplate;
  let queryIndex = 0;

  Object.keys(params).map(key => {
    const keyMatch = `{${key}}`;

    if (urlTemplate.includes(keyMatch)) {
      const paramValue = isUndefined(params[key]) ? '' : String(params[key]);
      output = output.replace(keyMatch, paramValue);
      return delete params[key];
    }

    if (!isUndefined(params[key])) {
      const querySymbol = queryIndex === 0 ? '?' : '&';
      queryIndex++;
      output += querySymbol + key + '=' + params[key];
    }
  });

  return output;
};
