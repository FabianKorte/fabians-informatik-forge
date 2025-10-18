import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { PasswordStrengthIndicator } from "./PasswordStrengthIndicator";

interface PasswordInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  showStrength?: boolean;
}

export const PasswordInput = ({
  id,
  value,
  onChange,
  placeholder = "••••••••",
  disabled = false,
  required = false,
  showStrength = false,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          required={required}
          className="pr-10"
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
          disabled={disabled}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Eye className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </div>
      {showStrength && <PasswordStrengthIndicator password={value} />}
    </div>
  );
};
