# CRYO-Seitenarchitektur

Die Website vom Oktober 2026 erzeugt vollständiges HTML aus gemeinsamen JavaScript-Templates. Native Browsermodule ergänzen Filter, Sprache, Navigation und Animationen. Inhalte bleiben ohne JavaScript lesbar.

`src/data/projects.js` enthält geprüfte Projektbeschreibungen, direkte Demo-Links und Bildmetadaten. Gemeinsame Projektaktionen verknüpfen Live-Projekte und Quellcode auf Projektkarten, im Explorer und in der Galerie. Der Explorer übernimmt die öffentlichen Upstream-Beschreibungen von Forks. `assets/projects/manifest.json` dokumentiert Bildquellen und Prüfsummen; der Build optimiert Projektbilder zusammen mit der separat gekennzeichneten Konzeptkunst.

## Zuständigkeiten

| Verzeichnis | Aufgabe |
| --- | --- |
| `src/components` | Seitengerüst, Medien, Symbole, Überschriften und Explorer |
| `src/pages` | Startseite, Ressourcen, Galerie, Sprachdaten und Archive |
| `src/client` | Kleine, unabhängige Browser-Interaktionen |
| `src/styles` | Designvariablen, Typografie, Layout und responsive Regeln |
| `src/data` | Redaktionelle Beschreibungen, Übersetzungen und Register |
| `src/lib` | HTML-Escaping, relative Pfade, Projektfilter und Sprachberechnungen |
| `scripts` | Build, Medienverarbeitung, Vorschau, Synchronisation und Validierung |

## Darstellung und Pfade

`npm run build` erstellt `dist/` neu, kopiert Originalressourcen, bereitet Medien vor und bündelt CSS und Browsermodule mit esbuild. Markdown-It erzeugt HTML-Versionen der Dokumente. Lokale Links führen zu lesbaren Seiten; Originaldateien und Downloads bleiben verfügbar.

Relative URLs unterstützen GitHub Pages ohne Client-Router. Mit `npm run preview -- --base /Pierreg99-Pierreg99-Profile-Page` wird der Projektpfad geprüft. Bisherige Seiten-URLs bleiben erhalten; Ressourcenverzeichnisse erhalten Einstiegsseiten.

## Datenverträge

`assets/sync/public-repositories.json` enthält ausgewählte Felder der öffentlichen GitHub-API. Beschreibungen aus `src/data/projects.js` ergänzen den Snapshot. Ausgewählte Karten erscheinen nur für weiterhin öffentliche Repositories.

Der Explorer trennt eigene Projekte und Forks. Die Sprachanteile zählen eigene Projekte einschließlich fehlender Sprachangaben. Diagramm und Startseite verwenden dieselben Daten. Die Anteile beschreiben Projekte, keine Codezeilen oder Bytes.

Die Account-Zusammenfassung übernimmt die private Gesamtanzahl aus dem Progress-Hub. Die öffentliche Abfrage liest keine privaten Datensätze. Vor dem Schreiben werden Eigentümer, Sichtbarkeit, URLs und Zahlen geprüft. Zeitstempel ändern sich nur bei geänderten Inhalten.

Historische Evaluationsdaten behalten Datum und Werte. Dashboards und Dokumentseiten kennzeichnen sie als archivierte redaktionelle Forschung.

## Medienverarbeitung

Originaldateien behalten ihre Pfade unter `assets/`. Die Pipeline erzeugt drei WebP-Größen je Standbild sowie MP4 und Poster je GIF. Der Cache berücksichtigt Quelldateien und Konfiguration. SVG-Optimierung bewahrt Metadaten zur Barrierefreiheit; ein Manifest dokumentiert Abmessungen und Dateigrößen.

Animationen laden erst nach einer Wiedergabe-Anforderung. Sie pausieren außerhalb des sichtbaren Bereichs, bei verborgenem Tab oder aktiver Bewegungsreduktion. Lokale Schriften enthalten ihre Lizenzen.

## Prüfung und Veröffentlichung

`npm run check` prüft Formatierung, Lint, Daten, Sync-Regeln, Build, Links, Medien, Schriften und Snapshot-Konsistenz. Playwright prüft den Pages-Unterpfad auf Desktop und Mobilgeräten, einschließlich Filter, Sprache, Tastaturbedienung, Animationen, Downloads und WCAG-Barrierefreiheit.

Pull Requests erhalten einen Vorschau-Build. Nach erfolgreichen Prüfungen veröffentlicht `main` den Ordner `dist/`. Geänderte öffentliche Metadaten fordern einen neuen Pages-Build an.

Neue Seiten werden aus Komponenten in `src/pages` aufgebaut und in `scripts/build.mjs` registriert. Medien werden in `src/data/assets.js` und Übersetzungen in `src/data/strings.js` eingetragen. Tests prüfen relevantes neues Verhalten.
