"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import type { InvestmentRow } from '@/types';

interface InvestmentTableProps {
  investmentData: InvestmentRow[];
  setInvestmentData: React.Dispatch<React.SetStateAction<InvestmentRow[]>>;
  totalCapex: number;
}

export function InvestmentTable({ investmentData, setInvestmentData, totalCapex }: InvestmentTableProps) {
  
  const handleCapexChange = (id: string, value: number) => {
    setInvestmentData(prevData =>
      prevData.map(row => (row.id === id ? { ...row, capex: value } : row))
    );
  };

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
              <TableHead>HyDeer Reference</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {investmentData.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.item}</TableCell>
                <TableCell className="text-right">
                  <Input
                    type="number"
                    value={row.capex}
                    onChange={(e) => handleCapexChange(row.id, parseFloat(e.target.value) || 0)}
                    className="w-40 ml-auto text-right"
                  />
                </TableCell>
                <TableCell>{row.reference}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-end">
        <div className="flex items-center gap-4 font-bold text-lg">
          <span>Total:</span>
          <span className="text-primary">
            {totalCapex.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
