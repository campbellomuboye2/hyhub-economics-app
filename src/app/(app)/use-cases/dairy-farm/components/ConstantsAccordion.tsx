
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
    const5: "KWh per liter milk",
    const6: "KWh per m³ gas",
    const7: "KWh per solar panel/year",
    const8: "KWh per kg H₂",
    const9: "Weeks storage capacity",
    const10: "kg/m³ @ 700 bar",
    const11: "KWh/kg H₂ fuel cell usage",
    const12: "KWh/year per 5KW wind turbine",
    const13: "m³ tank volume",
    const14: "Gas price (€/m³)",
    const15: "kg CO₂/kWh electricity",
    const16: "kg CO₂/m³ gas",
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
