import {
  MasterDataConfig,
  MasterDataSource,
} from '../modules/master-data/config/master-data-config.service';
import { environment } from '../../environments/environment';

const config = new MasterDataConfig();

config.sources = [
  // new MasterDataSource<Employee>({
  //   href: 'employees',
  //   endpoint: environment.endpoints.data.employees,
  //   label: { plural: 'Сотрудники', single: 'Сотрудник' },
  //   entity: new Employee(),
  //   entityName: 'Employee',
  // }),
];

export const masterDataConfig = config;
