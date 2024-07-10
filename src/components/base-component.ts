/*
    Definiamo una Classe base che erediterà le proprietà e 
    i metodi in comune tra le classi figlie. Questa Classe
    sarà Generic perché non vogliamo vincolarci con i types 
    dei dati da utilizzare e sarà abstract perché non dovrebbe mai
    essere istanziata direttamente, ma dovrebbe essere usata sempre per l'ereditarietà
*/
export default abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    /*
        Gli attributi della Classe saranno gli elementi (tag) 
        del nostro HTML
    */
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(templateId: string, HostElementId: string, insertAtStart: boolean, newElementId?: string ) {
        // Usiamo il type casting per dire a TS di che type sarà quell'ElementById
        this.templateElement = <HTMLTemplateElement>document.getElementById(templateId)!;
        // Usiamo l'alias type per dire a TS di che type sarà quell'ElementById
        this.hostElement = document.getElementById(HostElementId)! as T;

        /* 
            importNode() è un metodo per l'oggetto globale document 
            a cui si passa come argomento l'elemento al quale puntare, 
            il secondo parametro definisce se importare o meno questo elemento
        */
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as U;
        // Interagiamo con l'elemento per aggiungere degli ID dinamici in base allo status del project
        if (newElementId) {
            this.element.id = newElementId;
        }


        this.attach(insertAtStart);
    }

    // Definisco un metodo per stampare i nostri progetti nel DOM
    private attach(insertAtBeginning: Boolean) {
        this.hostElement.insertAdjacentElement(
            insertAtBeginning ? 'afterbegin' : 'beforeend', this.element)
    }

    //  Definiamo dei metodi abstract perché così costringeremo le Classi ereditarie a implementarli
    abstract configure(): void;
    abstract renderContent(): void;

}