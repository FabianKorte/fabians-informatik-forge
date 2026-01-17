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

    // Disable the find widget completely
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyF, () => {});
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyH, () => {});
    
    // Hide any widgets that might be visible
    const findWidget = editor.getContribution('editor.contrib.findController');
    if (findWidget && typeof (findWidget as any).closeFindWidget === 'function') {
      (findWidget as any).closeFindWidget();
    }

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
          
          // Types
          { label: "int", kind: monaco.languages.CompletionItemKind.TypeParameter, insertText: "int", range },
          { label: "String", kind: monaco.languages.CompletionItemKind.TypeParameter, insertText: "String", range },
          { label: "double", kind: monaco.languages.CompletionItemKind.TypeParameter, insertText: "double", range },
          { label: "boolean", kind: monaco.languages.CompletionItemKind.TypeParameter, insertText: "boolean", range },
          
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
        ];

        return { suggestions };
      },
    });

    // Focus editor after short delay
    setTimeout(() => editor.focus(), 100);
  }, []);

  return (
    <div className="rounded-lg overflow-hidden border border-border [&_.monaco-editor_.find-widget]:!hidden [&_.monaco-editor_.findInput]:!hidden [&_.monaco-editor-background]:!bg-[#1e1e1e]">
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
          overviewRulerBorder: false,
          overviewRulerLanes: 0,
          hideCursorInOverviewRuler: true,
          // Disable all problematic features
          renameOnType: false,
          quickSuggestions: false,
          parameterHints: { enabled: false },
          hover: { enabled: false },
          links: false,
          contextmenu: false,
          scrollbar: {
            vertical: "auto",
            horizontal: "auto",
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
            useShadows: false,
          },
          find: {
            addExtraSpaceOnTop: false,
            autoFindInSelection: "never",
            seedSearchStringFromSelection: "never",
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