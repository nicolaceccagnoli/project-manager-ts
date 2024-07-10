import { DragTarget } from '../models/drag-drop.js'
import { Project, ProjectStatus } from '../models/project.js';
import  ComponentDefault from './base-component.js';
import { Autobind } from '../decorators/autobind.js';
import { projectState } from '../state/project-state.js';
import { ProjectItem } from './project-item.js';

/*
    Definiamo una Classe per i progetti che verranno creati
*/
export class ProjectList extends ComponentDefault<HTMLDivElement, HTMLElement> 
implements DragTarget {

    assignedProject: Project[];

    // Utilizzo il literal type 
    constructor(private status: 'active' | 'finished') {
        super('project-list', 'app', false,`${status}-projects`)
        this.assignedProject = [];
        
        /*
            Utilizzo il metodo di projectState per aggiungere i progetti  al nostro array di progetti 
            assegnati e richiamare la funzione che stamperà i progetti in pagina 
        */
        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(prj => {
                if (this.status === 'active') {
                    return prj.status === ProjectStatus.Active
                }
                return prj.status === ProjectStatus.Finished
            })
            this.assignedProject = relevantProjects;
            this.renderProjects();
        })

        this.configure();
        this.renderContent();
    }

    @Autobind
    dragOverHandler(event: DragEvent) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.add('droppable');
        }
    
    }

    @Autobind
    dropHandler(event: DragEvent) {
        const projId = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(projId, this.status === 'active' ? ProjectStatus.Active : ProjectStatus.Finished)

    }

    @Autobind
    dragLeaveHandler(_: DragEvent) {
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.remove('droppable');
    }

    configure() {

        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);

        /*
            Utilizzo il metodo di projectState per aggiungere i progetti  al nostro array di progetti 
            assegnati e richiamare la funzione che stamperà i progetti in pagina 
        */
        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(prj => {
                if (this.status === 'active') {
                    return prj.status === ProjectStatus.Active
                }
                return prj.status === ProjectStatus.Finished
            })
            this.assignedProject = relevantProjects;
            this.renderProjects();
        })
    
    }

    // Definisco un metodo per renderizzare i progetti nel nostro template
    renderContent() {
        const listId = `${this.status}-projects-list`;
    
        this.element.querySelector('ul')!.id = listId;

        this.element.querySelector('h2')!.textContent = this.status.toUpperCase() + ' PROJECTS'


    }


    // Definiamo un metodo per renderizzare i progetti in pagina quando vengono creati
    private renderProjects() {
        const listEl = document.getElementById(`${this.status}-projects-list`)! as HTMLUListElement;
        listEl.innerHTML = '';
        for (const projItem of this.assignedProject) {
            new ProjectItem(this.element.querySelector('ul')!.id, projItem)
        }
    }

} 