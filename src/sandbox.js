import { updateDisplay } from './utils';
import { fromEvent } from 'rxjs';
import { map, share, tap } from 'rxjs/operators';

export default () => {

    // 🐷🐷 Barra de progreso según se avanza scroll en el documento:
    // 🐷🐷   (1) observable de evento scroll "fromEvent(document, 'scroll')" 
    // 🐷🐷   (2) observable "scroll$" que me da la posición en ¿píxeles?
    // 🐷🐷       a partir de un observable de evento de scroll "fromEvent(...)"
    // 🐷🐷   (3) observable "scrollProgress$" que me da el nº de páginas scrolleadas
    // 🐷🐷       a partir del observable "scroll$" de posición en píxeles
    // 🐷🐷 
    // 🐷🐷 Quiero que la posición del scroll se refleje en los elementos del UI:  
    // 🐷🐷   (a) barra de progreso
    // 🐷🐷   (b) texto que muestre el porcentaje en formato "nn%"
    // 🐷🐷 
    // 🐷🐷 El operador "share()" hace multicast del Observable.

    const progressBar = document.getElementById('progress-bar');
    const docElement = document.documentElement;

    // Función Observer para actualizar la anchura de la barra de progreso de la vista/html
    const updateProgressBar = (percentage) => { progressBar.style.width = `${percentage}%`; }
    // 🐷🐷 Función Observer para actualizar el texto de % de progreso de la vista/html
    const updatePercentageText = (percentage) => { updateDisplay(`${ Math.floor(percentage) } %`); } // 🐷🐷

    // Observable que devuelve el posicionamiento de scroll (from top) en eventos de scroll
    const scroll$ = fromEvent(document, 'scroll').pipe(
        map(() => docElement.scrollTop),
        tap(evt => console.log("[scroll]: ", evt))
    );

    // Observable que a partir de la posición me da el nº de páginas que se ha hecho scroll
    const scrollProgress$ = scroll$.pipe(
        map(evt => {
            const docHeight = docElement.scrollHeight - docElement.clientHeight;
            return (evt / docHeight) * 100;
        }), 
        share()  // 🐷🐷
    )

    // 🐷🐷 Dos suscripciones al mismo Observable (⚠️ Hot Observable ⚠️) gracias a "share()":
    // 🐷🐷   (1) suscripción a scrollProgress$ para pintar una barra de progreso
    // 🐷🐷   (2) suscripción a scrollProgress$ para escribir el porcentaje por pantalla
    const subscription1 = scrollProgress$.subscribe(updateProgressBar);
    const subscription2 = scrollProgress$.subscribe(updatePercentageText);  // 🐷🐷

}