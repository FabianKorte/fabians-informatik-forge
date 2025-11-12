import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SEO } from '@/components/SEO';
import { ArrowLeft, Search, BookOpen, Tag } from 'lucide-react';
import { lexikonData, getEntriesByLetter, searchEntries, getAllLetters, type LexikonEntry } from '@/data/lexikon';
import { cn } from '@/lib/utils';

const Lexikon = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<LexikonEntry | null>(null);

  const availableLetters = useMemo(() => getAllLetters(), []);

  const filteredEntries = useMemo(() => {
    if (searchTerm) {
      return searchEntries(searchTerm);
    }
    if (selectedLetter) {
      return getEntriesByLetter(selectedLetter);
    }
    return lexikonData;
  }, [searchTerm, selectedLetter]);

  const groupedEntries = useMemo(() => {
    const grouped: Record<string, LexikonEntry[]> = {};
    filteredEntries.forEach(entry => {
      const letter = entry.term.charAt(0).toUpperCase();
      if (!grouped[letter]) {
        grouped[letter] = [];
      }
      grouped[letter].push(entry);
    });
    return grouped;
  }, [filteredEntries]);

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(letter === selectedLetter ? null : letter);
    setSearchTerm('');
    setSelectedEntry(null);
  };

  const handleEntryClick = (entry: LexikonEntry) => {
    setSelectedEntry(entry);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <SEO 
        title="IT-Lexikon - Informatik Begriffe erklärt"
        description="Umfassendes IT-Lexikon mit über 50 wichtigen Informatik-Begriffen. Von API bis Webpack - alle wichtigen Konzepte verständlich erklärt."
      />

      <div className="container max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              IT-Lexikon
            </h1>
            <p className="text-muted-foreground mt-1">
              Über {lexikonData.length} wichtige IT-Begriffe erklärt
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Navigation */}
          <div className="lg:col-span-1 space-y-4">
            {/* Search */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Search className="h-5 w-5 text-primary" />
                  Suche
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Begriff suchen..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setSelectedLetter(null);
                    setSelectedEntry(null);
                  }}
                  className="w-full"
                />
                {searchTerm && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {filteredEntries.length} Ergebnisse gefunden
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Alphabet Navigation */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Alphabet</CardTitle>
                <CardDescription>Nach Buchstaben filtern</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {availableLetters.map((letter) => (
                    <Button
                      key={letter}
                      variant={selectedLetter === letter ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleLetterClick(letter)}
                      className={cn(
                        "w-10 h-10 p-0 font-semibold transition-all",
                        selectedLetter === letter && "shadow-lg"
                      )}
                    >
                      {letter}
                    </Button>
                  ))}
                </div>
                {selectedLetter && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedLetter(null);
                      setSelectedEntry(null);
                    }}
                    className="w-full mt-3"
                  >
                    Alle anzeigen
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{lexikonData.length}</p>
                    <p className="text-sm text-muted-foreground">IT-Begriffe</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Terms List & Details */}
          <div className="lg:col-span-2 space-y-4">
            {selectedEntry ? (
              // Detail View
              <Card className="border-primary/50 shadow-xl">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">{selectedEntry.term}</CardTitle>
                      {selectedEntry.category && (
                        <Badge variant="secondary" className="mb-3">
                          <Tag className="h-3 w-3 mr-1" />
                          {selectedEntry.category}
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedEntry(null)}
                    >
                      Zurück
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 text-primary">Definition</h3>
                    <p className="text-foreground leading-relaxed">{selectedEntry.definition}</p>
                  </div>

                  {selectedEntry.relatedTerms && selectedEntry.relatedTerms.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2 text-primary">Verwandte Begriffe</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedEntry.relatedTerms.map((term) => (
                          <Badge key={term} variant="outline" className="cursor-pointer hover:bg-primary/10">
                            {term}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              // List View
              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="space-y-6 pr-4">
                  {Object.keys(groupedEntries).length === 0 ? (
                    <Card>
                      <CardContent className="pt-6 text-center">
                        <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <p className="text-muted-foreground">
                          Keine Begriffe gefunden für "{searchTerm}"
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    Object.entries(groupedEntries)
                      .sort(([a], [b]) => a.localeCompare(b))
                      .map(([letter, entries]) => (
                        <div key={letter}>
                          <h2 className="text-2xl font-bold text-primary mb-3 sticky top-0 bg-background/95 backdrop-blur-sm py-2 z-10">
                            {letter}
                          </h2>
                          <div className="space-y-2">
                            {entries.map((entry) => (
                              <Card
                                key={entry.id}
                                className="cursor-pointer hover:shadow-md hover:border-primary/50 transition-all"
                                onClick={() => handleEntryClick(entry)}
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                      <h3 className="font-semibold text-lg mb-1">{entry.term}</h3>
                                      <p className="text-sm text-muted-foreground line-clamp-2">
                                        {entry.definition}
                                      </p>
                                    </div>
                                    {entry.category && (
                                      <Badge variant="secondary" className="shrink-0">
                                        {entry.category}
                                      </Badge>
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </ScrollArea>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lexikon;