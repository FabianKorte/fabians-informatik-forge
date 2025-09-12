import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { CodeChallenge } from "@/types/learn";

interface CodeChallengeProps {
  challenges: CodeChallenge[];
}

export const CodeChallengeComponent = ({ challenges }: CodeChallengeProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userCode, setUserCode] = useState(challenges[0]?.initialCode || "");
  const [showSolution, setShowSolution] = useState(false);
  const [testResults, setTestResults] = useState<boolean[]>([]);

  const current = challenges[currentIndex];

  const runTests = () => {
    // Simulate test execution - in a real app you'd run the code
    const results = current.tests.map(() => Math.random() > 0.3);
    setTestResults(results);
  };

  const next = () => {
    if (currentIndex < challenges.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserCode(challenges[currentIndex + 1].initialCode);
      setShowSolution(false);
      setTestResults([]);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setUserCode(challenges[currentIndex - 1].initialCode);
      setShowSolution(false);
      setTestResults([]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-elegant">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg md:text-xl font-semibold text-foreground">{current.title}</h3>
          <Badge variant="outline" className="text-xs">
            {currentIndex + 1} / {challenges.length}
          </Badge>
        </div>
        
        <p className="text-muted-foreground mb-6">{current.description}</p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Dein Code:</h4>
            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              className="w-full h-48 p-4 rounded-lg border border-border bg-background text-foreground font-mono text-sm resize-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Schreibe deinen Code hier..."
            />
            <div className="flex gap-2">
              <Button onClick={runTests} size="sm">
                Tests ausführen
              </Button>
              <Button onClick={() => setShowSolution(!showSolution)} variant="outline" size="sm">
                {showSolution ? "Lösung verstecken" : "Lösung anzeigen"}
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Tests:</h4>
            <div className="space-y-2">
              {current.tests.map((test, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Input: </span>
                    <code className="font-mono">{test.input}</code>
                    <br />
                    <span className="text-muted-foreground">Erwartet: </span>
                    <code className="font-mono">{test.expected}</code>
                  </div>
                  {testResults.length > 0 && (
                    <Badge variant={testResults[i] ? "default" : "destructive"}>
                      {testResults[i] ? "✓" : "✗"}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
            
            {showSolution && (
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Lösung:</h4>
                <pre className="p-4 rounded-lg bg-secondary text-sm font-mono overflow-x-auto">
                  <code>{current.solution}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={prev} disabled={currentIndex === 0}>
          Vorherige
        </Button>
        <span className="text-sm text-muted-foreground">
          Challenge {currentIndex + 1} von {challenges.length}
        </span>
        <Button onClick={next} disabled={currentIndex === challenges.length - 1}>
          Nächste
        </Button>
      </div>
    </div>
  );
};