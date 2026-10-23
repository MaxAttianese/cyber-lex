import type { Article } from '../types';

const GITHUB_URL = 'https://github.com/MaxAttianese/cyber-lex';

export const defaultArticles: Article[] = [
  {
    id: 'default-stop-fearing-start-directing-en',
    title: 'Stop Fearing, Start Directing: The True Impact of AI on Our Work',
    content: `
<p>Often, the most interesting ideas come from side-projects left in the drawer. The underlying intention was twofold: on one hand, to experiment with creating a complex interactive particle visual effect on HTML5 Canvas; on the other, to develop a small application for uploading and reading tech documentation with an appealing interface, free from ads and pop-ups pushing a PRO version. For years, such projects were regularly abandoned or postponed: time is limited and priorities inevitably shift to work tasks, family, and daily commitments. Today, thanks to the execution speed offered by Artificial Intelligence, it was possible to merge these two visions into a single product, created in a fraction of the time normally required.</p>
<h2>CyberLex: Design, Architecture, and the Creative Dividend</h2>
<p>From this union, <strong><em>CyberLex</em></strong> was born, an offline-first reader with a cyberpunk design. The application is not a simple visual experiment, but a complete tool that follows modern development best practices. Built with React, TypeScript, and Tailwind CSS, it integrates a hybrid parser capable of processing .md files, extracting text from Word (via mammoth) and PDF (via pdfjs-dist), and inferring heading hierarchy in .txt files by analyzing sentence structure.</p>
<h3>The Architecture that Frees Creativity</h3>
<p>The entire application was designed with a solid architecture, ensuring modular components (Single Responsibility Principle) and a comprehensive test suite to guarantee reliability. In the past, implementing this logic, refining the interface (with such a complex background), and setting up the testing environment would have required weeks of evening work. With AI, times have shrunk so much that it was possible, in a matter of seconds, to enrich the parsing with an automatic heuristic language detector and, with a single additional prompt, to transform <strong>CyberLex</strong> into a PWA (Progressive Web App) installable on desktop and smartphone. This time-saving generated a true "creative dividend". Freed from the burden of mechanically writing boilerplate, there was room to include a time-based Easter Egg engine: the app recognizes dozens of holidays and events (from Halloween to Black Friday, up to the developer's birthday), animating the header with themed tooltips and emojis. It is a practical demonstration of how technological efficiency leaves more room for creativity.</p>
<h2>Stop fearing, start directing</h2>
<p>Faced with these tools, the reaction of many developers is still one of distrust, driven by the fear of progressive obsolescence. However, direct experience shows that the programmer's role is simply evolving from a "syntax worker" to a "logic architect". Rote memorization of code is giving way to new crucial skills:</p>
<ul>
<li>Architectural Patterns and System Design: Structuring a solid application (Clean Architecture, SOLID) is more important today than knowing how to write a basic algorithm from scratch.</li>
<li>Critical Code Review: The main activity becomes reading, analyzing, and rigorously validating the output produced by the machine.</li>
<li>Architectural Prompting and Optimization: Knowing how to provide rock-solid instructions to AI becomes a technical skill in its own right, including the ability to generate efficient prompts and optimize token spending to avoid wasting resources.</li>
</ul>
<h2>Embracing change</h2>
<p>The tech sector has always been synonymous with evolution. Being reluctant to use AI means giving up a force multiplier that not only allows you to be more productive at work but also helps you find the time to develop useful and fulfilling personal tools. Artificial intelligence is not a threat to the profession; it offers the opportunity to delegate mere typing so you can focus on what really matters: solving complex problems, making architectural decisions, and, why not, having the time to leave a personal mark in the form of an easter egg in the source code, reclaiming that creative space that makes programming a true art.</p>
<p><a href="${GITHUB_URL}" target="_blank" rel="noopener noreferrer">Github</a><br /><a href="${GITHUB_URL}" target="_blank" rel="noopener noreferrer">CyberLex</a></p>
`,
    date: '2026-10-23T09:00:00.000Z',
    language: 'EN',
  },
  {
    id: 'default-smettere-di-temere-it',
    title: "Smettere di temere, iniziare a dirigere: Il vero impatto dell'IA sul nostro lavoro",
    content: `
<p>Spesso le idee più interessanti nascono da side-project lasciati nel cassetto. L'intenzione di base era duplice: da un lato, sperimentare con la creazione di un complesso effetto visivo a particelle interattive su Canvas HTML5; dall'altro, sviluppare un piccolo applicativo su cui caricare e leggere documentazione tech con un'interfaccia accattivante, libera da pubblicità e popup per l'acquisto della versione PRO. Per anni, progetti del genere sono stati regolarmente abbandonati o rimandati: il tempo a disposizione è limitato e le priorità si spostano inevitabilmente sui task lavorativi, sulla famiglia e sugli impegni quotidiani. Oggi, grazie alla velocità di esecuzione offerta dall'Intelligenza Artificiale, è stato possibile unire queste due visioni in un unico prodotto, realizzato in una frazione del tempo normalmente necessario.</p>
<h2>CyberLex: Design, Architettura e il Dividendo Creativo</h2>
<p>Da questa unione è nato <strong><em>CyberLex</em></strong>, un lettore offline-first dal design cyberpunk. L'applicazione non è un semplice esperimento visivo, ma un tool completo che rispetta le moderne best practice di sviluppo. Costruito con React, TypeScript e Tailwind CSS, integra un parser ibrido capace di processare file .md, estrarre testo da Word (tramite mammoth) e PDF (tramite pdfjs-dist), e dedurre la gerarchia dei titoli nei file .txt analizzando la struttura delle frasi.</p>
<h3>L'Architettura che libera la Creatività</h3>
<p>L'intero applicativo è stato progettato con un'architettura solida, garantendo componenti modulari (Single Responsibility Principle) e una suite di test completa per assicurarne l'affidabilità. In passato, implementare queste logiche, curare l'interfaccia (con uno sfondo così complesso) e configurare l'ambiente di testing avrebbe richiesto settimane di lavoro serale. Con l'IA, i tempi si sono talmente contratti da permettere, in una manciata di secondi, di arricchire il parsing con un rilevatore euristico automatico per la lingua del testo e, con un singolo prompt aggiuntivo, di trasformare <strong>CyberLex</strong> in una PWA (Progressive Web App) installabile su desktop e smartphone. Questo risparmio di tempo ha generato un vero e proprio "dividendo creativo". Liberati dall'onere della scrittura meccanica del boilerplate, c'è stato lo spazio per inserire un motore temporale di Easter Egg: l'app riconosce decine di festività e ricorrenze (da Halloween al Black Friday, fino al compleanno dello sviluppatore), animando l'header con tooltip ed emoji a tema. È la dimostrazione pratica di come l'efficienza tecnologica lasci più spazio alla creatività.</p>
<h2>Smettere di temere, iniziare a dirigere</h2>
<p>Di fronte a questi strumenti, la reazione di molti sviluppatori è ancora di diffidenza, dettata dal timore di una progressiva obsolescenza. Tuttavia, l'esperienza diretta dimostra che la figura del programmatore si sta semplicemente evolvendo da "operaio della sintassi" ad "architetto della logica". La conoscenza mnemonica del codice cede il passo a nuove competenze cruciali:</p>
<ul>
<li>Pattern Architetturali e System Design: Strutturare un'applicazione solida (Clean Architecture, SOLID) è oggi più importante che saper scrivere un algoritmo base da zero.</li>
<li>Code Review Critica: L'attività principale diventa leggere, analizzare e validare severamente l'output prodotto dalla macchina.</li>
<li>Prompting Architetturale e Ottimizzazione: Saper fornire istruzioni granitiche all'IA diventa una skill tecnica a tutti gli effetti, che include la capacità di generare prompt efficienti e ottimizzare la spesa dei token per evitare sprechi di risorse.</li>
</ul>
<h2>Abbracciare il cambiamento</h2>
<p>Il settore tech è da sempre sinonimo di evoluzione. Essere restii all'utilizzo dell'IA significa rinunciare a un moltiplicatore di forze che permette non solo di essere più produttivi sul lavoro, ma anche di ritrovare il tempo per sviluppare strumenti personali utili e appaganti. L'intelligenza artificiale non rappresenta una minaccia per la professione; offre l'opportunità di delegare la mera battitura per concentrarsi su ciò che conta davvero: risolvere problemi complessi, prendere decisioni architetturali e, perché no, avere il tempo di lasciare un segno personale sotto forma di easter-egg nel codice sorgente, riappropriandosi di quello spazio creativo che rende la programmazione una vera e propria arte.</p>
<p><a href="${GITHUB_URL}" target="_blank" rel="noopener noreferrer">Github</a><br /><a href="${GITHUB_URL}" target="_blank" rel="noopener noreferrer">CyberLex</a></p>
`,
    date: '2026-10-23T09:00:00.000Z',
    language: 'IT',
  },
  {
    id: 'default-do-not-open',
    title: 'DO NOT OPEN.txt',
    content:
      '<p>CRITICAL ERROR:</br> 1,432 malware files downloaded. Webcam activated. Hard drive wiping in 3... 2... 1...</br></br></br></br></br></br></br></br>...Just kidding! 😜 Your PC is completely fine. But seriously, why did you open this? Close it and go grab a coffee!</p>',
    date: '2026-10-23T09:00:00.000Z',
    isEasterEgg: true,
    language: 'EN',
  },
];
