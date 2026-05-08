import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Download,
  XCircle,
} from "lucide-react";
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

const LOAD_TIMEOUT_MS = 15000;

interface CheckResult {
  hasHorizontalOverflow: boolean;
  documentWidth: number;
  viewportWidth: number;
  hasVerticalScrollbar: boolean;
  scrollHeight: number;
  offenders: { tag: string; classes: string; width: number }[];
}

type FrameStatus = "loading" | "loaded" | "failed";

export interface FrameReport {
  device: Device;
  status: FrameStatus;
  loadTimeMs: number | null;
  error: string | null;
  result: CheckResult | null;
  timestamp: string;
}

interface FrameState {
  status: FrameStatus;
  result?: CheckResult;
  error?: string;
  loadTimeMs?: number;
  reloadKey: number;
}

const DeviceFrame = ({
  device,
  path,
  onReport,
}: {
  device: Device;
  path: string;
  onReport: (name: string, report: FrameReport) => void;
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [state, setState] = useState<FrameState>({ status: "loading", reloadKey: 0 });

  const reportRef = useRef(onReport);
  reportRef.current = onReport;

  const runCheck = useCallback(
    (loadTimeMs: number) => {
      const iframe = iframeRef.current;
      if (!iframe?.contentDocument || !iframe.contentWindow) {
        const err = "Konnte Frame nicht inspizieren (Cross-Origin?)";
        setState((s) => ({ ...s, status: "failed", error: err, loadTimeMs }));
        reportRef.current(device.name, {
          device,
          status: "failed",
          loadTimeMs,
          error: err,
          result: null,
          timestamp: new Date().toISOString(),
        });
        return;
      }
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
        setState((s) => ({ ...s, status: "loaded", result, loadTimeMs }));
        reportRef.current(device.name, {
          device,
          status: "loaded",
          loadTimeMs,
          error: null,
          result,
          timestamp: new Date().toISOString(),
        });
      } catch {
        const err = "Konnte Frame nicht inspizieren (Cross-Origin?)";
        setState((s) => ({ ...s, status: "failed", error: err, loadTimeMs }));
        reportRef.current(device.name, {
          device,
          status: "failed",
          loadTimeMs,
          error: err,
          result: null,
          timestamp: new Date().toISOString(),
        });
      }
    },
    [device]
  );

  useEffect(() => {
    setState({ status: "loading", reloadKey: state.reloadKey });
    const iframe = iframeRef.current;
    if (!iframe) return;

    const startedAt = performance.now();
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let settled = false;

    const onLoad = () => {
      if (settled) return;
      settled = true;
      if (timeoutId) clearTimeout(timeoutId);
      const loadTimeMs = Math.round(performance.now() - startedAt);
      // Allow content to settle before measuring layout
      setTimeout(() => runCheck(loadTimeMs), 800);
    };

    const onError = () => {
      if (settled) return;
      settled = true;
      if (timeoutId) clearTimeout(timeoutId);
      const loadTimeMs = Math.round(performance.now() - startedAt);
      const err = "Frame konnte nicht geladen werden";
      setState((s) => ({ ...s, status: "failed", error: err, loadTimeMs }));
      reportRef.current(device.name, {
        device,
        status: "failed",
        loadTimeMs,
        error: err,
        result: null,
        timestamp: new Date().toISOString(),
      });
    };

    timeoutId = setTimeout(() => {
      if (settled) return;
      settled = true;
      const err = `Timeout nach ${LOAD_TIMEOUT_MS} ms`;
      setState((s) => ({
        ...s,
        status: "failed",
        error: err,
        loadTimeMs: LOAD_TIMEOUT_MS,
      }));
      reportRef.current(device.name, {
        device,
        status: "failed",
        loadTimeMs: LOAD_TIMEOUT_MS,
        error: err,
        result: null,
        timestamp: new Date().toISOString(),
      });
    }, LOAD_TIMEOUT_MS);

    iframe.addEventListener("load", onLoad);
    iframe.addEventListener("error", onError);
    return () => {
      iframe.removeEventListener("load", onLoad);
      iframe.removeEventListener("error", onError);
      if (timeoutId) clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.reloadKey, runCheck, device.name]);

  const reload = () =>
    setState((s) => ({ ...s, reloadKey: s.reloadKey + 1, status: "loading" }));

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
            {state.loadTimeMs != null && state.status !== "loading" && (
              <> · {state.loadTimeMs} ms</>
            )}
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

      <div className="text-xs space-y-1">
        {state.status === "loading" && (
          <div className="text-muted-foreground">Lade & prüfe…</div>
        )}
        {state.status === "failed" && (
          <div className="flex items-start gap-2 text-destructive">
            <XCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            <span>{state.error}</span>
          </div>
        )}
        {state.status === "loaded" && state.result && (
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

const downloadFile = (filename: string, content: string, mime: string) => {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const csvEscape = (val: unknown): string => {
  if (val == null) return "";
  const s = String(val);
  if (/[",\n;]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
};

const buildCsv = (path: string, reports: FrameReport[]): string => {
  const headers = [
    "device",
    "category",
    "width",
    "height",
    "status",
    "loadTimeMs",
    "error",
    "documentWidth",
    "viewportWidth",
    "hasHorizontalOverflow",
    "scrollHeight",
    "hasVerticalScrollbar",
    "topOffender",
    "topOffenderWidth",
    "path",
    "timestamp",
  ];
  const rows = reports.map((r) => {
    const top = r.result?.offenders[0];
    return [
      r.device.name,
      r.device.category,
      r.device.width,
      r.device.height,
      r.status,
      r.loadTimeMs ?? "",
      r.error ?? "",
      r.result?.documentWidth ?? "",
      r.result?.viewportWidth ?? "",
      r.result?.hasHorizontalOverflow ?? "",
      r.result?.scrollHeight ?? "",
      r.result?.hasVerticalScrollbar ?? "",
      top ? `<${top.tag}> ${top.classes}` : "",
      top?.width ?? "",
      path,
      r.timestamp,
    ].map(csvEscape).join(",");
  });
  return [headers.join(","), ...rows].join("\n");
};

const DeviceCheck = () => {
  const [path, setPath] = useState("/");
  const [activePath, setActivePath] = useState("/");
  const [reports, setReports] = useState<Record<string, FrameReport>>({});
  const [reloadAllKey, setReloadAllKey] = useState(0);

  const handleReport = useCallback((name: string, report: FrameReport) => {
    setReports((r) => ({ ...r, [name]: report }));
  }, []);

  const reportList = DEVICES.map((d) => reports[d.name]).filter(
    (r): r is FrameReport => Boolean(r)
  );
  const failed = reportList.filter((r) => r.status === "failed");
  const overflowing = reportList.filter(
    (r) => r.status === "loaded" && r.result?.hasHorizontalOverflow
  );
  const loadTimes = reportList
    .filter((r) => r.loadTimeMs != null)
    .map((r) => r.loadTimeMs as number);
  const avgLoad =
    loadTimes.length > 0
      ? Math.round(loadTimes.reduce((a, b) => a + b, 0) / loadTimes.length)
      : null;
  const maxLoad = loadTimes.length > 0 ? Math.max(...loadTimes) : null;

  const apply = () => {
    setActivePath(path.startsWith("/") ? path : `/${path}`);
    setReports({});
    setReloadAllKey((k) => k + 1);
  };

  const exportJson = () => {
    const payload = {
      generatedAt: new Date().toISOString(),
      path: activePath,
      summary: {
        total: DEVICES.length,
        checked: reportList.length,
        loaded: reportList.length - failed.length,
        failed: failed.length,
        overflowing: overflowing.length,
        avgLoadTimeMs: avgLoad,
        maxLoadTimeMs: maxLoad,
      },
      reports: reportList,
    };
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    downloadFile(
      `device-check-${stamp}.json`,
      JSON.stringify(payload, null, 2),
      "application/json"
    );
  };

  const exportCsv = () => {
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    downloadFile(
      `device-check-${stamp}.csv`,
      buildCsv(activePath, reportList),
      "text/csv"
    );
  };

  const hasResults = reportList.length > 0;

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
              Prüft Layout, horizontalen Overflow, Scrollbarkeit und Ladezeit
              auf gängigen Viewports. Iframes laden den Pfad mit der echten App.
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
            <div className="flex flex-wrap gap-2">
              <Button onClick={apply}>Anwenden</Button>
              <Button
                variant="outline"
                onClick={() => {
                  setReports({});
                  setReloadAllKey((k) => k + 1);
                }}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Alle neu laden
              </Button>
              <Button
                variant="outline"
                onClick={exportJson}
                disabled={!hasResults}
                title="Ergebnisse als JSON herunterladen"
              >
                <Download className="w-4 h-4 mr-2" />
                JSON
              </Button>
              <Button
                variant="outline"
                onClick={exportCsv}
                disabled={!hasResults}
                title="Ergebnisse als CSV herunterladen"
              >
                <Download className="w-4 h-4 mr-2" />
                CSV
              </Button>
            </div>
          </Card>

          <Card className="p-4 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium">Ergebnis:</span>
              <Badge variant="outline">
                {reportList.length}/{DEVICES.length} geprüft
              </Badge>
              {avgLoad != null && (
                <Badge variant="outline">Ø {avgLoad} ms</Badge>
              )}
              {maxLoad != null && (
                <Badge variant="outline">max {maxLoad} ms</Badge>
              )}
              {hasResults &&
                failed.length === 0 &&
                overflowing.length === 0 && (
                  <Badge className="bg-success text-success-foreground">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Alle OK
                  </Badge>
                )}
              {overflowing.length > 0 && (
                <Badge variant="destructive">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  {overflowing.length} Overflow:{" "}
                  {overflowing.map((r) => r.device.name).join(", ")}
                </Badge>
              )}
              {failed.length > 0 && (
                <Badge variant="destructive">
                  <XCircle className="w-3 h-3 mr-1" />
                  {failed.length} Fehlgeschlagen
                </Badge>
              )}
            </div>

            {failed.length > 0 && (
              <div className="border-t border-border pt-3">
                <p className="text-xs font-medium mb-2 text-destructive">
                  Geräte mit Ladefehlern:
                </p>
                <ul className="space-y-1 text-xs">
                  {failed.map((r) => (
                    <li
                      key={r.device.name}
                      className="flex items-start gap-2"
                    >
                      <XCircle className="w-3.5 h-3.5 text-destructive flex-shrink-0 mt-0.5" />
                      <span>
                        <span className="font-medium">{r.device.name}</span>{" "}
                        ({r.device.width}×{r.device.height}) –{" "}
                        <span className="text-muted-foreground">{r.error}</span>
                        {r.loadTimeMs != null && (
                          <span className="text-muted-foreground">
                            {" "}
                            · {r.loadTimeMs} ms
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
                onReport={handleReport}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DeviceCheck;
