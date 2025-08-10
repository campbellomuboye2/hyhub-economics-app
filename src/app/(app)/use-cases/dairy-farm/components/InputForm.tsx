
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export function InputForm({ form }: { form: any }) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>A. Inputs</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="annualMilkProduction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual milk production (Liters)</FormLabel>
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
                  <FormLabel>Purchased electricity price (€/kWh)</FormLabel>
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
                  <FormLabel>Business gas usage (m³/year)</FormLabel>
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
                  <FormLabel>Number of wind turbines (by 5KW capacity)</FormLabel>
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
                  <FormLabel>Electrolyzer production (KW)</FormLabel>
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
                  <FormLabel>Fuel cell current (KW)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
