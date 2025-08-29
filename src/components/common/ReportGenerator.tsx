
"use client";

import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from '@/components/ui/button';
import { Download, Loader } from 'lucide-react';

interface ReportGeneratorProps {
  rootElementId: string;
  reportFileName: string;
}

export function ReportGenerator({ rootElementId, reportFileName }: ReportGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateReport = async () => {
    setIsGenerating(true);
    try {
      const input = document.getElementById(rootElementId);
      if (!input) {
        console.error(`Element with id ${rootElementId} not found.`);
        setIsGenerating(false);
        return;
      }
      
      // Temporarily remove the report generator from the DOM to exclude it from the PDF
      const reportGeneratorElement = document.getElementById('report-generator');
      if (reportGeneratorElement) {
        reportGeneratorElement.style.display = 'none';
      }

      const canvas = await html2canvas(input, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        onclone: (document) => {
            // Ensure background images are loaded
            const elementsWithBg = document.querySelectorAll('[data-ai-hint]');
            elementsWithBg.forEach(el => {
                const htmlEl = el as HTMLElement;
                if(htmlEl.style.backgroundImage){
                    // it is already there
                }
            })
        }
      });
      
      if (reportGeneratorElement) {
        reportGeneratorElement.style.display = 'block';
      }

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / canvasHeight;
      const width = pdfWidth;
      const height = width / ratio;

      let position = 0;
      let heightLeft = height;

      pdf.addImage(imgData, 'PNG', 0, position, width, height);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = -heightLeft;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, width, height);
        heightLeft -= pdfHeight;
      }
      
      pdf.save(`${reportFileName}.pdf`);

    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div id="report-generator" className="mt-6 flex justify-center">
      <Button onClick={generateReport} disabled={isGenerating} size="lg">
        {isGenerating ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" />
            Generating Report...
          </>
        ) : (
          <>
            <Download className="mr-2 h-4 w-4" />
            Generate Report
          </>
        )}
      </Button>
    </div>
  );
}
