"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CONSTANTS } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";

export function ConstantsAccordion() {
  const constantLabels: Record<keyof typeof CONSTANTS, string> = {
    const1: "Effective generation factor",
    const2: "€ per MWh",
    const3: "Usable share factor for H2 production",
    const4: "Electrolyser heat production factor",
    const5: "Constant 5 (not used)",
    const6: "Constant 6 (not used)",
    const7: "Constant 7 (not used)",
    const8: "Energy consumption of electrolyser (MWh/ton H2)",
    const9: "Demi water consumption (L/kWh)",
    const10: "Energy density of H2 (kWh/m³)",
    const11: "Compressor energy consumption (kWh/kg H2)",
    const12: "Storage tank capacity (m³)",
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
              {Object.entries(CONSTANTS).map(([key, value]) => (
                <div key={key} className="p-2 bg-gray-50 dark:bg-gray-900 rounded-md">
                  <p className="text-sm text-muted-foreground">{constantLabels[key as keyof typeof CONSTANTS]}</p>
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
