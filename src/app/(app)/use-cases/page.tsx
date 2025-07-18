import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function UseCaseSelectionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary">
          HyHub Economics
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Select a Use Case to Begin Analysis
        </p>
      </header>

      <div className="flex justify-center">
        <Link href="/use-cases/wind-solar-park" className="w-full max-w-md">
          <Card className="group transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden">
            <div className="p-1 bg-gradient-to-br from-primary via-accent to-blue-400">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-card rounded-t-lg">
                  <CardTitle className="text-2xl font-bold">
                    Wind Solar Park
                  </CardTitle>
                  <span className="text-4xl">🌬️</span>
                </CardHeader>
                <CardContent className="bg-card rounded-b-lg">
                  <p className="text-muted-foreground">
                    Analyze the operational costs and investment returns for a combined wind and solar generation park.
                  </p>
                  <div className="flex items-center justify-end text-sm font-medium text-accent mt-4 group-hover:text-primary">
                    Select Use Case
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </CardContent>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
