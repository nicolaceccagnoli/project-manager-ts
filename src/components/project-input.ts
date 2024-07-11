// Importiamo il modulo di Component
import ComponentDefault from "./base-component";
import * as Validation from "../utils/validation";
import { Autobind as AutobindDecorator } from "../decorators/autobind";
import { projectState } from "../state/project-state";


/* 
    Definiamo una Classe che dia accesso al template dell'index 
    dove è contenuto il form per visualizzarlo in pagina
*/
export class ProjectInput extends ComponentDefault <HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;


    constructor() {
        super('project-input', 'app', true, 'user-input')
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

        this.configure();
    }

    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent(){};

    // Definisco un metodo per estrarre i valori dai campi input inseriti dall'utente
    private gatherUserInput(): [string, string, number] | void {

        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;


        const titleValidatable: Validation.Validatable = {
            value: enteredTitle,
            required: true
        };
        const descValidatable: Validation.Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        const peopleValidatable: Validation.Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5
        };

        if ( 
            !Validation.validate(titleValidatable) ||
            !Validation.validate(descValidatable) ||
            !Validation.validate(peopleValidatable)
        ) 
        {
            alert('Invalid input, please try again');
            return;

        } else {
            return [enteredTitle, enteredDescription, Number(enteredPeople)]
        }

    }

    // Definisco un metodo per svuotare gli input dove aver submittato il form
    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';

    }

    @AutobindDecorator
    private submitHandler(event: Event) {
        event.preventDefault();

        const userInput = this.gatherUserInput();

        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            projectState.addProject(title, desc, people);
            console.log(title, desc, people);
        }

        this.clearInputs();
    }
    

}