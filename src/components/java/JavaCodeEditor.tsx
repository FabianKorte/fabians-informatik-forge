import { useRef, useCallback } from "react";
import Editor, { OnMount } from "@monaco-editor/react";

interface JavaCodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  height?: string;
}

export function JavaCodeEditor({ value, onChange, readOnly = false, height = "300px" }: JavaCodeEditorProps) {
  const editorRef = useRef<any>(null);

  const handleEditorMount: OnMount = useCallback((editor, monaco) => {
    editorRef.current = editor;

    // Configure Java language
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
          // Keywords
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
          
          // Types
          { label: "int", kind: monaco.languages.CompletionItemKind.TypeParameter, insertText: "int", range },
          { label: "String", kind: monaco.languages.CompletionItemKind.TypeParameter, insertText: "String", range },
          { label: "double", kind: monaco.languages.CompletionItemKind.TypeParameter, insertText: "double", range },
          { label: "boolean", kind: monaco.languages.CompletionItemKind.TypeParameter, insertText: "boolean", range },
          { label: "char", kind: monaco.languages.CompletionItemKind.TypeParameter, insertText: "char", range },
          
          // Snippets
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
          {
            label: "fori",
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: "for (int ${1:i} = 0; ${1:i} < ${2:length}; ${1:i}++) {\n\t$3\n}",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "For loop with index",
            range,
          },
        ];

        return { suggestions };
      },
    });

    // Focus the editor
    editor.focus();
  }, []);

  return (
    <div className="rounded-lg overflow-hidden border border-border bg-[#1e1e1e]">
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
          suggestOnTriggerCharacters: true,
          quickSuggestions: true,
          formatOnPaste: true,
          formatOnType: true,
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
          smoothScrolling: true,
          bracketPairColorization: { enabled: true },
          guides: {
            bracketPairs: true,
            indentation: true,
          },
        }}
        loading={
          <div className="h-full flex items-center justify-center bg-[#1e1e1e] text-white">
            <span className="animate-pulse">Editor lädt...</span>
          </div>
        }
      />
    </div>
  );
}
