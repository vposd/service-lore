const BASELINE_COLUMNS = [
  'baseline-volume',
  'baseline-net-cost',
  'baseline-revenue',
  'baseline-margin'
];

const PLAN_COLUMNS = [
  'plan-volume',
  'plan-net-cost',
  'plan-revenue',
  'plan-margin',
  'plan-uplift-volume',
  'plan-uplift-amount',
  'plan-roi'
];

const FACT_COLUMNS = [
  'fact-volume',
  'fact-net-cost',
  'fact-revenue',
  'fact-margin',
  'fact-uplift-volume',
  'fact-uplift-amount'
];

const PLANFACT_COLUMNS = [
  'planfact-volume',
  'planfact-net-cost',
  'planfact-revenue',
  'planfact-margin',
  'planfact-uplift-volume',
  'planfact-uplift-amount',
  'planfact-roi-plan',
  'planfact-roi-fact'
];

const SKU_COLUMNS = ['article', 'name'];
const HIGH_LEVEL_COLUMNS = ['product', 'baseline', 'plan', 'fact', 'planfact'];

export {
  BASELINE_COLUMNS,
  PLAN_COLUMNS,
  HIGH_LEVEL_COLUMNS,
  SKU_COLUMNS,
  FACT_COLUMNS,
  PLANFACT_COLUMNS
};
