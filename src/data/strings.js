import { documentTranslations } from "./documents.js";

export const de = {
  ...Object.fromEntries(
    Object.entries(documentTranslations).flatMap(
      ([id, [title, description]]) => [
        [`document.${id}.title`, title],
        [`document.${id}.description`, description],
      ],
    ),
  ),
  "resource.reports.title": "Tägliche Forschungsberichte",
  "resource.reports.text":
    "Berichte, Inventare und Benchmark-Exporte vom September 2026.",
  "resource.reports.link": "Berichte ansehen",
  "resource.teams.title": "Readiness-Studie",
  "resource.teams.text":
    "Archivierte Bewertung von sechs Domänen, mit JSON und CSV.",
  "resource.teams.link": "Studie ansehen",
  "resource.tasks.title": "Aufgaben & Kalender",
  "resource.tasks.text":
    "Historische Aufgaben, Zeitschätzungen und herunterladbare Kalender.",
  "resource.tasks.link": "Aufzeichnungen öffnen",
  "gallery.motionLabel": "01 / BEWEGUNGSSTUDIEN",
  "gallery.stillsLabel": "02 / KONZEPTKUNST",
  "gallery.vectorsLabel": "03 / VEKTORSTUDIEN",
  "gallery.cryo-pulse.description":
    "Ein leuchtender Kern und konzentrische Impulse bilden die CRYO-Identität in Bewegung.",
  "gallery.cryo-orbit.description":
    "Orbitale Ringe verbinden Ideen, Technologien und Systeme.",
  "gallery.cryo-memory.description":
    "Schichten aus Eisglas, verbunden durch cyanfarbenes Licht.",
  "gallery.cryo-nexo.description":
    "Eine holografische Oberfläche mit einem leuchtenden Kern.",
  "gallery.cryo-kiblox.description":
    "Eine Polarlandschaft aus eisblauen Voxel-Blöcken.",
  "nav.work": "Arbeiten",
  "nav.projects": "Projekte",
  "nav.docs": "Ressourcen",
  "nav.connect": "Kontakt",
  "nav.skip": "Zum Inhalt springen",
  "footer.line": "Neugier wird Code. Ideen werden Erlebnisse.",
  "footer.top": "Nach oben",
  "footer.built": "Mit Sorgfalt gebaut. Öffentlich geteilt.",
  "hero.eyebrow": "DER CRYO-WORKSPACE",
  "hero.line1": "Ideen werden Code.",
  "hero.line2": "Code wird zum",
  "hero.line3": "Erlebnis.",
  "hero.intro":
    "Ich bin Pierreg99. Ich erkunde die Verbindung von KI, Software und interaktiven Welten — ein Experiment nach dem anderen.",
  "hero.work": "Arbeiten entdecken",
  "hero.source": "GitHub ansehen",
  "hero.art": "Ein wenig Neugier. Viele Möglichkeiten.",
  "snapshot.label": "ÖFFENTLICHER WORKSPACE",
  "snapshot.date": "Stand",
  "snapshot.public": "öffentliche Repositories",
  "snapshot.original": "eigene Projekte",
  "snapshot.forks": "Ökosystem-Forks",
  "work.eyebrow": "AUSGEWÄHLTE ARBEITEN",
  "work.title": "Zum Entdecken gebaut.",
  "work.description":
    "Öffentliche Projekte aus interaktiven Welten, Oberflächen und KI.",
  "work.all": "Alle Projekte",
  "work.caption":
    "Echte Projektvorschauen und Artwork aus den verlinkten Repositories. Öffne ein Projekt oder sieh dir seinen Quellcode an.",
  "work.selected": "AUSGEWÄHLTE ARBEITEN",
  "project.play": "Im Browser spielen",
  "project.explore": "Projekt öffnen",
  "project.read": "Guides lesen",
  "project.source": "Quellcode",
  "project.archived": "Archiviert",
  "preview.artwork": "Projekt-Artwork",
  "preview.screenshot": "Projekt-Screenshot",
  "preview.local": "Lokale Vorschau",
  "preview.upstream": "Upstream-Vorschau",
  "gallery.projectLabel": "PROJEKTVORSCHAUEN",
  "gallery.projects": "Ein Blick in die Projekte.",
  "gallery.projectDescription":
    "Screenshots und Artwork aus den verlinkten Projekten. Jede Vorschau nennt ihre Herkunft: Oberfläche, Repository-Artwork, lokaler Build oder Upstream-Projekt.",
  "gallery.previewSources": "Bildquellen und Aufnahmenotizen",
  "approach.eyebrow": "DER ANSATZ",
  "approach.title": "Viele Disziplinen. Ein neugieriger Kopf.",
  "approach.description":
    "Von der Logik eines Systems bis zum Erlebnis bei seiner Nutzung.",
  "approach.ai.title": "Unsichtbares nutzbar machen.",
  "approach.ai.body":
    "Agenten-Workflows, Speicher und visuelle Experimente machen komplexe KI-Ideen erfahrbar.",
  "approach.web.title": "Ideen eine Oberfläche geben.",
  "approach.web.body":
    "Durchdachte Web-Erlebnisse und experimentelle Systeme mit klarer Bedienung.",
  "approach.games.title": "Welten zum Eintauchen schaffen.",
  "approach.games.body":
    "Voxel, Browserspiele und 3D-Räume machen kreative Technologie zum Erlebnis.",
  "projects.eyebrow": "OPEN SOURCE",
  "projects.title": "Die Open-Source-Sammlung.",
  "projects.description":
    "Finde ein Projekt, folge einer Idee oder erkunde das Ökosystem.",
  "projects.caption":
    "Eigene Projekte und öffentliche Forks sind getrennt filterbar. Die Metadaten stammen aus der öffentlichen GitHub-API.",
  "domain.ai": "KI & Agenten",
  "domain.games": "Spiele & 3D",
  "domain.systems": "Systeme",
  "domain.web": "Web",
  "domain.docs": "Dokumentation",
  "domain.ecosystem": "Ökosystem-Forks",
  "filter.all": "Alle Projekte",
  "filter.reset": "Filter zurücksetzen",
  "search.label": "Projekte durchsuchen",
  "search.placeholder": "Projekte, Sprachen, Ideen suchen…",
  "scope.label": "Repository-Auswahl",
  "scope.originals": "Eigene Projekte",
  "scope.all": "Alle Repositories",
  "scope.forks": "Öffentliche Forks",
  "scope.fork": "Fork",
  "language.label": "Primäre Sprache",
  "language.all": "Alle Sprachen",
  "results.repositories": "Repositories",
  "empty.title": "Keine Projekte gefunden",
  "empty.body": "Versuche eine andere Suche oder setze die Filter zurück.",
  "resources.eyebrow": "TIEFER EINSTEIGEN",
  "resources.title": "Mehr als das fertige Ergebnis.",
  "resources.description":
    "Dokumentation, visuelle Experimente und Forschung hinter den Projekten.",
  "resource.docs.title": "Notizen & Dokumentation",
  "resource.docs.text":
    "Profile, technische Referenzen und Designnotizen. Auf Deutsch und Englisch.",
  "resource.docs.link": "Ressourcen öffnen",
  "resource.gallery.title": "Das visuelle Labor",
  "resource.gallery.text":
    "Das CRYO-System aus Bewegung, Konzeptkunst und visuellen Studien.",
  "resource.gallery.link": "Galerie entdecken",
  "resource.research.title": "Forschungsarchiv",
  "resource.research.text":
    "Historische Portfolio-Bewertungen mit Datum, Quellen und Einordnung.",
  "resource.research.link": "Archiv ansehen",
  "resource.languages.title": "Öffentliche Sprachdaten",
  "resource.languages.text":
    "Das aktuelle öffentliche Inventar und seine primären Programmiersprachen.",
  "resource.languages.link": "Daten erkunden",
  "connect.eyebrow": "IM AUSTAUSCH BLEIBEN",
  "connect.title": "Gute Dinge beginnen",
  "connect.accent": "mit einer Verbindung.",
  "connect.description":
    "Erkunde den Code, folge den Experimenten oder finde mich im Web.",
  "motion.play": "Animation starten",
  "motion.pause": "Animation pausieren",
  "motion.error":
    "Die Animation konnte nicht geladen werden. Das Standbild bleibt verfügbar.",
  "gallery.eyebrow": "CRYO / VISUELLES LABOR",
  "gallery.title": "Ein System mit eigener Seele.",
  "gallery.description":
    "Ein Blick in die Projekte und danach in die Kunst und Bewegungsstudien hinter dem CRYO-Workspace.",
  "gallery.notice":
    "Konzeptkunst und historische visuelle Studien. Jede Szene startet als Standbild; Animationen kannst du gezielt abspielen.",
  "gallery.motion": "Von der Ruhe zur Bewegung.",
  "gallery.stills": "Bilder aus dem Workspace.",
  "gallery.vectors": "Struktur wird sichtbar.",
  "gallery.archive":
    "Die Identitätsgrafiken sind aktuell. Weitere Studien bewahren ihren Kontext vom September 2026 mit historischen Zahlen und redaktionellen Bewertungen.",
  "gallery.original": "Original-GIF",
  "languages.eyebrow": "CRYO / ÖFFENTLICHE SPRACHDATEN",
  "languages.title": "Die Sprachen hinter den Ideen.",
  "languages.description":
    "Ein transparenter Blick auf die öffentliche Sammlung — eigene Projekte und Ökosystem-Forks.",
  "languages.method":
    "Die Anteile zeigen eigene öffentliche Projekte nach der von GitHub gemeldeten primären Sprache, einschließlich fehlender Sprachangaben. Es sind Projektanteile, keine Codezeilen-Anteile. Forks sind im Diagramm ausgeschlossen.",
  "languages.download": "Öffentlichen Snapshot herunterladen",
  "languages.source":
    "Ein öffentliches Inventar versorgt Portfolio, Explorer und Sprachdiagramm. Fehlende Sprachangaben bleiben sichtbar; private Repository-Namen werden nie veröffentlicht.",
  "docs.eyebrow": "CRYO / WISSEN & RESSOURCEN",
  "docs.title": "Die Gedanken hinter dem Bauen.",
  "docs.description":
    "Technische Notizen, visuelle Experimente und ein zweisprachiges Forschungsarchiv an einem Ort.",
  "docs.library": "Die Dokumentbibliothek.",
  "docs.libraryDescription":
    "Englische und deutsche Dokumente öffnen als eigenständige, lesbare Seiten. Forschungsberichte behalten ihr ursprüngliches Datum.",
  "docs.archive": "Den Kontext bewahren.",
  "research.eyebrow": "CRYO / FORSCHUNGSARCHIV",
  "research.title": "Ein Blick auf frühere Arbeit.",
  "research.description":
    "Die ursprünglichen Portfolio-Benchmarks, mit ihrer Methodik und ihrem historischen Kontext.",
  "research.notice":
    "Historischer Snapshot vom 7. September 2026. Die Werte sind redaktionelle Portfolio-Bewertungen, keine aktuelle Messung und keine unabhängige Zertifizierung.",
  "research.dimensions": "Benchmark-Dimensionen",
  "research.dimension": "Dimension",
  "research.reference": "Referenzwert",
  "research.source": "Quelle und Methodik",
  "research.profile": "Portfolio-Referenz",
  "research.junior": "Junior-Referenz",
  "research.mid": "Mid-Referenz",
  "research.senior": "Senior-Referenz",
  "research.score": "Historischer Wert / 100",
  "teams.eyebrow": "CRYO / HISTORISCHE READINESS-STUDIE",
  "teams.title": "Ein Archiv der Bewertungsdimensionen.",
  "teams.description":
    "Sechs ursprüngliche Domänenbewertungen, jetzt als einheitliches, lesbares Dashboard.",
  "teams.notice":
    "Snapshot vom 6. September 2026 aus dem gespeicherten Evaluationsdatensatz. Die Werte beschreiben redaktionelle Repository-Readiness, keine Personenbewertung und keinen IQ-Wert.",
  "teams.average": "Domänendurchschnitt",
  "teams.grade": "Gesamtnote",
  "teams.count": "Bewertete Domänen",
  "teams.range": "Wertebereich",
  "teams.table": "Ursprüngliche Readiness-Bewertungen",
  "teams.domain": "Domäne",
  "teams.score": "Wert",
  "teams.note": "Note",
  "teams.rating": "Einordnung",
  "teams.downloadJSON": "JSON herunterladen",
  "teams.downloadCSV": "CSV herunterladen",
  "grade.excellent": "Sehr gut",
  "grade.good": "Gut",
  "grade.satisfactory": "Befriedigend",
  "grade.pass": "Ausreichend",
  "grade.improve": "Verbesserungsbedarf",
  "reports.eyebrow": "CRYO / TÄGLICHES FORSCHUNGSARCHIV",
  "reports.title": "Die Aufzeichnungen hinter den Zahlen.",
  "reports.description":
    "Der Originalbericht vom September 2026 und die zugehörigen Datenexporte.",
};

export function translate(key, locale, fallback = key) {
  return locale === "de" ? (de[key] ?? fallback) : fallback;
}
