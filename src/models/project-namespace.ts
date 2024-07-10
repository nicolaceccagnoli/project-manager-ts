/*
    Definiamo delle interface per il Drag & Drop dei project
    che ne cambierà lo status
*/

/*
    Definiamo un namespace, d'ora in avanti le interface definite
    la dentro saranno disponibili qua dentro
*/

namespace App {
    /*
        Definiamo una Classe per il type di Project
    */ 

    // Definisco un type enum per lo status dei Project
    export enum ProjectStatus { Active, Finished}

    export class Project {
        constructor(
            public id: string, 
            public title: string, 
            public description: string, 
            public people: number, 
            public status: ProjectStatus){}
    }

}    
    
