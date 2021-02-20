import { displayLogInScreen } from './utils';
import { Observable } from 'rxjs';

export default () => {
    // 🐷 DEPRECATED 🐷 const hola = Observable.create(function(observer) {
    const hola = new Observable((observer) => {
        observer.next("Hello");


        // 🐷🐷 de la manera original, el mensaje asíncrono "How you doing?" no se muestra
        // 🐷🐷 porque se ha ejecutado ".complete()" antes, debido al lag de 2 segundos
        // 🐷🐷 deberé incluir el complete() dentro del "setTimeout"
        // 🐷🐷 
        // setTimeout(() => { observer.next("How you doing?"); }, 2 * 1000);
        // observer.next("world");
        // observer.complete();
        // 🐷🐷 
        setTimeout(() => { 
            observer.next("How you doing?"); 
            observer.complete();
        }, 2 * 1000);
        observer.next("world");
    });

    const observer = {
        next: evt => displayLogInScreen(evt),
        error: err => console.err("[ERR] - ", err), 
        complete: () => displayLogInScreen("[DONE]")
    }

    const subscribe = hola.subscribe(observer);
}