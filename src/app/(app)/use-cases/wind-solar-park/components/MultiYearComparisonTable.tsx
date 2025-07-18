"use client";

import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import type { FormInputs } from '@/types';
import { CONSTANTS } from '@/lib/constants';

interface MultiYearTableProps {
  formValues: FormInputs;
  calculations: any;
  totalCapex: number;
}

export function MultiYearComparisonTable({ formValues, calculations, totalCapex }: MultiYearTableProps) {
  const { priceIncreaseMwh, priceIncreaseH2, priceIncreaseDemi, h2Cost, demiWaterCost } = formValues;
  const { effectiveGeneration, compressorElectricity, electrolyserProduction, demiWater } = calculations;

  const projectionData = useMemo(() => {
    const years = Array.from({ length: 9 }, (_, i) => i + 1);
    let cumulativeOpexBau = 0;
    let cumulativeOpexCase = 0;

    const data = years.map(year => {
      const compoundedMwhPrice = CONSTANTS.const2 * Math.pow(1 + priceIncreaseMwh / 100, year -1);
      const compoundedH2Price = h2Cost * Math.pow(1 + priceIncreaseH2 / 100, year -1);
      const compoundedDemiPrice = demiWaterCost * Math.pow(1 + priceIncreaseDemi / 100, year -1);
      
      const opexBau = effectiveGeneration * compoundedMwhPrice;
      const capexCase = year === 1 ? totalCapex : 0;
      const opexCase = ((effectiveGeneration - compressorElectricity) * compoundedMwhPrice) +
                       (electrolyserProduction * compoundedH2Price) +
                       (demiWater * compoundedDemiPrice);
      
      cumulativeOpexBau += opexBau;
      cumulativeOpexCase += opexCase;

      return {
        year,
        compoundedMwhPrice,
        compoundedH2Price,
        compoundedDemiPrice,
        opexBau,
        capexCase,
        opexCase,
      };
    });

    return { data, cumulativeOpexBau, cumulativeOpexCase };
  }, [priceIncreaseMwh, priceIncreaseH2, priceIncreaseDemi, h2Cost, demiWaterCost, effectiveGeneration, compressorElectricity, electrolyserProduction, demiWater, totalCapex]);

  const { data, cumulativeOpexBau, cumulativeOpexCase } = projectionData;
  const sumOpexCaseMinusCapex = cumulativeOpexCase - (totalCapex || 0);

  const formatCurrency = (value: number) => value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 });

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>B2. Multi-Year Cost Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Year</TableHead>
              <TableHead>€ p MWh</TableHead>
              <TableHead>€ p ton H₂</TableHead>
              <TableHead>€ p L demi</TableHead>
              <TableHead>OPEX BAU</TableHead>
              <TableHead>CAPEX CASE</TableHead>
              <TableHead>OPEX CASE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map(d => (
              <TableRow key={d.year}>
                <TableCell>{d.year}</TableCell>
                <TableCell>{formatCurrency(d.compoundedMwhPrice)}</TableCell>
                <TableCell>{formatCurrency(d.compoundedH2Price)}</TableCell>
                <TableCell>{d.compoundedDemiPrice.toFixed(4)} €</TableCell>
                <TableCell>{formatCurrency(d.opexBau)}</TableCell>
                <TableCell>{d.capexCase > 0 ? formatCurrency(d.capexCase) : "--"}</TableCell>
                <TableCell>{formatCurrency(d.opexCase)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="font-bold text-lg">
                <TableCell colSpan={4}>Final Sums</TableCell>
                <TableCell className="text-blue-600">{formatCurrency(cumulativeOpexBau)}</TableCell>
                <TableCell></TableCell>
                <TableCell className="text-purple-600">{formatCurrency(cumulativeOpexCase - totalCapex)}</TableCell>
            </TableRow>
             <TableRow>
                <TableCell colSpan={4}></TableCell>
                <TableCell className="text-xs text-muted-foreground">(SUM OPEX BAU)</TableCell>
                <TableCell></TableCell>
                <TableCell className="text-xs text-muted-foreground">(SUM OPEX CASE - CAPEX CASE)</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
