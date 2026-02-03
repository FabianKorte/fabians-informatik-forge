import { SEO } from '@/components/SEO';
import { StruktogrammTool } from '@/components/struktogramm/StruktogrammTool';

const Struktogramm = () => {
  return (
    <>
      <SEO 
        title="Struktogramm-Builder - Nassi-Shneiderman Diagramme | IT-Lernplattform"
        description="Erstelle und lerne Struktogramme (Nassi-Shneiderman-Diagramme) interaktiv. Visualisiere Algorithmen mit Sequenzen, Verzweigungen und Schleifen."
      />
      <div className="min-h-screen py-8">
        <StruktogrammTool />
      </div>
    </>
  );
};

export default Struktogramm;
