import type { StruktogrammScenario, StruktogrammExercise, Struktogramm } from '@/types/struktogramm';

// Helper to create exercise solutions
const createSolution = (id: string, title: string, blocks: any[]): Struktogramm => ({
  id,
  title,
  blocks,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

export const struktogrammScenarios: StruktogrammScenario[] = [
  {
    id: 'grundlagen',
    title: 'Grundlagen',
    description: 'Einfache Sequenzen und Verzweigungen',
    difficulty: 'anfaenger',
    xpReward: 100,
    exercises: [
      {
        id: 'ex1-summe',
        title: 'Summe zweier Zahlen',
        description: 'Erstelle ein Struktogramm, das zwei Zahlen einliest und deren Summe ausgibt.',
        difficulty: 'anfaenger',
        xpReward: 20,
        task: 'Lies zwei Zahlen ein, berechne die Summe und gib das Ergebnis aus.',
        hints: [
          'Du brauchst zwei Eingabe-Blöcke für die Zahlen',
          'Eine Anweisung für die Berechnung',
          'Einen Ausgabe-Block für das Ergebnis'
        ],
        category: 'sequenz',
        solution: createSolution('sol1', 'Summe zweier Zahlen', [
          { id: 'b1', type: 'input', variable: 'zahl1', prompt: 'Erste Zahl eingeben:' },
          { id: 'b2', type: 'input', variable: 'zahl2', prompt: 'Zweite Zahl eingeben:' },
          { id: 'b3', type: 'sequence', content: 'summe = zahl1 + zahl2' },
          { id: 'b4', type: 'output', content: 'summe' }
        ])
      },
      {
        id: 'ex2-gerade-ungerade',
        title: 'Gerade oder ungerade',
        description: 'Prüfe, ob eine eingegebene Zahl gerade oder ungerade ist.',
        difficulty: 'anfaenger',
        xpReward: 25,
        task: 'Lies eine Zahl ein und gib aus, ob sie gerade oder ungerade ist.',
        hints: [
          'Verwende den Modulo-Operator (%)',
          'Eine Zahl ist gerade, wenn zahl % 2 == 0'
        ],
        category: 'verzweigung',
        solution: createSolution('sol2', 'Gerade/Ungerade', [
          { id: 'b1', type: 'input', variable: 'zahl', prompt: 'Zahl eingeben:' },
          { 
            id: 'b2', 
            type: 'if', 
            condition: 'zahl % 2 == 0',
            thenBranch: [{ id: 'b3', type: 'output', content: '"gerade"' }],
            elseBranch: [{ id: 'b4', type: 'output', content: '"ungerade"' }]
          }
        ])
      },
      {
        id: 'ex3-maximum',
        title: 'Maximum von drei Zahlen',
        description: 'Finde das Maximum von drei eingegebenen Zahlen.',
        difficulty: 'anfaenger',
        xpReward: 30,
        task: 'Lies drei Zahlen ein und gib die größte davon aus.',
        hints: [
          'Du kannst verschachtelte Verzweigungen verwenden',
          'Oder eine Variable "max" nutzen und aktualisieren'
        ],
        category: 'verzweigung',
        solution: createSolution('sol3', 'Maximum', [
          { id: 'b1', type: 'input', variable: 'a', prompt: 'Erste Zahl:' },
          { id: 'b2', type: 'input', variable: 'b', prompt: 'Zweite Zahl:' },
          { id: 'b3', type: 'input', variable: 'c', prompt: 'Dritte Zahl:' },
          { id: 'b4', type: 'sequence', content: 'max = a' },
          { 
            id: 'b5', 
            type: 'if', 
            condition: 'b > max',
            thenBranch: [{ id: 'b6', type: 'sequence', content: 'max = b' }],
            elseBranch: []
          },
          { 
            id: 'b7', 
            type: 'if', 
            condition: 'c > max',
            thenBranch: [{ id: 'b8', type: 'sequence', content: 'max = c' }],
            elseBranch: []
          },
          { id: 'b9', type: 'output', content: 'max' }
        ])
      }
    ]
  },
  {
    id: 'schleifen',
    title: 'Schleifen',
    description: 'Kopf- und fußgesteuerte Schleifen',
    difficulty: 'fortgeschritten',
    xpReward: 150,
    exercises: [
      {
        id: 'ex4-summe-1-bis-n',
        title: 'Summe 1 bis n',
        description: 'Berechne die Summe aller Zahlen von 1 bis n.',
        difficulty: 'fortgeschritten',
        xpReward: 35,
        task: 'Lies n ein und berechne 1 + 2 + 3 + ... + n mit einer Schleife.',
        hints: [
          'Initialisiere eine Variable "summe" mit 0',
          'Verwende eine Zählschleife von 1 bis n'
        ],
        category: 'schleife',
        solution: createSolution('sol4', 'Summe 1 bis n', [
          { id: 'b1', type: 'input', variable: 'n', prompt: 'Obere Grenze n:' },
          { id: 'b2', type: 'sequence', content: 'summe = 0' },
          { 
            id: 'b3', 
            type: 'for', 
            variable: 'i',
            start: '1',
            end: 'n',
            body: [{ id: 'b4', type: 'sequence', content: 'summe = summe + i' }]
          },
          { id: 'b5', type: 'output', content: 'summe' }
        ])
      },
      {
        id: 'ex5-fakultaet',
        title: 'Fakultät berechnen',
        description: 'Berechne n! (n-Fakultät).',
        difficulty: 'fortgeschritten',
        xpReward: 40,
        task: 'Berechne n! = 1 * 2 * 3 * ... * n',
        hints: [
          'Initialisiere "ergebnis" mit 1',
          'Multipliziere in einer Schleife'
        ],
        category: 'schleife',
        solution: createSolution('sol5', 'Fakultät', [
          { id: 'b1', type: 'input', variable: 'n', prompt: 'n für n!:' },
          { id: 'b2', type: 'sequence', content: 'ergebnis = 1' },
          { 
            id: 'b3', 
            type: 'for', 
            variable: 'i',
            start: '1',
            end: 'n',
            body: [{ id: 'b4', type: 'sequence', content: 'ergebnis = ergebnis * i' }]
          },
          { id: 'b5', type: 'output', content: 'ergebnis' }
        ])
      },
      {
        id: 'ex6-passwort',
        title: 'Passwort-Prüfung',
        description: 'Wiederhole die Eingabe, bis das richtige Passwort eingegeben wird.',
        difficulty: 'fortgeschritten',
        xpReward: 35,
        task: 'Das korrekte Passwort ist "geheim". Frage so lange, bis es richtig ist.',
        hints: [
          'Verwende eine kopfgesteuerte Schleife (while)',
          'Prüfe die Bedingung am Schleifenanfang'
        ],
        category: 'schleife',
        solution: createSolution('sol6', 'Passwort', [
          { id: 'b1', type: 'input', variable: 'passwort', prompt: 'Passwort eingeben:' },
          { 
            id: 'b2', 
            type: 'while', 
            condition: 'passwort != "geheim"',
            body: [
              { id: 'b3', type: 'output', content: '"Falsches Passwort!"' },
              { id: 'b4', type: 'input', variable: 'passwort', prompt: 'Nochmal:' }
            ]
          },
          { id: 'b5', type: 'output', content: '"Zugang gewährt!"' }
        ])
      },
      {
        id: 'ex7-menu',
        title: 'Menüsteuerung',
        description: 'Zeige ein Menü und reagiere auf die Auswahl.',
        difficulty: 'fortgeschritten',
        xpReward: 45,
        task: 'Zeige Optionen 1-3 und "0 = Beenden". Wiederhole bis 0 gewählt wird.',
        hints: [
          'Fußgesteuerte Schleife (do-while) ist hier ideal',
          'Mindestens einmal wird das Menü gezeigt'
        ],
        category: 'schleife',
        solution: createSolution('sol7', 'Menü', [
          { 
            id: 'b1', 
            type: 'doWhile', 
            condition: 'wahl != 0',
            body: [
              { id: 'b2', type: 'output', content: '"1=Option A, 2=Option B, 0=Ende"' },
              { id: 'b3', type: 'input', variable: 'wahl', prompt: 'Auswahl:' },
              {
                id: 'b4',
                type: 'switch',
                expression: 'wahl',
                cases: [
                  { value: '1', blocks: [{ id: 'b5', type: 'output', content: '"Option A gewählt"' }] },
                  { value: '2', blocks: [{ id: 'b6', type: 'output', content: '"Option B gewählt"' }] }
                ]
              }
            ]
          },
          { id: 'b7', type: 'output', content: '"Programm beendet"' }
        ])
      }
    ]
  },
  {
    id: 'algorithmen',
    title: 'Algorithmen',
    description: 'Klassische Algorithmen als Struktogramm',
    difficulty: 'experte',
    xpReward: 200,
    exercises: [
      {
        id: 'ex8-primzahl',
        title: 'Primzahltest',
        description: 'Prüfe, ob eine Zahl eine Primzahl ist.',
        difficulty: 'experte',
        xpReward: 50,
        task: 'Eine Zahl ist prim, wenn sie nur durch 1 und sich selbst teilbar ist.',
        hints: [
          'Prüfe Teilbarkeit von 2 bis sqrt(n)',
          'Setze eine Flag-Variable "istPrim"'
        ],
        category: 'algorithmus',
        solution: createSolution('sol8', 'Primzahl', [
          { id: 'b1', type: 'input', variable: 'n', prompt: 'Zahl eingeben:' },
          { id: 'b2', type: 'sequence', content: 'istPrim = true' },
          { id: 'b3', type: 'sequence', content: 'teiler = 2' },
          { 
            id: 'b4', 
            type: 'while', 
            condition: 'teiler * teiler <= n AND istPrim',
            body: [
              {
                id: 'b5',
                type: 'if',
                condition: 'n % teiler == 0',
                thenBranch: [{ id: 'b6', type: 'sequence', content: 'istPrim = false' }],
                elseBranch: []
              },
              { id: 'b7', type: 'sequence', content: 'teiler = teiler + 1' }
            ]
          },
          {
            id: 'b8',
            type: 'if',
            condition: 'istPrim AND n > 1',
            thenBranch: [{ id: 'b9', type: 'output', content: '"ist Primzahl"' }],
            elseBranch: [{ id: 'b10', type: 'output', content: '"keine Primzahl"' }]
          }
        ])
      },
      {
        id: 'ex9-ggT',
        title: 'Größter gemeinsamer Teiler (ggT)',
        description: 'Berechne den ggT zweier Zahlen mit dem Euklidischen Algorithmus.',
        difficulty: 'experte',
        xpReward: 55,
        task: 'Verwende den Euklidischen Algorithmus: ggT(a,b) = ggT(b, a mod b)',
        hints: [
          'Wiederhole solange b != 0',
          'In jeder Iteration: temp = b, b = a mod b, a = temp'
        ],
        category: 'algorithmus',
        solution: createSolution('sol9', 'ggT', [
          { id: 'b1', type: 'input', variable: 'a', prompt: 'Erste Zahl:' },
          { id: 'b2', type: 'input', variable: 'b', prompt: 'Zweite Zahl:' },
          { 
            id: 'b3', 
            type: 'while', 
            condition: 'b != 0',
            body: [
              { id: 'b4', type: 'sequence', content: 'temp = b' },
              { id: 'b5', type: 'sequence', content: 'b = a mod b' },
              { id: 'b6', type: 'sequence', content: 'a = temp' }
            ]
          },
          { id: 'b7', type: 'output', content: 'a' }
        ])
      },
      {
        id: 'ex10-bubble-sort',
        title: 'Bubble Sort',
        description: 'Sortiere ein Array mit Bubble Sort.',
        difficulty: 'experte',
        xpReward: 60,
        task: 'Sortiere ein Array aufsteigend durch wiederholtes Vertauschen benachbarter Elemente.',
        hints: [
          'Äußere Schleife: n-1 Durchläufe',
          'Innere Schleife: Vergleiche und tausche Nachbarn'
        ],
        category: 'algorithmus',
        solution: createSolution('sol10', 'Bubble Sort', [
          { id: 'b1', type: 'input', variable: 'n', prompt: 'Array-Länge:' },
          { id: 'b2', type: 'sequence', content: 'Array A[0..n-1] einlesen' },
          { 
            id: 'b3', 
            type: 'for', 
            variable: 'i',
            start: '0',
            end: 'n-2',
            body: [
              { 
                id: 'b4', 
                type: 'for', 
                variable: 'j',
                start: '0',
                end: 'n-2-i',
                body: [
                  {
                    id: 'b5',
                    type: 'if',
                    condition: 'A[j] > A[j+1]',
                    thenBranch: [
                      { id: 'b6', type: 'sequence', content: 'temp = A[j]' },
                      { id: 'b7', type: 'sequence', content: 'A[j] = A[j+1]' },
                      { id: 'b8', type: 'sequence', content: 'A[j+1] = temp' }
                    ],
                    elseBranch: []
                  }
                ]
              }
            ]
          },
          { id: 'b9', type: 'output', content: 'A sortiert ausgeben' }
        ])
      }
    ]
  },
  // Neue Algorithmen-Szenarien
  {
    id: 'such-algorithmen',
    title: 'Such-Algorithmen',
    description: 'Lineare und binäre Suche',
    difficulty: 'experte',
    xpReward: 180,
    exercises: [
      {
        id: 'ex11-lineare-suche',
        title: 'Lineare Suche',
        description: 'Durchsuche ein Array sequentiell nach einem Element.',
        difficulty: 'fortgeschritten',
        xpReward: 35,
        task: 'Suche einen Wert in einem unsortierten Array und gib die Position aus (-1 wenn nicht gefunden).',
        hints: [
          'Durchlaufe das Array von Anfang bis Ende',
          'Vergleiche jedes Element mit dem Suchwert',
          'Breche ab, wenn gefunden'
        ],
        category: 'algorithmus',
        solution: createSolution('sol11', 'Lineare Suche', [
          { id: 'b1', type: 'input', variable: 'n', prompt: 'Array-Länge:' },
          { id: 'b2', type: 'sequence', content: 'Array A[0..n-1] einlesen' },
          { id: 'b3', type: 'input', variable: 'suchwert', prompt: 'Suchwert:' },
          { id: 'b4', type: 'sequence', content: 'position = -1' },
          { id: 'b5', type: 'sequence', content: 'i = 0' },
          { 
            id: 'b6', 
            type: 'while', 
            condition: 'i < n AND position == -1',
            body: [
              {
                id: 'b7',
                type: 'if',
                condition: 'A[i] == suchwert',
                thenBranch: [{ id: 'b8', type: 'sequence', content: 'position = i' }],
                elseBranch: []
              },
              { id: 'b9', type: 'sequence', content: 'i = i + 1' }
            ]
          },
          { id: 'b10', type: 'output', content: 'position' }
        ])
      },
      {
        id: 'ex12-binaere-suche',
        title: 'Binäre Suche',
        description: 'Effiziente Suche in einem sortierten Array.',
        difficulty: 'experte',
        xpReward: 55,
        task: 'Suche einen Wert in einem sortierten Array durch Halbierung des Suchbereichs.',
        hints: [
          'Setze links = 0, rechts = n-1',
          'Berechne mitte = (links + rechts) / 2',
          'Vergleiche und halbiere den Suchbereich'
        ],
        category: 'algorithmus',
        solution: createSolution('sol12', 'Binäre Suche', [
          { id: 'b1', type: 'input', variable: 'n', prompt: 'Array-Länge:' },
          { id: 'b2', type: 'sequence', content: 'Sortiertes Array A[0..n-1] einlesen' },
          { id: 'b3', type: 'input', variable: 'suchwert', prompt: 'Suchwert:' },
          { id: 'b4', type: 'sequence', content: 'links = 0' },
          { id: 'b5', type: 'sequence', content: 'rechts = n - 1' },
          { id: 'b6', type: 'sequence', content: 'gefunden = false' },
          { 
            id: 'b7', 
            type: 'while', 
            condition: 'links <= rechts AND NOT gefunden',
            body: [
              { id: 'b8', type: 'sequence', content: 'mitte = (links + rechts) / 2' },
              {
                id: 'b9',
                type: 'if',
                condition: 'A[mitte] == suchwert',
                thenBranch: [{ id: 'b10', type: 'sequence', content: 'gefunden = true' }],
                elseBranch: [
                  {
                    id: 'b11',
                    type: 'if',
                    condition: 'A[mitte] < suchwert',
                    thenBranch: [{ id: 'b12', type: 'sequence', content: 'links = mitte + 1' }],
                    elseBranch: [{ id: 'b13', type: 'sequence', content: 'rechts = mitte - 1' }]
                  }
                ]
              }
            ]
          },
          {
            id: 'b14',
            type: 'if',
            condition: 'gefunden',
            thenBranch: [{ id: 'b15', type: 'output', content: 'mitte' }],
            elseBranch: [{ id: 'b16', type: 'output', content: '-1 (nicht gefunden)' }]
          }
        ])
      }
    ]
  },
  {
    id: 'rekursion',
    title: 'Rekursive Algorithmen',
    description: 'Fibonacci, Palindrom und mehr',
    difficulty: 'experte',
    xpReward: 200,
    exercises: [
      {
        id: 'ex13-fibonacci',
        title: 'Fibonacci-Folge',
        description: 'Berechne die n-te Fibonacci-Zahl iterativ.',
        difficulty: 'fortgeschritten',
        xpReward: 40,
        task: 'Berechne die n-te Fibonacci-Zahl: F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2)',
        hints: [
          'Speichere die letzten zwei Werte',
          'Iteriere von 2 bis n',
          'Aktualisiere die Werte in jedem Schritt'
        ],
        category: 'algorithmus',
        solution: createSolution('sol13', 'Fibonacci', [
          { id: 'b1', type: 'input', variable: 'n', prompt: 'n-te Fibonacci-Zahl:' },
          {
            id: 'b2',
            type: 'if',
            condition: 'n <= 1',
            thenBranch: [{ id: 'b3', type: 'output', content: 'n' }],
            elseBranch: [
              { id: 'b4', type: 'sequence', content: 'a = 0' },
              { id: 'b5', type: 'sequence', content: 'b = 1' },
              { 
                id: 'b6', 
                type: 'for', 
                variable: 'i',
                start: '2',
                end: 'n',
                body: [
                  { id: 'b7', type: 'sequence', content: 'temp = a + b' },
                  { id: 'b8', type: 'sequence', content: 'a = b' },
                  { id: 'b9', type: 'sequence', content: 'b = temp' }
                ]
              },
              { id: 'b10', type: 'output', content: 'b' }
            ]
          }
        ])
      },
      {
        id: 'ex14-palindrom',
        title: 'Palindrom-Prüfung',
        description: 'Prüfe, ob ein Wort ein Palindrom ist.',
        difficulty: 'fortgeschritten',
        xpReward: 40,
        task: 'Ein Palindrom liest sich vorwärts und rückwärts gleich (z.B. "ANNA").',
        hints: [
          'Vergleiche Zeichen von außen nach innen',
          'links = 0, rechts = Länge-1',
          'Abbruch wenn links >= rechts oder ungleich'
        ],
        category: 'algorithmus',
        solution: createSolution('sol14', 'Palindrom', [
          { id: 'b1', type: 'input', variable: 'wort', prompt: 'Wort eingeben:' },
          { id: 'b2', type: 'sequence', content: 'n = Länge(wort)' },
          { id: 'b3', type: 'sequence', content: 'links = 0' },
          { id: 'b4', type: 'sequence', content: 'rechts = n - 1' },
          { id: 'b5', type: 'sequence', content: 'istPalindrom = true' },
          { 
            id: 'b6', 
            type: 'while', 
            condition: 'links < rechts AND istPalindrom',
            body: [
              {
                id: 'b7',
                type: 'if',
                condition: 'wort[links] != wort[rechts]',
                thenBranch: [{ id: 'b8', type: 'sequence', content: 'istPalindrom = false' }],
                elseBranch: []
              },
              { id: 'b9', type: 'sequence', content: 'links = links + 1' },
              { id: 'b10', type: 'sequence', content: 'rechts = rechts - 1' }
            ]
          },
          {
            id: 'b11',
            type: 'if',
            condition: 'istPalindrom',
            thenBranch: [{ id: 'b12', type: 'output', content: '"ist Palindrom"' }],
            elseBranch: [{ id: 'b13', type: 'output', content: '"kein Palindrom"' }]
          }
        ])
      },
      {
        id: 'ex15-quersumme',
        title: 'Quersumme berechnen',
        description: 'Berechne die Quersumme einer Zahl.',
        difficulty: 'anfaenger',
        xpReward: 25,
        task: 'Die Quersumme ist die Summe aller Ziffern einer Zahl (z.B. 123 → 1+2+3 = 6).',
        hints: [
          'Nutze Modulo 10 für die letzte Ziffer',
          'Teile durch 10 um die letzte Ziffer zu entfernen',
          'Wiederhole bis die Zahl 0 ist'
        ],
        category: 'algorithmus',
        solution: createSolution('sol15', 'Quersumme', [
          { id: 'b1', type: 'input', variable: 'zahl', prompt: 'Zahl eingeben:' },
          { id: 'b2', type: 'sequence', content: 'summe = 0' },
          { 
            id: 'b3', 
            type: 'while', 
            condition: 'zahl > 0',
            body: [
              { id: 'b4', type: 'sequence', content: 'summe = summe + (zahl % 10)' },
              { id: 'b5', type: 'sequence', content: 'zahl = zahl / 10' }
            ]
          },
          { id: 'b6', type: 'output', content: 'summe' }
        ])
      }
    ]
  }
];

// Pre-built templates for quick start
export const struktogrammTemplates: Struktogramm[] = [
  {
    id: 'template-empty',
    title: 'Leeres Struktogramm',
    description: 'Starte mit einem leeren Diagramm',
    blocks: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'template-basic',
    title: 'Eingabe-Verarbeitung-Ausgabe',
    description: 'Grundstruktur: EVA-Prinzip',
    blocks: [
      { id: 't1', type: 'input', variable: 'eingabe', prompt: 'Wert eingeben:' },
      { id: 't2', type: 'sequence', content: 'ergebnis = eingabe verarbeiten' },
      { id: 't3', type: 'output', content: 'ergebnis' }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'template-if-else',
    title: 'Einfache Verzweigung',
    description: 'If-Else Grundstruktur',
    blocks: [
      { id: 't1', type: 'input', variable: 'wert', prompt: 'Eingabe:' },
      { 
        id: 't2', 
        type: 'if', 
        condition: 'Bedingung',
        thenBranch: [{ id: 't3', type: 'sequence', content: 'Dann-Zweig' }],
        elseBranch: [{ id: 't4', type: 'sequence', content: 'Sonst-Zweig' }]
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'template-loop',
    title: 'Zählschleife',
    description: 'For-Schleife Grundstruktur',
    blocks: [
      { id: 't1', type: 'sequence', content: 'Initialisierung' },
      { 
        id: 't2', 
        type: 'for', 
        variable: 'i',
        start: '1',
        end: '10',
        body: [{ id: 't3', type: 'sequence', content: 'Schleifenkörper' }]
      },
      { id: 't4', type: 'output', content: 'Ergebnis' }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
