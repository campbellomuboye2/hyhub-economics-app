
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
    output8, output9, output10, output11, output12
  } = calculations;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Operational Calculations Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <OutputCard title="Wind Generation" value={output1} unit="MWh" />
        <OutputCard title="Solar Generation" value={output2} unit="MWh" />
        <OutputCard title="Effective Generation" value={output3} unit="MWh" />
        <OutputCard title="Business Use (E)" value={output4} unit="MWh" />
        <OutputCard title="Business Use (G)" value={output5} unit="MWh" />
        <OutputCard title="Loss to Grid Congestion" value={output6} unit="MWh" />
        <OutputCard title="Electrolyzer Production" value={output7} unit="tons H₂" decimals={2}/>
        <OutputCard title="Electrolyzer Heat" value={output8} unit="MWh" />
        <OutputCard title="Demi Water" value={output9} unit="Liters" />
        <OutputCard title="Storage Capacity (700 bar)" value={output10} unit="m³" decimals={2}/>
        <OutputCard title="Number of Tanks" value={output11} unit="(rounded)" decimals={2}/>
        <OutputCard title="E-use of Compressor" value={output12} unit="MWh" />
      </CardContent>
    </Card>
  );
}
