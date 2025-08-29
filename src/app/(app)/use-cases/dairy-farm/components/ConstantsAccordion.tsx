
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DAIRY_FARM_CONSTANTS } from "@/lib/dairy-farm-constants";
import { Card, CardContent } from "@/components/ui/card";

export function ConstantsAccordion() {
  const constantLabels: Record<keyof typeof DAIRY_FARM_CONSTANTS, string> = {
    const1: "Effective generation (%)",
    const2: "Electrolyzer heat (% of e-use)",
    const3: "Fuel cell heat (%)",
    const4: "CO₂ cost (€/kg)",
    const5: "Energy use factor (KWh/L milk)",
    const6: "Gas conversion factor (KWh/m³)",
    const7: "Solar panel factor (KWh/panel)",
    const8: "Electrolyzer conversion (KWh/kg H₂)",
    const9: "Storage capacity (weeks)",
    const10: "H₂ density @ 700 bar (kg/m³)",
    const11: "Fuel cell usage (KWh/kg H₂)",
    const12: "Wind turbine factor (KWh/5KW/year)",
    const13: "Tank volume (m³)",
    const14: "Gas price (€/m³)",
    const15: "Electricity CO₂ factor (kg/kWh)",
    const16: "Gas CO₂ factor (kg/m³)",
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
              {Object.entries(DAIRY_FARM_CONSTANTS).map(([key, value]) => (
                <div key={key} className="p-2 bg-gray-50 dark:bg-gray-900 rounded-md">
                  <p className="text-sm text-muted-foreground">{constantLabels[key as keyof typeof DAIRY_FARM_CONSTANTS]}</p>
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
