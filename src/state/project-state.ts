import { Project, ProjectStatus } from "../models/project.js";


/*
    Definiamo una Classe singleton di gestione dello stato del Progetto
*/
/* 
    Definiamo un custom type Listener che accetterà come argomenti
    la lista dei nostri Projects e eseguirà delle funzioni.
*/

/*
    N.B.: Definiamo un Generic Type per i Listener e creiamo una Classe genitore
    per lo stato dei Progetti perché nel caso avessimo un'applicazione grande,
    allora potremmo avere dei diversi stati per i progetti, gli user, ecc.
*/

type Listener<T> = (items: T[]) => void;

class State<T> {
    // Definiamo una proprietà che sarà un array per degli ascoltatori 
    protected listeners: Listener<T>[] = [];

    // Definiamo un metodo per che aggiungere delle funzioni al nostro array di ascoltatori
    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
    
}

export class ProjectState extends State<Project> {
    private projects: Project[] = [];
    // Definiamo una proprietà private che sarà l'istanza stessa di questa Classe
    private static instance: ProjectState;

    private constructor() {
        super()
    }

    // Definiamo un metodo statico per verificare se questa Classe è già stata istanziata o meno
    static getInstance() {
        if(this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance
    }

    // Definiamo un metodo per aggiungere il nuovo Progetto alla lista dei Progetti

    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new Project( Math.random().toString(), title, description, numOfPeople, ProjectStatus.Active)
        this.projects.push(newProject);
        // Quando aggiungiamo un nuovo progetto chiamiamo tutte le funzioni degli ascoltatori
        for (const listenerFn of this.listeners){
            /* 
                Dato che ogni elemento è una function la possiamo richiamare come tale 
                e utilizziamo slice per creare un nuovo array e non avere riferimenti
                con l'array originale dei progetti
            */
            listenerFn(this.projects.slice());
        }
    }

    // Definiamo una funzione per spostare i progetti da active a finished
    moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find(proj => proj.id === projectId);
        if (project && project.status !== newStatus) {
            project.status= newStatus;
        }
        // Dobbiamo infine aggiornare lo stato dei Progetti
        this.updateListeners();
    }

    private updateListeners() {
        for (const listenerFn of this.listeners){
        listenerFn(this.projects.slice());
        }
    }

}
/* 
    Creiamo un istanza globale di ProjectState attraverso il suo metodo statico
    per assicurarci che lavoreremo sempre e solo con lo stesso identico Object
*/
export const projectState = ProjectState.getInstance();
