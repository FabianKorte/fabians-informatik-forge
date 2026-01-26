import React from 'react';
import { NetworkSimulator } from '@/components/network-simulator/NetworkSimulator';
import { SEO } from '@/components/SEO';

const NetworkSimulatorPage: React.FC = () => {
  return (
    <>
      <SEO 
        title="Netzwerk-Simulator | Lernplattform"
        description="Interaktiver Netzwerk-Simulator zum Üben von Routing, Subnetting und Netzwerk-Topologien für die IHK-Prüfung."
      />
      <div className="min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-4">
          <NetworkSimulator />
        </div>
      </div>
    </>
  );
};

export default NetworkSimulatorPage;
