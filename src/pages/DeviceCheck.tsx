import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CheckCircle2, AlertTriangle, RefreshCw, ExternalLink } from "lucide-react";
import { SEO } from "@/components/SEO";

interface Device {
  name: string;
  width: number;
  height: number;
  category: "phone" | "tablet" | "desktop";
}

const DEVICES: Device[] = [
  { name: "iPhone SE", width: 375, height: 667, category: "phone" },
  { name: "iPhone 14", width: 390, height: 844, category: "phone" },
  { name: "iPhone 14 Pro Max", width: 430, height: 932, category: "phone" },
  { name: "Galaxy S22", width: 360, height: 800, category: "phone" },
  { name: "Pixel 7", width: 412, height: 915, category: "phone" },
  { name: "iPad Mini", width: 768, height: 1024, category: "tablet" },
  { name: "iPad Pro 11", width: 834, height: 1194, category: "tablet" },
  { name: "Laptop", width: 1366, height: 768, category: "desktop" },
  { name: "Desktop HD", width: 1920, height: 1080, category: "desktop" },
];

interface CheckResult {
  hasHorizontalOverflow: boolean;
  documentWidth: number;
  viewportWidth: number;
  hasVerticalScrollbar: boolean;
  scrollHeight: number;
  offenders: { tag: string; classes: string; width: number }[];
}

interface FrameState {
  result?: CheckResult;
  loading: boolean;
  error?: string;
  reloadKey: number;
}

