
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import type { DairyFarmFormInputs, DairyFarmInvestmentRow } from '@/types';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { DAIRY_FARM_CONSTANTS } from '@/lib/dairy-farm-constants';

import { InputForm } from './components/InputForm';
import { OutputDashboard } from './components/OutputDashboard';
import { InvestmentTable } from './components/InvestmentTable';
import { OpexDisplay } from './components/OpexDisplay';
import { ConstantsAccordion } from './components/ConstantsAccordion';
import { MultiYearComparisonTable } from './components/MultiYearComparisonTable';

const formSchema = z.object({
  annualMilkProduction: z.number().min(0),
  electricityPrice: z.number().min(0),
  gasUsage: z.number().min(0),
  windTurbines: z.number().min(0),
  solarPanels: z.number().min(0),
  electrolyzerProduction: z.number().min(0),
  fuelCellCurrent: z.number().min(0),
  priceIncreaseMWh: z.number().min(0),
  priceIncreaseM3: z.number().min(0),
  priceIncreaseKgCO2: z.number().min(0),
});

const initialInvestmentData: Omit<DairyFarmInvestmentRow, 'capex'>[] = [
    { id: 'electrolyzer', item: 'Electrolyzer', isEditable: false },
    { id: 'storageCompressor', item: 'Storage & Compressor', isEditable: true },
    { id: 'heatExchanger', item: 'Heat Exchanger', isEditable: true },
    { id: 'fuelCell', item: 'Fuel Cell', isEditable: false },
];

export default function DairyFarmPage() {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    const [formState, setFormState] = useLocalStorage<DairyFarmFormInputs>('hyhub-dairy-farm-form', {
        annualMilkProduction: 1000000,
        electricityPrice: 0.25,
        gasUsage: 10000,
        windTurbines: 2,
        solarPanels: 500,
        electrolyzerProduction: 100,
        fuelCellCurrent: 50,
        priceIncreaseMWh: 3.0,
        priceIncreaseM3: 3.0,
        priceIncreaseKgCO2: 3.0,
    });
    
    const [investmentData, setInvestmentData] = useLocalStorage<DairyFarmInvestmentRow[]>(
        'hyhub-dairy-farm-investment',
        []
    );

    const form = useForm<DairyFarmFormInputs>({
        resolver: zodResolver(formSchema),
        defaultValues: formState,
    });

    const watchedValues = useWatch({ control: form.control });

    useEffect(() => {
        const subscription = form.watch((value) => {
            setFormState(value as DairyFarmFormInputs);
        });
        return () => subscription.unsubscribe();
    }, [form, setFormState]);

    const calculations = useMemo(() => {
        const i = form.getValues();
        const C = DAIRY_FARM_CONSTANTS;

        const output1 = C.const5 * i.annualMilkProduction;
        const output2 = i.gasUsage * C.const6;
        const output3 = i.windTurbines * (C.const12 / 5);
        const output4 = i.solarPanels * C.const7;
        const output5 = (C.const1/100) * (output3 + output4);
        const output6 = (1 - (C.const1/100)) * (output3 + output4);
        const output7 = output1 - output5 > 0 ? output1 - output5 : 0;
        const output8 = output6 / C.const8;
        const output9 = (output8 * C.const9) / (C.const10 * 52);
        const output10 = output9 / C.const13;
        const output11 = output6 * (C.const2 / 100);
        const output12 = C.const11 * output8;
        const output13 = output6 * (C.const3 / 100);

        const opexBAU = -((i.electricityPrice * output7) + (i.gasUsage * C.const14) + (output7 * C.const15 * C.const4) + ((output2 / C.const6) * C.const16 * C.const4));
        const opexCASE = -(((output7 - output12) * i.electricityPrice) + (((output2 - output11 - output13)/C.const6) * C.const14) + ((output7 - output12) * C.const15 * C.const4) + (((output2 - output11 - output13)/C.const6) * C.const16 * C.const4));

        return {
            output1, output2, output3, output4, output5, output6, output7,
            output8, output9, output10, output11, output12, output13,
            opexBAU, opexCASE
        };
    }, [watchedValues, form]);

    const totalCapex = useMemo(() => {
      return investmentData.reduce((acc, row) => acc + (row.capex || 0), 0);
    }, [investmentData]);

    useEffect(() => {
        const i = form.getValues();
        const capexElectrolyzer = 35000 * (i.electrolyzerProduction / 5);
        const capexFuelCell = 15000 * (i.fuelCellCurrent / 5);

        const needsUpdate = 
            investmentData.length === 0 ||
            investmentData.find(d => d.id === 'electrolyzer')?.capex !== capexElectrolyzer ||
            investmentData.find(d => d.id === 'fuelCell')?.capex !== capexFuelCell;

        if (needsUpdate) {
            setInvestmentData(prevData => {
                const updatedData = initialInvestmentData.map(row => {
                    const existingRow = prevData.find(d => d.id === row.id);
                    if (row.id === 'electrolyzer') return { ...row, capex: capexElectrolyzer };
                    if (row.id === 'fuelCell') return { ...row, capex: capexFuelCell };
                    if (row.id === 'storageCompressor') return { ...row, isEditable: true, capex: existingRow?.capex ?? 15000 };
                    if (row.id === 'heatExchanger') return { ...row, isEditable: true, capex: existingRow?.capex ?? 5000 };
                    return { ...row, capex: existingRow?.capex ?? 0 };
                });
                return updatedData;
            });
        }
    }, [watchedValues, form, investmentData, setInvestmentData]);
    
    const handleInvestmentChange = (id: string, value: number) => {
        setInvestmentData(prevData =>
            prevData.map(row => (row.id === id ? { ...row, capex: value } : row))
        );
    };

    if (!isClient) {
        return null;
    }


    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 md:p-8">
            <header>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">HyHub – Dairy Farm Use Case</h1>
                <p className="text-muted-foreground">An interactive dashboard for economic analysis of a dairy farm.</p>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-1 flex flex-col gap-6">
                    <InputForm form={form} />
                </div>
                <div className="xl:col-span-2 grid grid-cols-1 gap-6">
                    <OutputDashboard calculations={calculations} />
                    <OpexDisplay calculations={calculations} />
                </div>
            </div>

            <InvestmentTable
                investmentData={investmentData}
                onCapexChange={handleInvestmentChange}
                totalCapex={totalCapex}
            />

            <MultiYearComparisonTable
                formValues={form.getValues()}
                calculations={calculations}
                totalCapex={totalCapex}
            />

            <ConstantsAccordion />
        </div>
    );
}
