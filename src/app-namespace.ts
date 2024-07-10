/*
    Nel file index.html abbiamo inserito il tag <template> che è compatibile con 
    i browser moderni ed è inizialmente 'invisibile' ed è renderizzato in pagina grazie a JS
*/

/*
    Utilizziamo un commento speciale ///, una sintassi riconosciuta da TS,
    per importare i namespace.
*/
/// <reference path="./models/drag-drop.ts"/>
/// <reference path="./models/project.ts"/>
/// <reference path="./state/project-state.ts"/>
/// <reference path="./utils/validation.ts"/>
/// <reference path="./decorators/autobind.ts"/>
/// <reference path="./components/project-input.ts"/>
/// <reference path="./components/project-list.ts"/>
/// <reference path="./components/project-item.ts"/>



// Definiamo un namespace con lo stesso nome anche per il file principale
namespace App {

    // Istanziamo la Classe per visualizzare il form in pagina
    new ProjectInput();

    // Istanziamo le Classi per visualizzare le liste dove andranno i nostri progetti
    new ProjectList('active');
    new ProjectList('finished');
}