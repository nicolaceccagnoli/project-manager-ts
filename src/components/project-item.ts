import { Draggable } from '../models/drag-drop'
import { Project } from '../models/project';
import ComponentDefault from './base-component';
import { Autobind } from '../decorators/autobind';

/*
    Definiamo una Classe base per l'elemento del Progetto
*/
export class ProjectItem extends ComponentDefault<HTMLUListElement, HTMLLIElement>
implements Draggable {

    private project: Project

    // Definiamo un metodo getter per stampare delle informazioni pià accurate
    get persons() {
        if (this.project.people === 1) {
            return '1 person';
        } else {
            return `${this.project.people} persons`
        }
    }

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id)
        this.project = project;
        this.configure();
        this.renderContent();
    }

    @Autobind
    dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData('text/plain', this.project.id);
    event.dataTransfer!.effectAllowed = 'move';
    }

    @Autobind
    dragEndHandler(_: DragEvent): void {
        console.log('DragEnd');
    }

    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler)
    }

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}


