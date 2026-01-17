import { useRef, useCallback, useState } from "react";
import Editor, { OnMount, loader } from "@monaco-editor/react";

// Configure Monaco loader to use CDN
loader.config({
  paths: {
    vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs'
  }
});

interface JavaCodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  height?: string;
}

export function JavaCodeEditor({ value, onChange, readOnly = false, height = "300px" }: JavaCodeEditorProps) {
  const editorRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleEditorMount: OnMount = useCallback((editor, monaco) => {
    editorRef.current = editor;
    setIsLoaded(true);

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
          { label: "try", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "try", range },
          { label: "catch", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "catch", range },
          { label: "finally", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "finally", range },
          { label: "throw", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "throw", range },
          { label: "extends", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "extends", range },
          { label: "implements", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "implements", range },
          { label: "import", kind: monaco.languages.CompletionItemKind.Keyword, insertText: "import", range },
          
          // Types
          { label: "int", kind: monaco.languages.CompletionItemKind.TypeParameter, insertText: "int", range },
          { label: "String", kind: monaco.languages.CompletionItemKind.TypeParameter, insertText: "String", range },
          { label: "double", kind: monaco.languages.CompletionItemKind.TypeParameter, insertText: "double", range },
          { label: "boolean", kind: monaco.languages.CompletionItemKind.TypeParameter, insertText: "boolean", range },
          { label: "char", kind: monaco.languages.CompletionItemKind.TypeParameter, insertText: "char", range },
          { label: "ArrayList", kind: monaco.languages.CompletionItemKind.Class, insertText: "ArrayList", range },
          { label: "HashMap", kind: monaco.languages.CompletionItemKind.Class, insertText: "HashMap", range },
          
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
          {
            label: "foreach",
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: "for (${1:Type} ${2:item} : ${3:collection}) {\n\t$4\n}",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "For-each loop",
            range,
          },
          {
            label: "trycatch",
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: "try {\n\t$1\n} catch (${2:Exception} e) {\n\t$3\n}",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "Try-catch block",
            range,
          },
        ];

        return { suggestions };
      },
    });

    // Focus the editor after a short delay
    setTimeout(() => {
      editor.focus();
    }, 100);
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
