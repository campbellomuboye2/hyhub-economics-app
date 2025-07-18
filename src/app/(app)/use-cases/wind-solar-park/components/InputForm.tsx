"use client";

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { FormInputs } from '@/types';

export function InputForm({ form }: { form: any }) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Input Parameters</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-primary">A. Operational Cost Analysis</h3>
              <FormField
                control={form.control}
                name="windGeneration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wind Generation per year (MWh)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sunGeneration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sun Generation per year (MWh)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mwProduction"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>MW of production</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="demiWaterCost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>€ per liter (demi water)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.001" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="h2Cost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>€ per ton H₂</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-primary">B. Multi-Year Cost Projection Controls</h3>
              <FormField
                control={form.control}
                name="priceIncreaseMwh"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price Increase per year (€ p MWh) %</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priceIncreaseH2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price Increase per year (€ p ton H₂) %</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priceIncreaseDemi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price Increase per year (€ p L demi) %</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
