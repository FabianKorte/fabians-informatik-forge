import { HardwarePuzzleTool } from '@/components/hardware-puzzle/HardwarePuzzleTool';
import { NavigationDrawer } from '@/components/NavigationDrawer';
import { SkipToContent } from '@/components/SkipToContent';
import { SEO } from '@/components/SEO';

const HardwarePuzzle = () => {
  return (
    <>
      <SEO
        title="Hardware-Puzzle | PC-Zusammenbau lernen"
        description="Lerne PC-Komponenten zusammenzubauen! Interaktives Hardware-Puzzle mit CPU, Mainboard, RAM und GPU Kompatibilitätsprüfung."
        keywords="PC zusammenbauen, Hardware, CPU, Mainboard, RAM, GPU, Kompatibilität, IT-Ausbildung"
        canonical="/hardware-puzzle"
      />
      <SkipToContent />
      <NavigationDrawer />
      <main id="main-content" className="min-h-screen bg-gradient-to-b from-background to-background/95 pt-16 pb-8">
        <HardwarePuzzleTool />
      </main>
    </>
  );
};

export default HardwarePuzzle;
