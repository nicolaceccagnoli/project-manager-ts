
/*
    Definisco un autobind Decorator per l'evento submit del form
    i suoi argomenti dovrebbero essere (target, methodName, descriptor), 
    ma target e methodName non li utilizzerei 
*/

export function Autobind(_: any ,_2: string, descriptor: PropertyDescriptor) {
    // Definisco una costante per il metodo della Classe
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFunction = originalMethod.bind(this);
            return boundFunction;
        }
    }
    return adjDescriptor;
}
