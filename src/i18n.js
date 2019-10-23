import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

let resources = {
  en: {
    common: {
      "background": "Background",
      "overlay": "Maps displayed",
      "newBorehole": "New borehole",
      "borehole": "borehole",
      "boreholes": "boreholes",
      "saving": "saving",
      "submit": "Submit",
      "you": "you",
      "title": "BMS",
      "start": "This page is in English.",
      'yes': 'Yes',
      'no': 'No',
      'np': 'Unknown',
      'username': 'Username',
      'creator': 'Created by',
      'creation_date': 'Creation date',
      'updateDate': 'Update date',
      'delete': 'delete',
      'sure': 'Are you sure?',
      'reset': 'reset',
      'done': 'Done',
      'from': 'from',
      'to': 'to',
      'meter': 'meter',
      'degree': 'degree',
      'result': 'result',
      'results': 'results',
      'refresh': 'refresh',
      'expand': 'expand',
      'collapse': 'collapse',
      'clickLayer': 'Click on a layer for details',
      'filterByName': 'Filter by name',
      'filterByHierarchicalUnits': 'Filter by hierarchical units'
    },
    error: {
      'E-900': 'Borehole locked by {{user}}',
      'errorGap': 'Non continuos data found',
      'errorGapSolution1': 'Fill gap with "undefined" layer',
      'errorGapSolution2': 'Replace upper layer base with top from lower layer',
      'errorGapSolution3': 'Replace lower layer top with 0 meters',
      'errorGapSolution4': 'Replace lower layer top with base from upper layer',
      'wrongDepth': 'Wrong depth',
      'wrongDepthSolution1': (
        'Last layer depth (={{lDepth}}) not equals to ' +
        'total borehole depth {{bDepth}}'
      ),
      'missingBedrock': 'Missing bedrock',
      'missingBedrockSolution': (
        'Add the Bedrock automatically from data filled into the ' +
        'Borehole page.'
      ),
      'missingLayer': 'Missing layers',
      'missingLayerSolution': (
        'Please fill the space between the surface and the bedrock ' + 
        '(below) adding new layers'
      ),
      'errorOverlap': 'Overlapping layers',
      'errorStartWrong': 'First layer not starting from the surface',
    },
    header: {
      'explore': 'Explore',
      'borehole': 'Borehole editor',
      'check': 'Pending',
      'validation': 'Publish',
      'settings': 'Settings',
      'language': 'Language',
      'view_preferences': 'View',
      'user_preferences': 'User preferences',
      'hide_map': 'Hide map'
    },
    home: {
      'legend': 'Map legend',
      'attribute_filter': 'Filter',
      'spatial_filter': 'Spatial filter',
      'back_to_list': 'back to list'
    },
    editor: {
      'title': 'Project',
      'title2': 'Boreholes',
      'search': 'Search project',
      'project_name': 'Project name',
      'create_new': 'Create new project',
      'create': 'Create',
      'editingEnabled': 'Editing started',
      'locked_by': 'Change in progress by',
      'locked_at': 'Locked at',
      'locked_status': 'Status'
    },
    borehole_form: {
      'editingStart': 'Start editing',
      'editingStop': 'Stop editing',
      'completness': 'Completness',
      'creation': 'Creation date',
      'author': 'Author',
      'mainStratigraphy': 'This is the main stratigraphy',
      'meta_location': 'Location',
      'meta_borehole': 'Borehole',
      'form_admin': 'Admin',
      'meta_stratigraphy': 'Stratigraphy',
      'loading_fetch': 'Loading an existing borehole..',
      'creation_fetch': 'Preparing a new borehole..',
      'duplicate': 'Duplicated value: assign a new value.',
      'date_format': 'dd.mm.yyyy',
      'original_name': 'Original name',
      'public_name': 'Public name',
      'kind': 'Drilling type',
      'project_name': 'Project name',
      'restriction': 'Restriction',
      'restriction_until': 'Restriction date',
      'coordinates': 'Coordinates',
      'location_x': 'Coordinate East',
      'location_y': 'Coordinate North',
      'srs': 'SRS',
      'qt_location': 'CQ Coordinates',
      'elevation_z': 'Elevation (masl)',
      'hrs': 'HRS',
      'qt_elevation': 'CQ Elevation Z',
      'country': 'Country',
      'canton': 'Canton',
      'city': 'City',
      'address': 'Address',
      'landuse': 'Land use',
      'method': 'Drilling method',
      'drilling_date': 'Drill end date',
      'cuttings': 'Cuttings',
      'purpose': 'Purpose',
      'drill_diameter': 'Drill diameter (m)',
      'status': 'Status of borehole',
      'bore_inc': 'Inclination (°)',
      'bore_inc_dir': 'Inclination direction (°)',
      'qt_bore_inc_dir': 'QC Inclin. / Direction',
      'length': 'Total depth (m)',
      'qt_length': 'QC depth',
      'top_bedrock': 'Top bedrock',
      'qt_top_bedrock': 'QC top bedrock',
      'groundwater': 'Groundwater',
      'yes': 'Yes',
      'no': 'No',
      'lit_pet_top_bedrock': 'Lit/Pet Top bedrock',
      'lit_str_top_bedrock': 'Litstrati top bedrock',
      'chro_str_top_bedrock': 'Chronostrati top bedrock',
      'processing_status': 'Processing status',
      'national_relevance': 'Nationale relevance',
      'attributes_to_edit': 'Attributes to edit',
      'mistakes': 'Mistakes',
      'remarks': 'Remarks',
      'stratigraphy_name': 'Name / Version'
    },
    layer_form: {
      'layers': 'Layers',
      'loading_fetch': 'Loading an existing layer..',
      'creation_fetch': 'Preparing a new layer..',
      'depth': 'Depth',
      'depth_from': 'Top MD (m)',
      'depth_to': 'Base MD (m)',
      'description': 'Layer description',
      'geology': 'Geology description',
      'last': 'End of borehole',
      'qt_description': 'QC description',
      'lithology': 'Lithology / Petrology',
      'lithostratigraphy': 'Litho-stratigraphy',
      'chronostratigraphy': 'Chrono-stratigraphie',
      'tectonic_unit': 'Tectonic Unit',
      'symbol': 'Symbol',
      'color': 'Color',
      'plasticity': 'Plasticity',
      'humidity': 'Humidity',
      'consistance': 'Consistance',
      'alteration': 'Alteration',
      'compactness': 'Compactness',
      'jointing': 'Jointing',
      'soil_state': 'Soil state',
      'organic_component': 'Organic components',
      'striae': 'Striae',
      'grain_size_1': 'Grain size 1',
      'grain_size_2': 'Grain size 2',
      'grain_shape': 'Grain shape',
      'grain_granularity': 'Grain angularity',
      'cohesion': 'Cohesion',
      'further_properties': 'Further properties',
      'uscs_1': 'USCS 1',
      'uscs_2': 'USCS 2',
      'uscs_3': 'USCS 3',
      'uscs_original': 'USCS original',
      'uscs_determination': 'USCS determination',
      'unconrocks': 'Classe de sol (KT GE)',
      'debris': 'Debris',
      'lit_pet_deb': 'Litho/Petro debris',
      'lithok': 'Lithok',
      'kirost': 'Kirost',
      'notes': 'Notes',
    },
    search: {
      'reset': 'reset',
      'identifier': 'Identifier',
      'last_update': 'Last update',
      'creation': 'Creation date',
      'completness': 'Filter by completness',
      'all': 'All',
      'complete': 'Completed',
      'incomplete': 'Incompleted',
      'empty': 'Empty'
    },
    grid: {
      'legend': 'Map legend',
      'attribute_filter': 'Filter',
      'spatial_filter': 'Spatial filter'
    },
    version: {
      '0': 'Completed',
      'EDIT': 'Change in progress',
      'CONTROL': 'Technical check',
      'VALID':'Validation',
      'PUBLIC': 'Pubblic'
    }
  },
  de: {
    common: {
      "background": "Hintergrund",
      "overlay": "Dargestellte Karten",
      "newBorehole": "Neue borehole",
      "borehole": "borehole",
      "boreholes": "bohrung",
      "saving": "sparen",
      "submit": "Einreichen",
      "you": "dir",
      "title": "BMS",
      "start": "Diese Seite ist auf deutsch.",
      'yes': 'Ja',
      'no': 'Nein',
      'np': 'Keine Angabe',
      'username': 'Benutzername',
      'creator': 'Erstellt von',
      'creation_date': 'Erstellungsdatum',
      'updateDate': 'Update date',
      'delete': 'Eliminieren',
      'sure': 'Sicher?',
      'reset': 'Zurücksetzen',
      'done': 'Ok',
      'from': 'von',
      'to': 'zu',
      'meter': 'meter',
      'degree': 'grad',
      'result': 'ergebnis',
      'results': 'ergebnisse',
      'refresh': 'aufladen',
      'expand': 'erweitern',
      'collapse': 'zusammenbruch',
      'clickLayer': 'Klicken Sie für Informationen',
      'filterByName': 'Filter by name',
      'filterByHierarchicalUnits': 'Filter by hierarchical units'
    },
    error: {
      'E-900': `Borehole locked by {{user}}`,
      'howToResolve': 'How to resolve this issue?',
      'errorGap': 'Non continuos data found',
      'errorGapSolution1': 'Fill gap with "undefined" layer',
      'errorGapSolution2': 'Replace upper layer base with top from lower layer',
      'errorGapSolution3': 'Replace lower layer top with 0 meters',
      'errorGapSolution4': 'Replace lower layer top with base from upper layer',
      'wrongDepth': 'Wrong depth',
      'wrongDepthSolution1': (
        'Last layer depth ({{lDepth}}m) not equals to ' +
        'total borehole depth ({{bDepth}}m)'
      ),
      'missingBedrock': 'Missing bedrock',
      'missingBedrockSolution': (
        'Add the Bedrock automatically from data filled into the ' +
        'Borehole page.'
      ),
      'missingLayer': 'Missing layers',
      'missingLayerSolution': (
        'Please fill the space between the surface and the bedrock (below)'
      ),
      'errorOverlap': 'Overlapping layers',
      'errorStartWrong': 'First layer not starting from the surface',
    },
    header: {
      'explore': 'Durchsuchen',
      'borehole': 'Bohrloch Editor',
      'check': 'In Bearbeitung',
      'validation': 'Validieren',
      'settings': 'Einstellungen',
      'language': 'Sprache',
      'view_preferences': 'Ansicht',
      'user_preferences': 'Benutzereinstellungen',
      'hide_map': 'Karte ausblenden'
    },
    home: {
      'legend': 'Legende',
      'attribute_filter': 'Filter',
      'spatial_filter': 'Räumlicher Filter',
      'back_to_list': 'Zurück zur Liste'
    },
    editor: {
      'title': 'Projekt',
      'title2': 'Bohrlöcher',
      'search': 'Suche Projekt',
      'project_name': 'Projektname',
      'create_new': 'Neues Projekt erstellen',
      'create': 'Erstellen',
      'editingEnabled': 'Die Bearbeitung hat begonnen',
      'locked_by': 'Änderung in Bearbeitung von',
      'locked_at': 'Gesperrt am',
      'locked_status': 'Zustand'
    },
    borehole_form: {
      'editingStart': 'Beginnen Bearbeitung',
      'editingStop': 'Beenden Bearbeitung',
      'completness': 'Vollständigkeit',
      'creation': 'Erstellungsdatum',
      'author': 'Autor',
      'mainStratigraphy': 'Dies ist die Hauptstratigraphie',
      'meta_location': 'Standort',
      'meta_borehole': 'Bohrloch',
      'form_admin': 'Admin',
      'meta_stratigraphy': 'Stratigrafie',
      'loading_fetch': 'Lade Bohrloch..',
      'creation_fetch': 'Vorbereitung neues Bohrloch..',
      'duplicate': 'Doppelter Wert: neuen Wert setzen.',
      'date_format': 'tt.mm.yyyy',
      'original_name': 'Originalname',
      'public_name': 'Öffentlicher Name',
      'kind': 'Bohrtyp',
      'project_name': 'Projektname',
      'restriction': 'Restriktion',
      'restriction_until': 'Restriktion Datum',
      'coordinates': 'Koordinaten',
      'location_x': 'Koordinate O',
      'location_y': 'Koordinate N',
      'srs': 'SRS',
      'qt_location': 'CQ Koordinaten',
      'elevation_z': 'Ansatzhöhe (müM)',
      'hrs': 'HRS',
      'qt_elevation': 'QC Ansatz Z',
      'country': 'Land',
      'canton': 'Kanton',
      'city': 'Gemeinde',
      'address': 'Addresse',
      'landuse': 'Landnutzung',
      'method': 'Bohrmethode',
      'drilling_date': 'Bohrende Datum',
      'cuttings': 'Schnitt',
      'purpose': 'Bohrzweck',
      'drill_diameter': 'Bohrdurchmesser (m)',
      'status': 'Status Bohrloch',
      'bore_inc': 'Inklination (°)',
      'bore_inc_dir': 'Einfallsrichtung (°)',
      'qt_bore_inc_dir': 'QC Inc. / Richtung',
      'length': 'Gesamttiefe (m)',
      'qt_length': 'QC Tiefe',
      'top_bedrock': 'Top Fels',
      'qt_top_bedrock': 'QC Top Fels',
      'groundwater': 'Grundwasser',
      'yes': 'Ja',
      'no': 'Nein',
      'lit_pet_top_bedrock': 'Lit/Pet Top Fels',
      'lit_str_top_bedrock': 'Litstrati Top Fels',
      'chro_str_top_bedrock': 'Chronostrati Top Fels',
      'processing_status': 'Prozesstatus',
      'national_relevance': 'Nationale Relevanz',
      'attributes_to_edit': 'Attributes zu bearbeiten',
      'mistakes': 'Fehler',
      'remarks': 'Bemerkungen',
      'stratigraphy_name': 'Name / Version'
    },
    layer_form: {
      'loading_fetch': 'Lade Schicht..',
      'creation_fetch': 'Bereite neue Schicht vor..',
      'depth': 'Bohrendtiefe',
      'depth_from': 'Top MD (m)',
      'depth_to': 'Base MD (m)',
      'description': 'Schichtbeschreibung',
      'geology': 'Geologiebeschreibung',
      'last': 'Bohrloch Ende',
      'qt_description': 'QC Beschreibung',
      'lithology': 'Lithologie / Petrologie',
      'lithostratigraphy': 'Lithostratigrafie',
      'chronostratigraphy': 'Chronostratigrafie',
      'tectonic_unit': 'Tektonische Einheit',
      'symbol': 'Symbol',
      'color': 'Farbe',
      'plasticity': 'Plastizität',
      'humidity': 'Feuchtigkeit',
      'consistance': 'Konsistenz',
      'alteration': 'Alteration',
      'compactness': 'Lagerungsdichte',
      'jointing': 'Verbindung',
      'soil_state': 'Zustand',
      'organic_component': 'Organische Komponenten',
      'striae': 'Striemung',
      'grain_size_1': 'Korngrösse 1',
      'grain_size_2': 'Korngrösse 2',
      'grain_shape': 'Kornform',
      'grain_granularity': 'Kornrundung',
      'cohesion': 'Kohäsion',
      'further_properties': 'Weitere Eigenschaften',
      'uscs_1': 'USCS 1',
      'uscs_2': 'USCS 2',
      'uscs_3': 'USCS 3',
      'uscs_original': 'USCS Original',
      'uscs_determination': 'USCS Bestimmung',
      'unconrocks': 'Classe de sol (KT GE)',
      'debris': 'Grobbestandteile',
      'lit_pet_deb': 'Litho/Petro Grobbestandteile',
      'lithok': 'Lithok',
      'kirost': 'Kirost',
      'notes': 'Bemerkungen',
    },
    search: {
      'reset': 'Zurücksetzen',
      'identifier': 'Kennung',
      'last_update': 'Last update',
      'creation': 'Erstellungsdatum',
      'completness': 'Filter auf Vollständigkeit',
      'all': 'Alle',
      'complete': 'Vollständig',
      'incomplete': 'Unvollständig',
      'empty': 'Leer'
    },
    grid: {
      'legend': 'Legende',
      'attribute_filter': 'Filter',
      'spatial_filter': 'Räumlicher Filter'
    },
    version: {
      '0': 'Fertiggestellt',
      'EDIT': 'Änderung in Bearbeitung',
      'CONTROL':'Technische Prüfung',
      'VALID': 'Bestätigung',
      'PUBLIC': 'Öffentlichkeit'
    }
  },
  it: {
    common: {
      "background": "Sfondo",
      "overlay": "Mappe visualizzate",
      "newBorehole": "Nuova perforazione",
      "borehole": "perforazione",
      "boreholes": "perforazioni",
      "saving": "salvataggio",
      "submit": "Applica",
      "you": "te",
      "title": "BMS",
      "start": "Questa pagina è in Italiano",
      'yes': 'Sì',
      'no': 'No',
      'np': 'Sconosciuto',
      'username': 'Nome utente',
      'creator': 'Creato da',
      'creation_date': 'Data di creazione',
      'updateDate': 'Data di aggiornamento',
      'delete': 'Elimina',
      'sure': 'Sei sicuro?',
      'reset': 'azzerare',
      'done': 'Fatto',
      'from': 'da',
      'to': 'a',
      'meter': 'metri',
      'degree': 'gradi',
      'result': 'risultato',
      'results': 'risultati',
      'refresh': 'ricarica',
      'expand': 'espandere',
      'collapse': 'collassare',
      'clickLayer': 'Clic su un layer per le informazioni',
      'filterByName': 'Filtra per nome',
      'filterByHierarchicalUnits': 'Filtra per unità (gerarchicamente)'
    },
    error: {
      'E-900': 'Modifica in corso da parte di "{{user}}"',
      'howToResolve': 'Come risolvere questo problema?',
      'errorGap': 'Sequenza layers non continua',
      'errorGapSolution1': 'Riempi il vuoto con un layer di tipo indefinito',
      'errorGapSolution2': (
        'Sostituisci la base del layer superiore con la ' + 
        'cima del layer inferiore'
      ),
      'errorGapSolution3': 'Sostituisci la cima del layer inferiore con 0m',
      'errorGapSolution4': (
        'Sostituisci la cima del layer inferiore con la base ' + 
        'del layer superiore'
      ),
      'wrongDepth': 'Profondità errata',
      'wrongDepthSolution1': (
        'La profondità dell\'ultimo layer ({{lDepth}}m) non coincide con ' +
        'quanto dichiarato nei metadati sul sondaggio ({{bDepth}}m)'
      ),
      'missingBedrock': 'Bedrock mancante',
      'missingBedrockSolution': (
        'Crea automaticamente il bedrock attingendo dai dati inseriti ' +
        'nella pagina del sondaggio.'
      ),
      'missingLayer': 'Layers mancanti',
      'missingLayerSolution': (
        'Per favore riempire lo spazio tra la superficie e il bedrock ' + 
        'aggiungendo nuovi layers'
      ),
      'errorOverlap': 'Sovrapposizione layers',
      'errorStartWrong': 'Il primo layer non inizia dalla superficie'
    },
    header: {
      'explore': 'Esplora',
      'borehole': 'Editor sondaggi',
      'check': 'Pendenze',
      'validation': 'Pubblicazione',
      'settings': 'Impostazioni',
      'language': 'Lingua',
      'view_preferences': 'Visualizzazione',
      'user_preferences': 'Preferenze utente',
      'hide_map': 'Nascondi la mappa'
    },
    home: {
      'legend': 'Legenda mappa',
      'attribute_filter': 'Filtri',
      'spatial_filter': 'Filtri spaziali',
      'back_to_list': 'Torna alla lista'
    },
    editor: {
      'title': 'Progetti',
      'title2': 'Sondaggi',
      'project_name': 'Nome progetto',
      'search': 'Ricerca progetto',
      'create_new': 'Crea nuovo',
      'create': 'Crea',
      'editingEnabled': 'Modifica avviata',
      'locked_by': 'Modifiche in corso da parte di',
      'locked_at': 'Bloccato il',
      'locked_status': 'Stato'
    },
    borehole_form: {
      'editingStart': 'Inizia modifica',
      'editingStop': 'Interrompi modifica',
      'completness': 'Completezza',
      'creation': 'Data di creazione',
      'author': 'Author',
      'mainStratigraphy': 'Questa è la stratigrafia principale',
      'meta_location': 'Posizione',
      'meta_borehole': 'Sondaggio',
      'form_admin': 'Amministrativo',
      'meta_stratigraphy': 'Startigrafia',
      'loading_fetch': 'Caricamento di un sondaggio esistente..',
      'creation_fetch': 'Preparazione di un nuovo sondaggio..',
      'duplicate': 'Valore duplicato: assegnare un altro valore.',
      'date_format': 'gg.mm.aaaa',
      'original_name': 'Nome originario',
      'public_name': 'Nome pubblico',
      'kind': 'Tipologia di perforazione',
      'project_name': 'Nome progetto',
      'restriction': 'Restrizione',
      'restriction_until': 'Data restrizione',
      'coordinates': 'Coordinate',
      'location_x': 'Coordinata Est',
      'location_y': 'Coordinata Nord',
      'srs': 'SRS',
      'qt_location': 'Qualità coordinate',
      'elevation_z': 'Altitudine (msl)',
      'hrs': 'HRS',
      'qt_elevation': 'Qualità elevazione',
      'country': 'Paese',
      'canton': 'Cantone',
      'city': 'Città',
      'address': 'Indirizzo',
      'landuse': 'Uso del suolo',
      'method': 'Metodologia di perforazione',
      'drilling_date': 'Data fine perforazione',
      'cuttings': 'Taglio',
      'purpose': 'Scopo',
      'drill_diameter': 'Diametro perforazione (m)',
      'status': 'Stato del sondaggio',
      'bore_inc': 'Inclinazione (°)',
      'bore_inc_dir': 'Direzione inclinazione (°)',
      'qt_bore_inc_dir': 'Qualità Inclin. / Direz.',
      'length': 'Profondità totale (m)',
      'qt_length': 'Qualità profondità',
      'top_bedrock': 'Top substrato',
      'qt_top_bedrock': 'QC top substrato',
      'groundwater': 'Groundwater',
      'yes': 'Sì',
      'no': 'No',
      'lit_pet_top_bedrock': 'Lit/Pet Top substrato',
      'lit_str_top_bedrock': 'Litstrati top substrato',
      'chro_str_top_bedrock': 'Chronostrati top substrato',
      'processing_status': 'Stato del processamento',
      'national_relevance': 'Rilevanza nazionale',
      'attributes_to_edit': 'Attributi da modificare',
      'mistakes': 'Errori',
      'remarks': 'Osservazioni',
      'stratigraphy_name': 'Nome / Versione'
    },
    layer_form: {
      'layers': 'Livelli',
      'loading_fetch': 'Caricamento livelli in corso..',
      'creation_fetch': 'Creazione di un nuovo livello..',
      'depth': 'Profondità',
      'depth_from': 'Top MD (m)',
      'depth_to': 'Base MD (m)',
      'description': 'Descrizione livello',
      'geology': 'Descrizione geologia',
      'last': 'Fine del sondaggio',
      'qt_description': 'Qualità descrizione',
      'lithology': 'Litologia / Petrologia',
      'lithostratigraphy': 'Litho-stratigrafia',
      'chronostratigraphy': 'Chrono-stratigrafia',
      'tectonic_unit': 'Unità tettoniche',
      'symbol': 'Simbolo',
      'color': 'Colore',
      'plasticity': 'Plasticità',
      'humidity': 'Umidità',
      'consistance': 'Consistenza',
      'alteration': 'Alterazione',
      'compactness': 'Compattezza',
      'jointing': 'Connessione',
      'soil_state': 'Stato del suolo',
      'organic_component': 'Componenti organici',
      'striae': 'Striae',
      'grain_size_1': 'Grandezza grano 1',
      'grain_size_2': 'Grandezza grano 2',
      'grain_shape': 'Forma del grano',
      'grain_granularity': 'Angolosità del grano',
      'cohesion': 'Coesione',
      'further_properties': 'Altri parametri',
      'uscs_1': 'USCS 1',
      'uscs_2': 'USCS 2',
      'uscs_3': 'USCS 3',
      'uscs_original': 'USCS originale',
      'uscs_determination': 'USCS determinazione',
      'unconrocks': 'Classe del suolo (KT GE)',
      'debris': 'Debris',
      'lit_pet_deb': 'Litho/Petro debris',
      'lithok': 'Litho',
      'kirost': 'Kiros',
      'notes': 'Appunti',
    },
    search: {
      'reset': 'azzera',
      'identifier': 'Codice di identificazione',
      'last_update': 'Ultima modifica',
      'creation': 'Data di creazione',
      'completness': 'Filtra per complettezza',
      'all': 'Tutti',
      'complete': 'Completati',
      'incomplete': 'Incompleti',
      'empty': 'Vuoti'
    },
    grid: {
      'legend': 'Map legend',
      'attribute_filter': 'Filtro',
      'spatial_filter': 'Filtro spaziale'
    },
    version: {
      '0': 'Completato',
      'EDIT': 'Modifica',
      'CONTROL': 'Controllo tecnico',
      'VALID': 'Validazione',
      'PUBLIC': 'Pubblico'
    }
  }
};

i18n
  .use(LanguageDetector)
  .init({
    // we init with resources
    resources: resources,
    // lng: 'en',
    // fallbackLng: 'en',
    fallbackLng: {
      'en': ['en-US'],
      'default': ['en']
    },
    whitelist: ['en', 'it', 'de', 'fr'],

    // have a common namespace used around the full app
    // ns: ['common', 'header', 'menu'],
    defaultNS: 'common',

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ','
    },

    react: {
      wait: true
    }
  });

export default i18n;
