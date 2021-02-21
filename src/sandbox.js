import { updateDisplay } from './utils';
import { fromEvent } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

export default () => {
    
    // 🐷🐷 Barra de progreso según se avanza scroll en el documento:
    // 🐷🐷   (1) observable de evento scroll "fromEvent(document, 'scroll')" 
    // 🐷🐷   (2) observable "scroll$" que me da la posición en ¿píxeles?
    // 🐷🐷       a partir de un observable de evento de scroll "fromEvent(...)"
    // 🐷🐷   (3) observable "scrollProgress$" que me da el nº de páginas scrolleadas
    // 🐷🐷       a partir del observable "scroll$" de posición en píxeles
    // 🐷🐷 
    // 🐷🐷 El operador "delay( N )" retrasa la emisión de ítems desde el Observable fuente 
    // 🐷🐷 durante un tiempo N determinado.
    
    const progressBar = document.getElementById('progress-bar');
    const docElement = document.documentElement;
    
    // Función Observer para actualizar la anchura de la barra de progreso de la vista/html
    const updateProgressBar = (percentage) => { progressBar.style.width = `${percentage}%`; }
    
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
            delay(500) // 🐷🐷 retrasa pintar la barra de progreso 0.5 seg respecto al movimiento de scroll
    )

    // (1) suscripción a scrollProgress$ para pintar una barra de progreso
    const subscription = scrollProgress$.subscribe(updateProgressBar);


}