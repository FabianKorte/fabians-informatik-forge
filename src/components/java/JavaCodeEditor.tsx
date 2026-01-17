import { useRef, useCallback, useEffect } from "react";
import Editor, { OnMount } from "@monaco-editor/react";

interface JavaCodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  height?: string;
}

export function JavaCodeEditor({ value, onChange, readOnly = false, height = "300px" }: JavaCodeEditorProps) {
  const editorRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fix Monaco's hidden textarea styling after mount
  useEffect(() => {
    const fixTextareaStyles = () => {
      if (!containerRef.current) return;
      
      const textareas = containerRef.current.querySelectorAll('textarea');
      textareas.forEach((textarea) => {
        textarea.style.cssText = `
          background: transparent !important;
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
          resize: none !important;
          color: transparent !important;
          caret-color: transparent !important;
          opacity: 1 !important;
        `;
      });
    };

    // Run immediately and also after a delay to catch late-rendered elements
    fixTextareaStyles();
    const timer1 = setTimeout(fixTextareaStyles, 100);
    const timer2 = setTimeout(fixTextareaStyles, 500);
    const timer3 = setTimeout(fixTextareaStyles, 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleEditorMount: OnMount = useCallback((editor, monaco) => {
    editorRef.current = editor;

    // Fix textarea styles after editor mounts
    setTimeout(() => {
      if (containerRef.current) {
        const textareas = containerRef.current.querySelectorAll('textarea');
        textareas.forEach((textarea) => {
          textarea.style.background = 'transparent';
          textarea.style.border = 'none';
          textarea.style.outline = 'none';
          textarea.style.boxShadow = 'none';
          textarea.style.resize = 'none';
          textarea.style.color = 'transparent';
          textarea.style.caretColor = 'transparent';
        });
      }
    }, 50);

    // Configure Java language completions
    monaco.languages.registerCompletionItemProvider("java", {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        const suggestions: any[] = [
          { label: "public", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "public", range },
          { label: "private", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "private", range },
          { label: "static", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "static", range },
          { label: "void", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "void", range },
          { label: "class", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "class", range },
          { label: "if", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "if", range },
          { label: "else", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "else", range },
          { label: "for", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "for", range },
          { label: "while", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "while", range },
          { label: "return", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "return", range },
          { label: "new", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "new", range },
          { label: "int", kind: monaco.languages.CompletionItemKind.TypeParameter, insertText: "int", range },
          { label: "String", kind: monaco.languages.CompletionItemKind.TypeParameter, insertText: "String", range },
          { label: "double", kind: monaco.languages.CompletionItemKind.TypeParameter, insertText: "double", range },
          { label: "boolean", kind: monaco.languages.CompletionItemKind.TypeParameter, insertText: "boolean", range },
          {
            label: "sout",
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: "System.out.println($1);",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "Print to console",
            range,
          },
          {
            label: "main",
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: "public static void main(String[] args) {\n\t$1\n}",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "Main method",
            range,
          },
        ];

        return { suggestions };
      },
    });

    editor.focus();
  }, []);

  return (
    <div ref={containerRef} className="rounded-lg overflow-hidden border border-border">
      <Editor
        height={height}
        language="java"
        value={value}
        onChange={(val) => onChange(val || "")}
        onMount={handleEditorMount}
        theme="vs-dark"
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 4,
          wordWrap: "on",
          padding: { top: 12, bottom: 12 },
          cursorBlinking: "smooth",
          bracketPairColorization: { enabled: true },
          scrollbar: {
            vertical: "auto",
            horizontal: "auto",
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10,
          },
        }}
        loading={
          <div className="h-full flex items-center justify-center bg-[#1e1e1e] text-white/70" style={{ height }}>
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white/70 rounded-full animate-spin" />
              <span className="text-sm">Editor lädt...</span>
            </div>
          </div>
        }
      />
    </div>
  );
}
