import { displayLogInScreen } from './utils';
import { Observable } from 'rxjs';

export default () => {
    const hola = new Observable((observer) => {
        observer.next("Hello");
        observer.next("world");
        setTimeout(() => { 
            observer.next("How you doing?"); 
            observer.complete(); // 🐷🐷
        }, 2 * 1000); 
        observer.next("Everything's good?");
    });

    const observer = {
        next: evt => displayLogInScreen(evt),
        error: err => console.err("[ERR] - ", err), 
        complete: () => displayLogInScreen("[DONE]")
    }

    // 🐷🐷 Creo dos Observers para el mismo Observable:
    // 🐷🐷 (1) al primero: 
    // 🐷🐷     * le hago unsubscribe 
    // 🐷🐷     * el mensaje asíncrono "How you doing?" no se muestra
    // 🐷🐷 (2) al segundo: 
    // 🐷🐷     * no le hago unsubscribe, dejo que acabe el Observable
    // 🐷🐷     * el mensaje asíncrono "How you doing?" sí se muestra
    // 🐷🐷 
    // 🐷🐷 Se trata de "Cold Observables".
    // 🐷🐷 
    // 🐷🐷 Ambos se lanzan consecutivamente y de manera asíncrona. 
    // 🐷🐷 Ojo con esto, porque por la velocidad de ejecución 
    // 🐷🐷 parece que se han ejecutado síncronamente, pero NO.
    const subscribe1 = hola.subscribe(observer); // 🐷🐷 
    const subscribe2 = hola.subscribe(observer); // 🐷🐷 
    subscribe1.unsubscribe();                    // 🐷🐷 
}