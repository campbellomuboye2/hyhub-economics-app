
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ARABLE_FARMING_CONSTANTS } from "@/lib/arable-farming-constants";
import { Card, CardContent } from "@/components/ui/card";

export function ConstantsAccordion() {
  const constantLabels: Record<keyof typeof ARABLE_FARMING_CONSTANTS, string> = {
    const1: "Ref. value windmill 3MW (MWh/year)",
    const2: "Ref. value solar panel (KWh/panel/year)",
    const3: "Conversion factor gas to KWh/m³",
    const4: "Electrolyzer conversion factor (KWh/kg)",
    const5: "Effective generation (%)",
    const6: "Return delivery (€)",
    const7: "Storage capacity (weeks)",
    const8: "Water required (L/kg)",
    const9: "Compression at 700 bar (kg/m³)",
    const10: "Demi water price (€/L)",
    const11: "Electrolyzer heat %",
    const12: "Tank volume (m³)",
    const13: "Gas price (€/m³)",
    const14: "Compression 700 bar (MWh/ton)",
    const15: "CAPEX electrolyzer (€)",
    const16: "CAPEX compressor (€)",
    const17: "CAPEX storage (€)",
    const18: "Permits (fraction)",
  };

  return (
    <Card className="shadow-lg fixed bottom-0 left-0 right-0 z-10 mx-auto max-w-7xl lg:relative">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger className="p-4 bg-gray-100 dark:bg-gray-800 hover:no-underline rounded-t-lg">
            View Constants
          </AccordionTrigger>
          <AccordionContent>
            <CardContent className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Object.entries(ARABLE_FARMING_CONSTANTS).map(([key, value]) => (
                <div key={key} className="p-2 bg-gray-50 dark:bg-gray-900 rounded-md">
                  <p className="text-sm text-muted-foreground">{constantLabels[key as keyof typeof ARABLE_FARMING_CONSTANTS]}</p>
                  <p className="text-lg font-semibold text-primary">{value}</p>
                </div>
              ))}
            </CardContent>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
