
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import type { WindSolarParkFormInputs, InvestmentRow } from '@/types';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { CONSTANTS } from '@/lib/constants';

import { InputForm } from './components/InputForm';
import { OutputDashboard } from './components/OutputDashboard';
import { InvestmentTable } from './components/InvestmentTable';
import { MultiYearComparisonTable } from './components/MultiYearComparisonTable';
import { ConstantsAccordion } from './components/ConstantsAccordion';
import { ReportGenerator } from '@/components/common/ReportGenerator';

const formSchema = z.object({
  windGeneration: z.number().min(0),
  sunGeneration: z.number().min(0),
  mwProduction: z.number().min(0),
  demiWaterCost: z.number().min(0),
  h2Cost: z.number().min(0),
  priceIncreaseMwh: z.number().min(0),
  priceIncreaseH2: z.number().min(0),
  priceIncreaseDemi: z.number().min(0),
});

const initialInvestmentData: InvestmentRow[] = [
  { id: 'electrolyzer', item: 'Electrolyzer', capex: 12000000, reference: '€16m' },
  { id: 'compressor', item: 'Compressor', capex: 2500000, reference: '€20m' },
  { id: 'storage', item: 'Storage', capex: 1700000, reference: '12x' },
  { id: 'filling', item: 'Tube trailer filling station', capex: 0, reference: '--' },
  { id: 'trailers', item: 'Tube trailers', capex: 3000000, reference: '--' },
  { id: 'infra', item: 'Infrastructure', capex: 1000000, reference: '--' },
  { id: 'permits', item: 'Permits', capex: 0, reference: '--' },
];

export default function WindSolarParkPage() {
  const [formState, setFormState] = useLocalStorage<WindSolarParkFormInputs>('hyhub-form', {
    windGeneration: 50000,
    sunGeneration: 30000,
    mwProduction: 20,
    demiWaterCost: 0.005,
    h2Cost: 1500,
    priceIncreaseMwh: 2.0,
    priceIncreaseH2: 2.0,
    priceIncreaseDemi: 0.0,
  });

  const [investmentData, setInvestmentData] = useLocalStorage<InvestmentRow[]>(
    'hyhub-investment',
    initialInvestmentData
  );

  const form = useForm<WindSolarParkFormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: formState,
  });

  const watchedValues = useWatch({ control: form.control });

  useEffect(() => {
    const subscription = form.watch((value) => {
        setFormState(value as WindSolarParkFormInputs);
    });
    return () => subscription.unsubscribe();
  }, [form, setFormState]);
  
  const calculations = useMemo(() => {
    const { windGeneration, sunGeneration, demiWaterCost, h2Cost } = form.getValues();
    const C = CONSTANTS;

    const effectiveGeneration = (windGeneration + sunGeneration) * C.const1;
    const usableShare = (windGeneration + sunGeneration) * C.const3;
    const electrolyserProduction = usableShare > 0 && C.const8 > 0 ? usableShare / C.const8 : 0;
    const electrolyserHeat = usableShare * C.const4;
    const demiWater = electrolyserProduction * 1000 * C.const9;
    const compressorElectricity = electrolyserProduction * C.const11;

    const storageDenominator = C.const10 * 365;
    const storageCapacity = storageDenominator > 0 ? (electrolyserProduction * 1000 * C.const11) / storageDenominator : 0;
    
    const numberOfTanks = C.const12 > 0 ? storageCapacity / C.const12 : 0;

    const opexBAU = effectiveGeneration * C.const2;
    const opexCASE = ((effectiveGeneration - compressorElectricity) * C.const2) +
                     (electrolyserProduction * h2Cost) +
                     (demiWater * -demiWaterCost);
    
    return {
      effectiveGeneration,
      usableShare,
      electrolyserProduction,
      electrolyserHeat,
      demiWater,
      storageCapacity,
      numberOfTanks: Math.round(numberOfTanks),
      compressorElectricity,
      opexBAU,
      opexCASE,
    };
  }, [watchedValues, form]);
  
  const totalCapex = useMemo(() => investmentData.reduce((acc, row) => acc + row.capex, 0), [investmentData]);

  return (
    <div id="wind-solar-park-page" className="flex flex-col gap-6 p-4 sm:p-6 md:p-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">HyHub – Wind Solar Park Use Case</h1>
        <p className="text-muted-foreground">An interactive dashboard for economic analysis.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1 flex flex-col gap-6">
          <InputForm form={form} />
        </div>
        <div className="xl:col-span-2">
          <OutputDashboard calculations={calculations} />
        </div>
      </div>
      
      <InvestmentTable investmentData={investmentData} setInvestmentData={setInvestmentData} totalCapex={totalCapex}/>

      <MultiYearComparisonTable 
        formValues={form.getValues()}
        calculations={calculations}
        totalCapex={totalCapex}
      />
      
      <ConstantsAccordion />
      <ReportGenerator rootElementId="wind-solar-park-page" reportFileName="HyHub_Wind_Solar_Park_Report" />
    </div>
  );
}
