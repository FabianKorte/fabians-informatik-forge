import type { LearnModule } from "@/types/learn";
import { webentwicklungContent } from "./learn/webentwicklung";
import { projektmanagementContent } from "./learn/projektmanagement";
import { qualitaetsmanagementContent } from "./learn/qualitaetsmanagement";
import { betriebswirtschaftContent } from "./learn/betriebswirtschaft";
import { rechtlicheGrundlagenContent } from "./learn/rechtliche-grundlagen";
import { kommunikationContent } from "./learn/kommunikation";
import { englischItContent } from "./learn/englisch-it";
import { mathematikLogikContent } from "./learn/mathematik-logik";
import { innovationTrendsContent } from "./learn/innovation-trends";
import { wisoContent } from "./learn/wiso";
import { datenbankenModules } from "./learn/datenbanken";
import { systemadministrationModules } from "./learn/systemadministration";
import { mobileEntwicklungContent } from "./learn/mobile-entwicklung";
import { grundlagenItContent } from "./learn/grundlagen-it";
import { itSicherheitAdvancedContent } from "./learn/it-sicherheit-advanced";
import { tabellenkalkulationContent } from "./learn/tabellenkalkulation";
import { fachrechnenContent } from "./learn/fachrechnen";
import { cloudAwsContent } from "./learn/cloud-aws";
import { digitaltechnikContent } from "./learn/digitaltechnik";
import { systemintegrationVertiefungContent } from "./learn/systemintegration-vertiefung";
import { speicherloesungenContent } from "./learn/speicherloesungen";
import { praesentationsprogrammeModules } from "./learn/praesentationsprogramme";
import { textverarbeitungModules } from "./learn/textverarbeitung";
import { sapErpContent } from "./learn/sap-erp";
import { datenschutzErweitertContent } from "./learn/datenschutz-erweitert";
import { netzwerktechnikErweitertContent } from "./learn/netzwerktechnik-erweitert";
import { anwendungsentwicklungErweitertContent } from "./learn/anwendungsentwicklung-erweitert";

// Main learning content mapped to category IDs from the database
export const learnContent: Record<string, LearnModule[]> = {
  "web-technologien": webentwicklungContent,
  projektmanagement: projektmanagementContent,
  qualitaetsmanagement: qualitaetsmanagementContent,
  bwl: betriebswirtschaftContent,
  "rechtliche-grundlagen": rechtlicheGrundlagenContent,
  kommunikation: kommunikationContent,
  wiso: wisoContent,
  datenbanken: datenbankenModules,
  systemadministration: systemadministrationModules,
  "mobile-entwicklung": mobileEntwicklungContent,
  "grundlagen-it": grundlagenItContent,
  "it-sicherheit": itSicherheitAdvancedContent,
  netzwerktechnik: netzwerktechnikErweitertContent,
  datenschutz: datenschutzErweitertContent,
  "fachmodul-systemintegration": systemintegrationVertiefungContent,
  "fachmodul-anwendungsentwicklung": anwendungsentwicklungErweitertContent,
  // Spezielle Kategorien:
  // - programmierung: Weiterleitungs-Kategorie zu Java, Web-Tech etc.
  // - zufallstraining: Wählt zufällig eine Kategorie mit Inhalt
  programmierung: [],
  zufallstraining: [],
  "englisch-it": englischItContent,
  "mathematik-logik": mathematikLogikContent,
  "innovation-trends": innovationTrendsContent,
  tabellenkalkulation: tabellenkalkulationContent,
  fachrechnen: fachrechnenContent,
  "cloud-aws": cloudAwsContent,
  digitaltechnik: digitaltechnikContent,
  speicherloesungen: speicherloesungenContent,
  praesentationsprogramme: praesentationsprogrammeModules,
  textverarbeitung: textverarbeitungModules,
  "sap-erp": sapErpContent,
};