const DeviceFrame = ({
  device,
  path,
  onResult,
}: {
  device: Device;
  path: string;
  onResult: (name: string, result: CheckResult) => void;
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [state, setState] = useState<FrameState>({ loading: true, reloadKey: 0 });

  const runCheck = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe?.contentDocument || !iframe.contentWindow) return;
    try {
      const doc = iframe.contentDocument;
      const win = iframe.contentWindow;
      const viewportWidth = win.innerWidth;
      const documentWidth = Math.max(
        doc.documentElement.scrollWidth,
        doc.body?.scrollWidth ?? 0
      );
      const scrollHeight = Math.max(
        doc.documentElement.scrollHeight,
        doc.body?.scrollHeight ?? 0
      );
      const hasHorizontalOverflow = documentWidth > viewportWidth + 1;
      const hasVerticalScrollbar = scrollHeight > win.innerHeight + 1;

      const offenders: { tag: string; classes: string; width: number }[] = [];
      if (hasHorizontalOverflow) {
        const all = doc.body?.querySelectorAll("*") ?? [];
        const seen = new Set<string>();
        all.forEach((el) => {
          const rect = (el as HTMLElement).getBoundingClientRect();
          if (rect.right > viewportWidth + 1 && rect.width <= documentWidth) {
            const sig = `${el.tagName}-${(el as HTMLElement).className}`;
            if (seen.has(sig)) return;
            seen.add(sig);
            offenders.push({
              tag: el.tagName.toLowerCase(),
              classes:
                typeof (el as HTMLElement).className === "string"
                  ? (el as HTMLElement).className.slice(0, 80)
                  : "",
              width: Math.round(rect.width),
            });
          }
        });
        offenders.sort((a, b) => b.width - a.width);
      }

      const result: CheckResult = {
        hasHorizontalOverflow,
        documentWidth: Math.round(documentWidth),
        viewportWidth: Math.round(viewportWidth),
        hasVerticalScrollbar,
        scrollHeight: Math.round(scrollHeight),
        offenders: offenders.slice(0, 5),
      };
      setState((s) => ({ ...s, loading: false, result }));
      onResult(device.name, result);
    } catch (err) {
      setState((s) => ({
        ...s,
        loading: false,
        error: "Konnte Frame nicht inspizieren (Cross-Origin?)",
      }));
    }
  }, [device.name, onResult]);

  useEffect(() => {
    setState((s) => ({ ...s, loading: true, result: undefined, error: undefined }));
    const iframe = iframeRef.current;
    if (!iframe) return;
    const handler = () => {
      // Wait for content to settle
      setTimeout(runCheck, 800);
    };
    iframe.addEventListener("load", handler);
    return () => iframe.removeEventListener("load", handler);
  }, [state.reloadKey, runCheck]);

  const reload = () => setState((s) => ({ ...s, reloadKey: s.reloadKey + 1, loading: true }));

  // Scale to fit preview area (max 320px wide)
  const previewMaxWidth = 320;
  const scale = Math.min(1, previewMaxWidth / device.width);
  const previewHeight = 480;

  return (
    <Card className="p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-sm">{device.name}</h3>
            <Badge variant="outline" className="text-xs">
              {device.category}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            {device.width} × {device.height}
          </p>
        </div>
        <div className="flex gap-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={reload}
            title="Frame neu laden"
            className="h-7 w-7"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            asChild
            title="In neuem Tab öffnen"
            className="h-7 w-7"
          >
            <a href={path} target="_blank" rel="noreferrer">
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </Button>
        </div>
      </div>

      {/* Status */}
      <div className="text-xs space-y-1">
        {state.loading && (
          <div className="text-muted-foreground">Prüfe Layout…</div>
        )}
        {state.error && (
          <div className="text-destructive">{state.error}</div>
        )}
        {state.result && (
          <>
            <div className="flex items-center gap-2">
              {state.result.hasHorizontalOverflow ? (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 text-destructive" />
                  <span className="text-destructive font-medium">
                    Horizontaler Overflow: {state.result.documentWidth}px /{" "}
                    {state.result.viewportWidth}px
                  </span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                  <span className="text-muted-foreground">
                    Kein horizontaler Overflow
                  </span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-success" />
              <span className="text-muted-foreground">
                Höhe: {state.result.scrollHeight}px (
                {state.result.hasVerticalScrollbar ? "scrollt" : "passt"})
              </span>
            </div>
            {state.result.offenders.length > 0 && (
              <details className="mt-1">
                <summary className="cursor-pointer text-destructive">
                  {state.result.offenders.length} Verursacher anzeigen
                </summary>
                <ul className="mt-1 space-y-0.5 pl-3">
                  {state.result.offenders.map((o, i) => (
                    <li key={i} className="font-mono text-[10px] break-all">
                      &lt;{o.tag}&gt; {o.width}px – {o.classes || "(no class)"}
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </>
        )}
      </div>

      {/* Preview */}
      <div
        className="border border-border rounded bg-muted/30 overflow-hidden mx-auto"
        style={{ width: previewMaxWidth, height: previewHeight }}
      >
        <div
          style={{
            width: device.width,
            height: previewHeight / scale,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <iframe
            ref={iframeRef}
            key={state.reloadKey}
            src={path}
            title={`${device.name} preview`}
            style={{
              width: device.width,
              height: previewHeight / scale,
              border: 0,
            }}
          />
        </div>
      </div>
    </Card>
  );
};

const DeviceCheck = () => {
  const [path, setPath] = useState("/");
  const [activePath, setActivePath] = useState("/");
  const [results, setResults] = useState<Record<string, CheckResult>>({});
  const [reloadAllKey, setReloadAllKey] = useState(0);

  const handleResult = useCallback((name: string, result: CheckResult) => {
    setResults((r) => ({ ...r, [name]: result }));
  }, []);

  const summary = (() => {
    const entries = Object.entries(results);
    const failing = entries.filter(([, r]) => r.hasHorizontalOverflow);
    return {
      total: entries.length,
      checked: entries.length,
      failing: failing.length,
      failingNames: failing.map(([n]) => n),
    };
  })();

  const apply = () => {
    setActivePath(path.startsWith("/") ? path : `/${path}`);
    setResults({});
    setReloadAllKey((k) => k + 1);
  };

  return (
    <>
      <SEO
        title="Device Check"
        description="Layout- und Overflow-Prüfung über mehrere Viewports."
      />
      <div className="min-h-screen px-4 sm:px-6 py-6 sm:py-10">
        <div className="max-w-7xl mx-auto space-y-6">
          <header className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-medium">Device Check</h1>
            <p className="text-sm text-muted-foreground">
              Prüft Layout, horizontalen Overflow und Scrollbarkeit auf gängigen
              Viewports. Iframes laden den Pfad mit der echten App.
            </p>
          </header>

          <Card className="p-4 flex flex-col sm:flex-row gap-3 sm:items-end">
            <div className="flex-1">
              <label
                htmlFor="path-input"
                className="text-xs font-medium text-muted-foreground"
              >
                Zu prüfender Pfad
              </label>
              <Input
                id="path-input"
                value={path}
                onChange={(e) => setPath(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && apply()}
                placeholder="/"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={apply}>Anwenden</Button>
              <Button
                variant="outline"
                onClick={() => {
                  setResults({});
                  setReloadAllKey((k) => k + 1);
                }}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Alle neu laden
              </Button>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium">Ergebnis:</span>
              <Badge variant="outline">
                {summary.checked}/{DEVICES.length} geprüft
              </Badge>
              {summary.failing === 0 && summary.checked > 0 ? (
                <Badge className="bg-success text-success-foreground">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Alle OK
                </Badge>
              ) : summary.failing > 0 ? (
                <Badge variant="destructive">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  {summary.failing} mit Overflow:{" "}
                  {summary.failingNames.join(", ")}
                </Badge>
              ) : null}
            </div>
          </Card>

          <div
            key={reloadAllKey}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {DEVICES.map((d) => (
              <DeviceFrame
                key={d.name}
                device={d}
                path={activePath}
                onResult={handleResult}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DeviceCheck;
