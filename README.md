# Build-Week-2
## Spotify Clone

Il progetto prevede di ricreare diverse pagine dell'applicazione Spotify. Tutte le pagine dovranno avere un player funzionante e dovranno popolarsi andando a recuperare i dati dall'API.


#### Struttura del progetto

- Pagina Principale
- Pagina Artisti
- Pagina Cerca
- Pagina Album

#### Elementi comuni

In ogni pagina è presente una Navbar laterale, popolata dinamicamente tramite API, che porta ai rispettivi artisti e/o album. Vi è presente una seconda Navbar, statica, che si ripete per tutte e quattro le pagine. Presente un footer che si ripresenta in tutte le pagine. C'è anche un Player Audio presente in tutte le pagine.
Responsività: L'applicazione è progettata per adattarsi a diverse dimensioni di schermo, consentendo un'esperienza utente ottimale su dispositivi desktop e mobile.

#### Tecnologie utilizzate

- ### HTML
- ### CSS
- ### Javascript
- ### Bootstrap
- ### API (L'API Deezer potrebbe subire modifiche o interruzioni nel tempo, il che potrebbe influenzare il funzionamento dell'applicazione.)

### 1) Pagina Principale
Struttura della pagina

Il contenuto principale della pagina viene diviso in due colonne:
- Colonna sinistra: Contiene una barra laterale verticale con opzioni di navigazione come "Home", "Cerca" e "La tua libreria".
- Colonna destra: Contiene il contenuto principale, inclusi i controlli per la riproduzione della musica e le sezioni per le playlist personalizzate e le canzoni più popolari.
  
Script JavaScript: Fornisce funzionalità dinamiche alla pagina, come la gestione degli eventi dei controlli di riproduzione della musica.

#### Funzionalità Javascript

Inizializzazione: 
L'evento load viene utilizzato per avviare l'inizializzazione dello script. Una volta caricata la pagina, vengono eseguite le funzioni init() per caricare gli album e le mini card, nonché la barra laterale con le card associate agli album.

Variabili: 
Il codice utilizza diverse variabili per memorizzare gli ID degli album, le informazioni sugli album caricati, nonché gli URL delle API di Deezer e le opzioni di richiesta per l'autenticazione.

Sono presenti varie funzioni principali:
- Esplorazione di album: Gli utenti possono sfogliare una varietà di album musicali.
- Riproduzione di tracce: Le tracce possono essere riprodotte direttamente dall'applicazione.
- Visualizzazione dettagli album: Gli utenti possono visualizzare dettagli su un album specifico, inclusi titolo, artista e copertina.
- Navigazione tra tracce: Gli utenti possono passare alla traccia successiva o precedente nell'album corrente.
- Controllo del volume: È possibile regolare il volume dell'audio durante la riproduzione. 

Lo script utilizza le API di Deezer per caricare le informazioni sugli album e riprodurre le tracce audio associate.

### 2) Pagina Cerca 

La pagina cerca serve a cercare direttamente l'artista che si vuole andare ad ascoltare. Se la ricerca andrà a buon fine apparirà a schermo la pagina del rispettivo artista con le varie canzoni più ascoltate.


Javascript:

Sono presenti varie funzioni principali:

- L'array albums5 contiene una lista di ID degli album musicali su Deezer.
  
- Quando la pagina web viene caricata, lo script recupera le informazioni sugli album specificati nell'array albums5 utilizzando l'API di Deezer.

-  Le informazioni sugli album verranno visualizzate nella sezione della barra di navigazione della pagina web.

-  Gli utenti possono fare clic su ciascun album per visualizzare ulteriori dettagli o interagire con essi.

-  È possibile utilizzare il campo di ricerca per cercare artisti specifici. Quando viene premuto il pulsante "Cerca", l'utente verrà reindirizzato a una nuova pagina con il nome dell'artista inserito come parametro nella query string.

-  Gli utenti possono riprodurre le tracce audio degli album. 

-  È possibile passare alla traccia successiva o precedente utilizzando i pulsanti corrispondenti.

-  È presente un regolatore del volume che consente agli utenti di regolare il volume dell'audio riprodotto.


### 3) Pagina Artisti
Nella sezione principale, gli utenti possono visualizzare i dettagli degli album e delle tracce, una foto dell'artista, nonché ascoltare le 5 tracce audio più ascoltate.


Javascript:

Sono presenti varie funzioni principali:

- Caricamento iniziale e gestione degli eventi:
Il file JavaScript inizia definendo costanti per le API utilizzate per ottenere dati da Deezer e per configurare le intestazioni delle richieste. Vengono inoltre definiti i gestori degli eventi per il caricamento della pagina (window.addEventListener("load", init)) e per il pulsante di ricerca (btnCercaArtista.addEventListener("click", redirectToPage)), che inviano richieste API quando necessario.

- Caricamento e visualizzazione dei dettagli dell'artista:
La funzione loadArtistDetails() viene chiamata durante il caricamento della pagina e si occupa di caricare i dettagli dell'artista corrispondente al nome fornito come parametro nella query string dell'URL. Viene inviata una richiesta API per ottenere i dettagli dell'artista e successivamente viene fatta un'altra richiesta per ottenere i dettagli delle tracce dell'artista. Una volta ottenuti i dati, vengono visualizzati sulle rispettive sezioni della pagina utilizzando la funzione displayArtistDetails().

- Visualizzazione dei dettagli delle tracce e degli album:
All'interno della funzione displayArtistDetails(), vengono visualizzati i dettagli delle tracce dell'artista, inclusi i titoli, i nomi degli artisti e la durata delle tracce. Inoltre, vengono visualizzati i dettagli degli album dell'artista, mostrando le copertine degli album e i titoli corrispondenti.

- Gestione della riproduzione audio:
Il file JavaScript gestisce anche la riproduzione audio delle anteprime delle canzoni. La funzione playAudio(trackUrl) viene chiamata quando un utente seleziona una traccia audio, e utilizza l'API HTML5 Audio per riprodurre la traccia. Viene inoltre gestita la barra di avanzamento della riproduzione audio e i pulsanti di riproduzione/pausa, avanzamento e ritorno rapido.

- Navigazione tra le pagine:
Infine, il file JavaScript gestisce anche la navigazione tra le pagine. Quando un utente seleziona un album o una traccia, viene reindirizzato alla pagina corrispondente utilizzando la funzione gotoAlbumPage(id).

### 4) Pagina Album

Nella sezione principale, gli utenti vedranno la lista completa delle canzoni che fanno parte dell'album, una foto dell'album e potrà ovviamente ascoltare tutte le canzoni presenti. 

Javascript:

Sono presenti varie funzioni principali:

- Ricerca di tracce:
Inserisci una query nella casella di ricerca e premi il pulsante di ricerca.
I risultati della ricerca saranno visualizzati sotto forma di elenco di tracce.
Fai clic su una traccia per riprodurla.


-  Riproduzione di tracce:
Quando una traccia viene riprodotta, verrà visualizzata la sua copertina e le informazioni sul titolo e sull'artista.
Utilizza i controlli di riproduzione (play/pause, avanti, indietro) per gestire la riproduzione.


-  Visualizzazione dettagli album:
Gli utenti possono visualizzare dettagli su un album specifico selezionato dalla barra di navigazione laterale.


-  Navigazione tra tracce:
Utilizza i pulsanti "avanti" e "indietro" per passare alla traccia successiva o precedente nell'album corrente.


- Regolazione del volume:
Trascina il cursore del controllo del volume per aumentare o diminuire il volume dell'audio.

