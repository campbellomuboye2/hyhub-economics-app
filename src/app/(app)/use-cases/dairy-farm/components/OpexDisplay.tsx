
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CountUp } from "@/components/common/CountUp";

export function OpexDisplay({ calculations }: { calculations: any }) {
  const { opexBAU, opexCASE } = calculations;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1 text-center bg-blue-50 dark:bg-blue-900/50 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-600 dark:text-blue-300">OPEX BAU</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700 dark:text-blue-200">
              <CountUp end={opexBAU} prefix="€ " />
            </div>
            <p className="text-xs text-blue-500 dark:text-blue-400">per year</p>
          </CardContent>
        </Card>
        <Card className="col-span-1 text-center bg-purple-50 dark:bg-purple-900/50 border-purple-200 dark:border-purple-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-600 dark:text-purple-300">OPEX CASE</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-700 dark:text-purple-200">
              <CountUp end={opexCASE} prefix="€ " />
            </div>
            <p className="text-xs text-purple-500 dark:text-purple-400">per year</p>
          </CardContent>
        </Card>
    </div>
  );
}
