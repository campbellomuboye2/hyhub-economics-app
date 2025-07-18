
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import type { InvestmentRow } from '@/types';
import { AboutSection } from './AboutSection';

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
        <CardTitle className="flex items-center gap-2">
            B1. Investment Cost Overview
            <AboutSection title="Investment Costs Overview">
                This table provides an overview of the initial capital investments (CAPEX) required for the development of a small-scale hydrogen production and distribution facility. The investment includes essential components such as the electrolyzer, compressors, storage, infrastructure, and permits. Reference values from the larger HyDeer project are included for comparison, which helps in estimating economies of scale. The totals provide insight into the financial resources required to launch the project and form the basis for economic feasibility analyses and decision-making.
            </AboutSection>
        </CardTitle>
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
