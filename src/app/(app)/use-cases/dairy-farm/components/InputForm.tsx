
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export function InputForm({ form }: { form: any }) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>A. Input Parameters</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="annualMilkProduction"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>L milk per year</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="electricityPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purchased electricity price per KWh (€)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gasUsage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>m³ business use (gas) per year</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="windTurbines"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of 5KW turbines</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="solarPanels"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of solar panels</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="electrolyzerProduction"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Electrolyzer production in KW</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fuelCellCurrent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fuel cell current in KW</FormLabel>
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
                name="priceIncreaseMWh"
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
                name="priceIncreaseM3"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price Increase per year (€ p m³) %</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priceIncreaseKgCO2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price Increase per year (€ p kg CO₂) %</FormLabel>
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
