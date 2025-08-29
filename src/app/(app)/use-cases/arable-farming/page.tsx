
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import type { ArableFarmingFormInputs, ArableFarmingInvestmentRow } from '@/types';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { ARABLE_FARMING_CONSTANTS } from '@/lib/arable-farming-constants';

import { InputForm } from './components/InputForm';
import { OutputDashboard } from './components/OutputDashboard';
import { OpexDisplay } from './components/OpexDisplay';
import { InvestmentTable } from './components/InvestmentTable';
import { ConstantsAccordion } from './components/ConstantsAccordion';
import { MultiYearComparisonTable } from './components/MultiYearComparisonTable';

const formSchema = z.object({
  windTurbines: z.number().min(0),
  solarPanels: z.number().min(0),
  electricityPrice: z.number().min(0),
  gasUsage: z.number().min(0),
  electrolyzerProduction: z.number().min(0),
  hydrogenPrice: z.number().min(0),
  priceIncreaseMWh: z.number(),
  priceIncreaseM3: z.number().min(0),
  priceIncreaseTonH2: z.number().min(0),
});

export default function ArableFarmingPage() {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    const [formState, setFormState] = useLocalStorage<ArableFarmingFormInputs>('hyhub-arable-farming-form', {
        windTurbines: 1,
        solarPanels: 1000,
        electricityPrice: 50,
        gasUsage: 10000,
        electrolyzerProduction: 1,
        hydrogenPrice: 2000,
        priceIncreaseMWh: -1.0,
        priceIncreaseM3: 3.0,
        priceIncreaseTonH2: 1.0,
    });
    
    const form = useForm<ArableFarmingFormInputs>({
        resolver: zodResolver(formSchema),
        defaultValues: formState,
    });

    const watchedValues = useWatch({ control: form.control });

    useEffect(() => {
        if(isClient) {
            form.reset(formState);
        }
    }, [isClient, form, formState]);

    useEffect(() => {
        const subscription = form.watch((value) => {
            setFormState(value as ArableFarmingFormInputs);
        });
        return () => subscription.unsubscribe();
    }, [form, setFormState]);

    const calculations = useMemo(() => {
        const i = form.getValues();
        const C = ARABLE_FARMING_CONSTANTS;

        const output1 = (i.windTurbines / 3) * C.const1;
        const output2 = (i.solarPanels * C.const2) / 1000;
        const output3 = (output1 + output2) * C.const5;
        const output4 = i.electricityPrice / 10;
        const output5 = (i.gasUsage * C.const3) / 1000;
        const output6 = (output1 + output2) * (1 - C.const5) * 0.25;
        const output7 = output6 / C.const4;
        const output8 = output6 * C.const11;
        const output9 = output7 * C.const8 * 1000;
        const output10 = (output7 * 1000) / (C.const9 * 52);
        const output11 = output10 / C.const12;
        const output12 = output7 * C.const14;

        const opexBAU = (i.gasUsage * C.const13) + ((output3 - output4) * C.const6);
        const opexCASE = ((output3 - output4 - output12) * C.const6) - (C.const10 * output9) + (output7 * i.hydrogenPrice);

        return {
            output1, output2, output3, output4, output5, output6, output7,
            output8, output9, output10, output11, output12,
            opexBAU, opexCASE
        };
    }, [watchedValues, form]);

    const investmentData = useMemo((): ArableFarmingInvestmentRow[] => {
        const i = form.getValues();
        const C = ARABLE_FARMING_CONSTANTS;
        const { output7, output10 } = calculations;

        const capexElectrolyzer = C.const15 * i.electrolyzerProduction;
        const capexCompressor = C.const16 * (output7 / 365);
        const capexStorage = C.const17 * output10;
        const capexOther = C.const18 * capexElectrolyzer;
        
        return [
            { id: 'electrolyzer', item: 'Electrolyzer', capex: capexElectrolyzer },
            { id: 'compressor', item: 'Compressor', capex: capexCompressor },
            { id: 'storage', item: 'Storage', capex: capexStorage },
            { id: 'other', item: 'Other', capex: capexOther },
        ];
    }, [watchedValues, form, calculations]);

    const totalCapex = useMemo(() => {
      return investmentData.reduce((acc, row) => acc + (row.capex || 0), 0);
    }, [investmentData]);

    if (!isClient) {
        return null;
    }

    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 md:p-8">
            <header>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">HyHub – Arable Farming Use Case</h1>
                <p className="text-muted-foreground">An interactive dashboard for economic analysis of an arable farm.</p>
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
            
            <InvestmentTable investmentData={investmentData} totalCapex={totalCapex} />
            <MultiYearComparisonTable 
                formValues={form.getValues()}
                calculations={calculations}
                totalCapex={totalCapex}
            />
            <ConstantsAccordion />
        </div>
    );
}
