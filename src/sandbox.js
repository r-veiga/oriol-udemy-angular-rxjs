import { updateDisplay } from './utils';
import { fromEvent } from 'rxjs';
import { map, pairwise, tap } from 'rxjs/operators';

export default () => {

    // 🐷🐷 Barra de progreso según se avanza scroll en el documento:
    // 🐷🐷   (1) observable de evento scroll "fromEvent(document, 'scroll')" 
    // 🐷🐷   (2) observable "scroll$" que me da la posición en ¿píxeles?
    // 🐷🐷       a partir de un observable de evento de scroll "fromEvent(...)"
    // 🐷🐷   (3) observable "scrollProgress$" que me da el nº de páginas scrolleadas
    // 🐷🐷       a partir del observable "scroll$" de posición en píxeles
    // 🐷🐷 
    // 🐷🐷 El operador "pairwise( n-1, n )" emite los eventos en parejas consecutivas, 
    // 🐷🐷 el elemento anterior y el actual. 
    // 🐷🐷 En la emisión del primer elemento no se manda nada (no hay ítem anterior),  
    // 🐷🐷 y a partir de ahí para cada elemento.

    const progressBar = document.getElementById('progress-bar');
    const docElement = document.documentElement;

    // función Observer
    const updateProgressBar = (percentage) => {
        progressBar.style.width = `${percentage}%`;
    }

    // Observable que devuelve el posicionamiento de scroll (from top) en eventos de scroll
    const scroll$ = fromEvent(document, 'scroll').pipe(
        map(() => docElement.scrollTop),
        tap(evt => console.log("[scroll]: ", evt)), 
        pairwise(),                                                 // 🐷🐷 [ posición previa, posición actual ]
        tap(([previous, current]) => {                              // 🐷🐷
            updateDisplay(current > previous ? 'DESC' : 'ASC');     // 🐷🐷 ¿sube o baja el scroll?
        }),                                                         // 🐷🐷
        map(([previous, current]) => current)                       // 🐷🐷 devuelve sólo la última posición
    );

    // Observable que a partir de la posición me da el nº de páginas que se ha hecho scroll
    const scrollProgress$ = scroll$.pipe(
        map(evt => {
            const docHeight = docElement.scrollHeight - docElement.clientHeight;
            return (evt / docHeight) * 100;
        })
    )

    // Suscripción a scrollProgress$ para pintar una barra de progreso
    const subscription = scrollProgress$.subscribe(updateProgressBar);

}