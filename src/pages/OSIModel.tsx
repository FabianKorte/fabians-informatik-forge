import { SEO } from "@/components/SEO";
import { OSIModelTool } from "@/components/osi-model/OSIModelTool";
import { Layers } from "lucide-react";

const OSIModel = () => {
  return (
    <>
      <SEO
        title="OSI-Modell | Interaktives Lernen"
        description="Lerne das OSI-Referenzmodell mit interaktiven Drag-and-Drop Übungen, Fehlerdiagnose-Szenarien und IHK-Prüfungsfragen."
      />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600">
            <Layers className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">OSI-Referenzmodell</h1>
            <p className="text-muted-foreground">
              Das 7-Schichten-Modell verstehen und anwenden
            </p>
          </div>
        </div>

        {/* Main Tool */}
        <OSIModelTool />
      </div>
    </>
  );
};

export default OSIModel;
