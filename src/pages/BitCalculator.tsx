import { SEO } from '@/components/SEO';
import { BitCalculatorTool } from '@/components/bit-calculator/BitCalculatorTool';

const BitCalculator = () => {
  return (
    <>
      <SEO 
        title="Bit-/Byte-Rechner - Zahlensysteme & Bitoperationen | IT-Lernplattform"
        description="Konvertiere zwischen Binär, Dezimal, Hexadezimal und Oktal. Führe bitweise Operationen durch und rechne Speichergrößen um. Mit interaktiven Übungen!"
      />
      <div className="min-h-screen py-8">
        <BitCalculatorTool />
      </div>
    </>
  );
};

export default BitCalculator;
