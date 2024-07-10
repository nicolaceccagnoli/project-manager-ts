/*
    Definiamo delle interface per il Drag & Drop dei project
    che ne cambierà lo status
*/

/*
    Definiamo un namespace, d'ora in avanti le interface definite
    la dentro saranno disponibili qua dentro
*/

namespace App {
    export interface Draggable {
        dragStartHandler(event: DragEvent): void;

        dragEndHandler(event: DragEvent): void;
    } 

    export interface DragTarget {
        dragOverHandler(event: DragEvent): void;

        dropHandler(event: DragEvent): void;

        dragLeaveHandler(event: DragEvent): void;
    }

}
