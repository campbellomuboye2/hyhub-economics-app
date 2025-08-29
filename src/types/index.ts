
export interface WindSolarParkFormInputs {
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

export interface DairyFarmFormInputs {
  annualMilkProduction: number;
  electricityPrice: number;
  gasUsage: number;
  windTurbines: number;
  solarPanels: number;
  electrolyzerProduction: number;
  fuelCellCurrent: number;
  priceIncreaseMWh: number;
  priceIncreaseM3: number;
  priceIncreaseKgCO2: number;
}

export interface DairyFarmInvestmentRow {
  id: string;
  item: string;
  capex: number;
  isEditable: boolean;
}

export interface ArableFarmingFormInputs {
  windTurbines: number;
  solarPanels: number;
  electricityPrice: number;
  gasUsage: number;
  electrolyzerProduction: number;
  hydrogenPrice: number;
}
