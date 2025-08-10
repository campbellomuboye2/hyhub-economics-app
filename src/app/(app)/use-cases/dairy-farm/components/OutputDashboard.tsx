
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CountUp } from "@/components/common/CountUp";

const OutputCard = ({ title, value, unit, decimals = 0 }: { title: string, value: number, unit: string, decimals?: number }) => (
  <Card className="text-center bg-gray-50 dark:bg-gray-800/50">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-primary">
        <CountUp end={value} decimals={decimals} />
      </div>
      <p className="text-xs text-muted-foreground">{unit}</p>
    </CardContent>
  </Card>
);

export function OutputDashboard({ calculations }: { calculations: any }) {
  const {
    output1, output2, output3, output4, output5, output6, output7,
    output8, output9, output10, output11, output12, output13
  } = calculations;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Energy & Production Outputs</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <OutputCard title="Business Use - Electricity" value={output1} unit="KWh" />
        <OutputCard title="Business Case - Gas" value={output2} unit="KWh" />
        <OutputCard title="Wind Generation" value={output3} unit="KWh" />
        <OutputCard title="Solar Generation" value={output4} unit="KWh" />
        <OutputCard title="Effective Generation" value={output5} unit="KWh" />
        <OutputCard title="Loss to Grid Congestion" value={output6} unit="KWh" />
        <OutputCard title="Purchased Electricity" value={output7} unit="KWh" />
        <OutputCard title="Electrolyzer Production" value={output8} unit="kg H₂" decimals={2}/>
        <OutputCard title="Storage Capacity" value={output9} unit="m³" decimals={2}/>
        <OutputCard title="Number of Tanks" value={output10} unit="(rounded)" decimals={2}/>
        <OutputCard title="Electrolyzer Heat" value={output11} unit="KWh" />
        <OutputCard title="Fuel Cell Electricity Use" value={output12} unit="KWh" />
        <OutputCard title="Fuel Cell Heat" value={output13} unit="KWh" />
      </CardContent>
    </Card>
  );
}
