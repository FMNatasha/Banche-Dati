# Dizionario Computazionale

**Materia:** Banche dati e trattamento digitale dei testi  
**Corso di laurea:** LM-43  
**Università:** Università di Catania    
**Anno Accademico:** 2024/2025    

---

##  Obiettivo del progetto
Questo progetto nasce come estensione del lavoro di tesi triennale e mira a sviluppare un **dizionario computazionale** dei termini ricorrenti usati nel *Forum dei Brutti*, in particolare nelle conversazioni riguardanti le app di dating.  
L’obiettivo è mappare, rappresentare e rendere navigabile – attraverso un’interfaccia HTML – il linguaggio specifico della community, fatto di slang, acronimi, abbreviazioni e neologismi, grazie all’uso di strumenti della **linguistica computazionale** e librerie Python.

---

## Metodologia

### 1. **Preprocessing del testo**

Per trasformare i commenti grezzi del forum in dati linguistici analizzabili, è stata implementata una pipeline di **preprocessing linguistico e semantico**. I principali passaggi includono:

-  **Normalizzazione del testo**  
  Tutti i commenti vengono convertiti in **minuscolo**, per uniformare la rappresentazione delle parole ed evitare duplicati dovuti a varianti maiuscole/minuscole.

-  **Pulizia tramite regex**  
  È stata usata una **espressione regolare** per rimuovere **numeri iniziali seguiti da testo alfanumerico** (es. `1tinder` → `tinder`), una struttura ricorrente nei commenti del forum.  
  Inoltre, sono stati rimossi **segni di punteggiatura**, **emoji** e altri caratteri speciali non rilevanti per l’analisi lessicale.

-  **Rimozione di stopword**  
  Utilizzando la lista integrata in `spaCy`, si è effettuata l’eliminazione delle **parole vuote** (come articoli, preposizioni, congiunzioni) per concentrarsi sui contenuti semantici rilevanti.

-  **Tokenizzazione, POS tagging e lemmatizzazione**  
  Grazie al modello `it_core_news_sm` di spaCy, ogni commento è stato suddiviso in **token**, etichettato grammaticalmente (POS) e **lemmatizzato**, ovvero ridotto alla forma base del lemma. Sono stati mantenuti solo i token appartenenti a queste quattro categorie grammaticali:
    - **sostantivi**
    - **aggettivi**
    - **verbi**
    - **avverbi**  
Questo filtraggio mirato ha permesso di isolare i termini potenzialmente significativi per la costruzione del dizionario.

---

### 2. **Costruzione del dizionario**

Una volta preprocessati i dati, si è passati alla fase di **costruzione del dizionario computazionale**, con l’obiettivo di valorizzare il linguaggio specifico del forum.
  -  **Selezione dei termini**  
    I token lemmatizzati sono stati aggregati e conteggiati. È stato costruito un dizionario grezzo contenente **tutti i lemmi unici** presenti nei commenti. In questa fase, si è data priorità ai:
    - termini **frequenti**,
    - **acronimi** usati ricorrentemente,
    - forme di **slang** e abbreviazioni non presenti nei dizionari standard.
  
  -  **Annotazione linguistica e semantica**  
    Ogni lemma è stato annotato con:
    - **categoria grammaticale** (POS),
    - **definizione** (Collegamenti esterni a dizionari online (es. AGLIO, VoDIM, Wiktionary),
  
  -  **Esportazione HTML**  
    Il dizionario è stato trasformato in una pagina HTML che funge da **interfaccia navigabile**.  
    Ogni lemma è visualizzato con:
    - il lemma stesso,
    - la sua categoria grammaticale,
    - frequenza di occorrenza nel corpus,
    - eventuali collegamenti esterni a dizionari online (es. AGLIO, VoDIM, Wiktionary), 
---
> ✍️ Per dubbi, suggerimenti o collaborazioni, sentiti libera/o di contattarmi su [LinkedIn](https://www.linkedin.com/in/marianatasha-fragalà)

🙋‍♀ Developed by **Maria Natasha Fragalà**        
© 2025 Università degli studi di Catania — For educational purposes.
