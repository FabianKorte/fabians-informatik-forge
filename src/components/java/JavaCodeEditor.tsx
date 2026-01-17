import { useId } from "react";

interface JavaCodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  height?: string;
}

/**
 * NOTE:
 * We intentionally use a native <textarea> here.
 * Monaco's hidden inputarea/textarea styling got into a broken state in this project
 * and prevented normal "click anywhere and type" behavior.
 *
 * This component guarantees "like a normal text field" editing.
 */
export function JavaCodeEditor({
  value,
  onChange,
  readOnly = false,
  height = "300px",
}: JavaCodeEditorProps) {
  const id = useId();

  return (
    <div className="rounded-lg overflow-hidden border border-border bg-background">
      <label htmlFor={id} className="sr-only">
        Java Code Editor
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        readOnly={readOnly}
        spellCheck={false}
        autoCapitalize="none"
        autoCorrect="off"
        className="w-full font-mono text-sm leading-6 bg-background text-foreground p-4 outline-none resize-none"
        style={{ height }}
      />
    </div>
  );
}
