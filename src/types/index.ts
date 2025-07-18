export interface FormInputs {
  windGeneration: number;
  sunGeneration: number;
  mwProduction: number;
  demiWaterCost: number;
  h2Cost: number;
  priceIncreaseMwh: number;
  priceIncreaseH2: number;
  priceIncreaseDemi: number;
}

export interface InvestmentRow {
  id: string;
  item: string;
  capex: number;
  reference: string;
}
