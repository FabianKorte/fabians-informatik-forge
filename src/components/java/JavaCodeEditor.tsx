import { useId, useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-java";
import "prismjs/themes/prism-tomorrow.css";

interface JavaCodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  height?: string;
}

/**
 * Textarea with Prism.js syntax highlighting overlay.
 * Typing works exactly like a normal text field.
 */
export function JavaCodeEditor({
  value,
  onChange,
  readOnly = false,
  height = "300px",
}: JavaCodeEditorProps) {
  const id = useId();
  const highlightRef = useRef<HTMLPreElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync scroll between textarea and highlighted code
  const handleScroll = () => {
    if (highlightRef.current && textareaRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  // Highlight code whenever value changes
  useEffect(() => {
    if (highlightRef.current) {
      const highlighted = Prism.highlight(value || "", Prism.languages.java, "java");
      highlightRef.current.innerHTML = highlighted + "\n"; // Extra newline for last line spacing
    }
  }, [value]);

  return (
    <div className="rounded-lg overflow-hidden border border-border bg-[#2d2d2d] relative" style={{ height }}>
      <label htmlFor={id} className="sr-only">
        Java Code Editor
      </label>
      
      {/* Highlighted code layer (behind textarea) */}
      <pre
        ref={highlightRef}
        className="absolute inset-0 m-0 p-4 overflow-auto pointer-events-none font-mono text-sm leading-6 whitespace-pre-wrap break-words"
        aria-hidden="true"
        style={{
          fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
          color: "#ccc",
          background: "transparent",
        }}
      />
      
      {/* Actual editable textarea (transparent text, visible caret) */}
      <textarea
        ref={textareaRef}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onScroll={handleScroll}
        readOnly={readOnly}
        spellCheck={false}
        autoCapitalize="none"
        autoCorrect="off"
        className="absolute inset-0 w-full h-full font-mono text-sm leading-6 p-4 outline-none resize-none overflow-auto"
        style={{
          fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
          background: "transparent",
          color: "transparent",
          caretColor: "#fff",
          WebkitTextFillColor: "transparent",
        }}
      />
    </div>
  );
}
