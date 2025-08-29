
"use client";

import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import type { ArableFarmingFormInputs } from '@/types';
import { ARABLE_FARMING_CONSTANTS } from '@/lib/arable-farming-constants';

interface MultiYearTableProps {
  formValues: ArableFarmingFormInputs;
  calculations: any;
  totalCapex: number;
}

export function MultiYearComparisonTable({ formValues, calculations, totalCapex }: MultiYearTableProps) {
  const {
    priceIncreaseMWh,
    priceIncreaseM3,
    priceIncreaseTonH2,
    hydrogenPrice,
    gasUsage
  } = formValues;

  const {
    output3,
    output4,
    output7,
    output9,
    output12,
  } = calculations;

  const C = ARABLE_FARMING_CONSTANTS;

  const projectionData = useMemo(() => {
    const years = Array.from({ length: 6 }, (_, i) => i + 1);
    let cumulativeOpexBau = 0;
    let cumulativeOpexCase = 0;

    const data = years.map(year => {
      const compoundedMwhPrice = C.const6 * Math.pow(1 + priceIncreaseMWh / 100, year - 1);
      const compoundedM3Price = C.const13 * Math.pow(1 + priceIncreaseM3 / 100, year - 1);
      const compoundedTonH2Price = hydrogenPrice * Math.pow(1 + priceIncreaseTonH2 / 100, year - 1);

      const opexBau = (gasUsage * compoundedM3Price) + ((output3 - output4) * compoundedMwhPrice);
      const opexCase = ((output3 - output4 - output12) * compoundedMwhPrice) - (C.const10 * output9) + (output7 * compoundedTonH2Price);

      const capexCase = year === 1 ? -totalCapex : 0;
      
      cumulativeOpexBau += opexBau;
      cumulativeOpexCase += opexCase;

      return {
        year,
        compoundedMwhPrice,
        compoundedM3Price,
        compoundedTonH2Price,
        opexBau,
        capexCase,
        opexCase,
      };
    });

    return { data, cumulativeOpexBau, cumulativeOpexCase };
  }, [
    priceIncreaseMWh, priceIncreaseM3, priceIncreaseTonH2, hydrogenPrice, gasUsage,
    C, output3, output4, output7, output9, output12, totalCapex
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
                <TableHead>€ p MWh</TableHead>
                <TableHead>€ p m³ gas</TableHead>
                <TableHead>€ p ton H₂</TableHead>
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
                  <TableCell>{formatCurrency(d.compoundedM3Price)}</TableCell>
                  <TableCell>{formatCurrency(d.compoundedTonH2Price)}</TableCell>
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
