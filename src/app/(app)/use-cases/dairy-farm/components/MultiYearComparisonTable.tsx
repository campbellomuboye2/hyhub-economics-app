
"use client";

import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import type { DairyFarmFormInputs } from '@/types';
import { DAIRY_FARM_CONSTANTS } from '@/lib/dairy-farm-constants';

interface MultiYearTableProps {
  formValues: DairyFarmFormInputs;
  calculations: any;
  totalCapex: number;
}

export function MultiYearComparisonTable({ formValues, calculations, totalCapex }: MultiYearTableProps) {
  const {
    priceIncreaseMWh,
    priceIncreaseM3,
    priceIncreaseKgCO2,
    electricityPrice,
  } = formValues;

  const {
    output2, output7, output11, output12, output13
  } = calculations;

  const C = DAIRY_FARM_CONSTANTS;

  const projectionData = useMemo(() => {
    const years = Array.from({ length: 15 }, (_, i) => i + 1);
    let cumulativeOpexBau = 0;
    let cumulativeOpexCase = 0;

    const data = years.map(year => {
      const compoundedMwhPrice = electricityPrice * Math.pow(1 + priceIncreaseMWh / 100, year - 1);
      const compoundedM3Price = C.const14 * Math.pow(1 + priceIncreaseM3 / 100, year - 1);
      const compoundedCO2Price = C.const4 * Math.pow(1 + priceIncreaseKgCO2 / 100, year - 1);

      const opexBau = -((compoundedMwhPrice * output7) + (formValues.gasUsage * compoundedM3Price) + (output7 * C.const15 * compoundedCO2Price) + ((output2 / C.const6) * C.const16 * compoundedCO2Price));
      
      const opexCase = -(((output7 - output12) * compoundedMwhPrice) + (((output2 - output11 - output13)/C.const6) * compoundedM3Price) + ((output7 - output12) * C.const15 * compoundedCO2Price) + (((output2 - output11 - output13)/C.const6) * C.const16 * compoundedCO2Price));
      
      const capexCase = year === 1 ? -totalCapex : 0;
      
      cumulativeOpexBau += opexBau;
      cumulativeOpexCase += opexCase;

      return {
        year,
        compoundedMwhPrice,
        compoundedM3Price,
        compoundedCO2Price,
        opexBau,
        capexCase,
        opexCase,
      };
    });

    return { data, cumulativeOpexBau, cumulativeOpexCase };
  }, [
    priceIncreaseMWh, priceIncreaseM3, priceIncreaseKgCO2, electricityPrice, 
    C, formValues.gasUsage, output2, output7, output11, output12, output13, totalCapex
  ]);

  const { data, cumulativeOpexBau, cumulativeOpexCase } = projectionData;
  const sumOpexCaseWithCapex = cumulativeOpexCase + (data.find(d => d.year === 1)?.capexCase || 0);

  const formatCurrency = (value: number) => value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 });
  const formatNumber = (value: number) => value.toLocaleString('de-DE', { minimumFractionDigits: 4, maximumFractionDigits: 4}) + ' €';

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            B2. Multi-Year Cost Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Year</TableHead>
                <TableHead>€ p KWh</TableHead>
                <TableHead>€ p m³</TableHead>
                <TableHead>€ p kg CO₂</TableHead>
                <TableHead>OPEX BAU</TableHead>
                <TableHead>CAPEX CASE</TableHead>
                <TableHead>OPEX CASE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map(d => (
                <TableRow key={d.year}>
                  <TableCell>{d.year}</TableCell>
                  <TableCell>{formatNumber(d.compoundedMwhPrice)}</TableCell>
                  <TableCell>{formatNumber(d.compoundedM3Price)}</TableCell>
                  <TableCell>{formatNumber(d.compoundedCO2Price)}</TableCell>
                  <TableCell>{formatCurrency(d.opexBau)}</TableCell>
                  <TableCell>{d.capexCase !== 0 ? formatCurrency(d.capexCase) : "--"}</TableCell>
                  <TableCell>{formatCurrency(d.opexCase)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow className="font-bold text-lg">
                  <TableCell colSpan={4}>Total</TableCell>
                  <TableCell className="text-blue-600">{formatCurrency(cumulativeOpexBau)}</TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-purple-600">{formatCurrency(sumOpexCaseWithCapex)}</TableCell>
              </TableRow>
               <TableRow>
                  <TableCell colSpan={4}></TableCell>
                  <TableCell className="text-xs text-muted-foreground">(SUM OPEX BAU)</TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-xs text-muted-foreground">(SUM OPEX CASE + CAPEX CASE)</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
