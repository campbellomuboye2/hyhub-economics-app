import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'HyHub Economics',
  description: 'Wind Solar Park Use Case Analysis',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <div className="relative min-h-screen w-full">
          <div 
            className="absolute inset-0 -z-10 h-full w-full bg-background bg-cover bg-center opacity-[0.05]"
            style={{backgroundImage: "url('https://placehold.co/1920x1080.png')"}}
            data-ai-hint="hydrogen energy"
          >
          </div>
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
