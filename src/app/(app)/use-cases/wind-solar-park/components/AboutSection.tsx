
"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

interface AboutSectionProps {
  title: string;
  children: React.ReactNode;
}

export function AboutSection({ title, children }: AboutSectionProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <Info className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">About this section</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">{title}</h4>
            <div className="text-sm text-muted-foreground">
              {children}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
