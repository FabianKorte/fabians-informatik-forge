import { SubnettingTool } from '@/components/subnetting/SubnettingTool';
import { SEO } from '@/components/SEO';

export default function SubnettingChallenge() {
  return (
    <>
      <SEO 
        title="Subnetting-Challenge | FISI Lernplattform"
        description="Trainiere Subnetting unter Zeitdruck: Netzmasken, Broadcast-Adressen und Host-Berechnungen für die IHK-Prüfung."
      />
      <SubnettingTool />
    </>
  );
}
