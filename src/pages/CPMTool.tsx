import React from 'react';
import { CPMTool } from '@/components/cpm-tool/CPMTool';
import { SEO } from '@/components/SEO';

const CPMToolPage: React.FC = () => {
  return (
    <>
      <SEO 
        title="Netzplantechnik (CPM) | Lernplattform"
        description="Lerne die Critical Path Method (CPM) für die IHK-Prüfung. Berechne FAZ, FEZ, SAZ, SEZ und identifiziere den kritischen Pfad."
      />
      <div className="min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-4">
          <CPMTool />
        </div>
      </div>
    </>
  );
};

export default CPMToolPage;
