import * as dayjs from 'dayjs';
import { Entity } from '@contracts/master-data/entity.class';

import { ReportsConfig, ReportMetadata, EntityRefParam, DatePeriodParam } from '../modules/reports/config/reports-config';
import { environment } from '../../environments/environment';

export const reportsConfig = new ReportsConfig().setup([
  new ReportMetadata({
    name: 'promotion-progress',
    endpoint: environment.endpoints.reports.promotionProgress,
    label: 'Выполнение акции',
    params: [
      new EntityRefParam({
        name: 'promotion',
        label: 'Промо',
        source: 'promotions',
      }).registerParamsMapper((model: Entity) => ([{ key: 'promotionId', value: model.id }])),
      new DatePeriodParam({
        name: 'period',
        label: 'Период',
      }).registerParamsMapper((model: any) => ([
        { key: 'dateFrom', value: dayjs(model.begin).format('YYYY-MM-DD') },
        { key: 'dateTo', value: dayjs(model.end).format('YYYY-MM-DD') }
      ]))
    ]
  })
])
