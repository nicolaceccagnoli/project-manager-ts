import { ProjectInput } from "./components/project-input";
import { ProjectList } from "./components/project-list";


/*
    Nel file index.html abbiamo inserito il tag <template> che è compatibile con 
    i browser moderni ed è inizialmente 'invisibile' ed è renderizzato in pagina grazie a JS
*/


// Istanziamo la Classe per visualizzare il form in pagina
new ProjectInput();

// Istanziamo le Classi per visualizzare le liste dove andranno i nostri progetti
new ProjectList('active');
new ProjectList('finished');