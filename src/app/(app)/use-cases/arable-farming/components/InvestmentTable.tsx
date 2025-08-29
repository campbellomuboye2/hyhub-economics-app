
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { ArableFarmingInvestmentRow } from '@/types';

interface InvestmentTableProps {
  investmentData: ArableFarmingInvestmentRow[];
  totalCapex: number;
}

export function InvestmentTable({ investmentData, totalCapex }: InvestmentTableProps) {
  
  const formatCurrency = (value: number) => value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>B1. Investment Cost Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Investment</TableHead>
              <TableHead className="text-right">CAPEX (€)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {investmentData.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.item}</TableCell>
                <TableCell className="text-right">
                  <span>{formatCurrency(row.capex)}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-end">
        <div className="flex items-center gap-4 font-bold text-lg">
          <span>Total CAPEX:</span>
          <span className="text-primary">
            {formatCurrency(totalCapex)}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
