/*
    Definisco un interfaccia per la validazione degli input dell'utente
*/
export interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

// Definisco un metodo per la validazione degli input utente
export function validate(validatableInput: Validatable) {
    // Definisco una flag per la validità dell'input
    let isValid = true;

    if(validatableInput.required) {
        // Se l'input è required e rispetta entrambe le condizioni allora restituirà true
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }

    // se la minLength è > 0 ed è di tipo string
    if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {

        // Allora restituirà true se la lunghezza dell'input è maggiore a quella della minLength richiesta
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength
    }

    // se la maxLength è > 0 ed è di tipo string
    if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {

        // Allora restituirà true se la lunghezza dell'input è maggiore a quella della maxLength richiesta
        isValid = isValid && validatableInput.value.length <= validatableInput.maxLength
    }

    if (validatableInput.min != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.min
    }

    if (validatableInput.max != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value <= validatableInput.max
    }

    
    return isValid;

}
