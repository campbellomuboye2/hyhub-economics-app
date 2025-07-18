"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CountUp } from "@/components/common/CountUp";

const OutputCard = ({ title, value, unit, decimals = 0 }: { title: string, value: number, unit: string, decimals?: number }) => (
  <Card className="text-center bg-gray-50 dark:bg-gray-800/50">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold text-green-600">
        <CountUp end={value} decimals={decimals} />
      </div>
      <p className="text-xs text-muted-foreground">{unit}</p>
    </CardContent>
  </Card>
);

export function OutputDashboard({ calculations }: { calculations: any }) {
  const {
    effectiveGeneration,
    usableShare,
    electrolyserProduction,
    electrolyserHeat,
    demiWater,
    storageCapacity,
    numberOfTanks,
    compressorElectricity,
    opexBAU,
    opexCASE
  } = calculations;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Operational Calculations Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <OutputCard title="Effective Generation" value={effectiveGeneration} unit="MWh/year" />
        <OutputCard title="Usable Share (H₂)" value={usableShare} unit="ton H₂/year" />
        <OutputCard title="Electrolyser Production" value={electrolyserProduction} unit="MWh/year" />
        <OutputCard title="Electrolyser Heat" value={electrolyserHeat} unit="MWh/year" />
        <OutputCard title="Demi Water Needed" value={demiWater} unit="L/year" />
        <OutputCard title="Storage Capacity" value={storageCapacity} unit="m³ H₂" decimals={2} />
        <OutputCard title="Number of Tanks" value={numberOfTanks} unit="(rounded)" />
        <OutputCard title="Compressor Electricity" value={compressorElectricity} unit="MWh/year" />
        <Card className="col-span-2 md:col-span-3 lg:col-span-2 text-center bg-blue-50 dark:bg-blue-900/50 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-600 dark:text-blue-300">OPEX BAU (Base Case)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700 dark:text-blue-200">
              <CountUp end={opexBAU} prefix="€ " />
            </div>
            <p className="text-xs text-blue-500 dark:text-blue-400">per year</p>
          </CardContent>
        </Card>
        <Card className="col-span-2 md:col-span-3 lg:col-span-2 text-center bg-purple-50 dark:bg-purple-900/50 border-purple-200 dark:border-purple-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-600 dark:text-purple-300">OPEX CASE (HyHub)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-700 dark:text-purple-200">
              <CountUp end={opexCASE} prefix="€ " />
            </div>
            <p className="text-xs text-purple-500 dark:text-purple-400">per year</p>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
