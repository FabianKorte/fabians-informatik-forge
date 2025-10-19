import { MicrochipLoader } from "@/components/MicrochipLoader";

export const FallbackLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <MicrochipLoader />
        <p className="text-sm text-muted-foreground">Lädt...</p>
      </div>
    </div>
  );
};
