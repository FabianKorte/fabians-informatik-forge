import { SEO } from '@/components/SEO';
import { CommunicationTrainerTool } from '@/components/communication/CommunicationTrainerTool';

const CommunicationTrainer = () => {
  return (
    <>
      <SEO 
        title="Kommunikationstrainer - 4-Ohren-Modell | IT-Lernplattform"
        description="Lerne das 4-Ohren-Modell nach Schulz von Thun. Trainiere Kommunikation mit interaktiven Szenarien und verstehe Sachinhalt, Selbstkundgabe, Beziehung und Appell."
      />
      <div className="min-h-screen py-8">
        <CommunicationTrainerTool />
      </div>
    </>
  );
};

export default CommunicationTrainer;
