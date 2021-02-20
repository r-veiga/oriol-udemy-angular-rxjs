import { displayLogInScreen } from './utils';
import { Observable } from 'rxjs';

export default () => {
    const hola = new Observable((observer) => {
        observer.next("Hello");
        setTimeout(() => { observer.next("How you doing?"); }, 2 * 1000); // 🐷🐷 
        observer.next("world");
    });

    const observer = {
        next: evt => displayLogInScreen(evt),
        error: err => console.err("[ERR] - ", err), 
        complete: () => displayLogInScreen("[DONE]")
    }

    // 🐷🐷 Elimino subscripción desde el Observer ".unsubscribe()" 
    // 🐷🐷 y no desde el Observable ".complete()".
    // 🐷🐷 
    // 🐷🐷 El mensaje asíncrono "How you doing?" no se muestra
    // 🐷🐷 porque se ha ejecutado ".complete()" antes, debido al lag de 2 segundos
    const subscribe = hola.subscribe(observer);
    subscribe.unsubscribe(); // 🐷🐷 
}