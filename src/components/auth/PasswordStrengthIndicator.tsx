import { useMemo } from "react";
import { Progress } from "@/components/ui/progress";

interface PasswordStrengthIndicatorProps {
  password: string;
}

export const PasswordStrengthIndicator = ({ password }: PasswordStrengthIndicatorProps) => {
  const strength = useMemo(() => {
    if (!password) return { score: 0, label: "", color: "" };

    let score = 0;
    
    // Length
    if (password.length >= 8) score += 20;
    if (password.length >= 12) score += 20;
    
    // Character types
    if (/[a-z]/.test(password)) score += 15;
    if (/[A-Z]/.test(password)) score += 15;
    if (/[0-9]/.test(password)) score += 15;
    if (/[^A-Za-z0-9]/.test(password)) score += 15;

    let label = "";
    let color = "";

    if (score < 40) {
      label = "Schwach";
      color = "bg-destructive";
    } else if (score < 60) {
      label = "Mittel";
      color = "bg-yellow-500";
    } else if (score < 80) {
      label = "Gut";
      color = "bg-blue-500";
    } else {
      label = "Stark";
      color = "bg-green-500";
    }

    return { score, label, color };
  }, [password]);

  if (!password) return null;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Passwortstärke:</span>
        <span className="font-medium">{strength.label}</span>
      </div>
      <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className={`h-full ${strength.color} transition-all duration-300`}
          style={{ width: `${strength.score}%` }}
        />
      </div>
    </div>
  );
};
