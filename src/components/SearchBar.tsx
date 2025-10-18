import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

export const SearchBar = ({
  placeholder = "Kategorien durchsuchen...",
  onSearch,
}: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto" role="search">
      <div className={`
        relative flex items-center gap-3 p-4 rounded-2xl 
        transition-all duration-300 
        ${isFocused 
          ? 'glass-effect shadow-accent scale-[1.02]' 
          : 'bg-secondary/50 backdrop-blur-sm shadow-md'
        }
      `}>
        
        {/* Search icon */}
        <Search 
          className={`
            w-5 h-5 transition-colors duration-200
            ${isFocused ? 'text-accent' : 'text-muted-foreground'}
          `}
          aria-hidden="true"
        />

        {/* Input field */}
        <Input
          type="search"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          aria-label="Suchfeld für Kategorien"
          className={`
            flex-1 border-none bg-transparent text-foreground
            placeholder:text-muted-foreground focus:ring-0 focus:outline-none
            text-base
          `}
        />

        {/* Clear button (appears when there's text) */}
        {query && (
          <Button
            onClick={clearSearch}
            variant="ghost"
            size="icon"
            aria-label="Suche zurücksetzen"
            className="h-8 w-8 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </Button>
        )}
      </div>

      {/* Search results indicator */}
      {query && (
        <div className="mt-2 text-center" role="status" aria-live="polite">
          <p className="text-sm text-muted-foreground">
            Suche nach "{query}"...
          </p>
        </div>
      )}
    </div>
  );
};