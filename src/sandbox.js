import { updateDisplay } from './utils';
import { fromEvent, BehaviorSubject, Subject } from 'rxjs';
import { auditTime, map, sampleTime, tap, throttleTime } from 'rxjs/operators';

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
    // 🐷🐷 "sampleTime( N )" emite el evento más reciente en el último intervalo periódico de N milisegundos
    // 🐷🐷 "auditTime( N )" normalmente, muestra un comportamiento bastante similar a "sampleTime(N)". 
    // 🐷🐷                  Espera a un primer evento y desde ese momento controla N milisegundos y devuelve el último valor del intervalo.
    // 🐷🐷 "throttleTime( N )" emite el primer evento, comienza el intervalo e ignora los que se produzcan a continuación en ese intervalo. 
    
    const progressBar = document.getElementById('progress-bar');
    const docElement = document.documentElement;
    
    // Función Observer para actualizar la anchura de la barra de progreso de la vista/html
    const updateProgressBar = (percentage) => { progressBar.style.width = `${percentage}%`; }
    // Función Observer para actualizar el texto de % de progreso de la vista/html
    const updatePercentageText = (percentage) => { updateDisplay(`${ Math.floor(percentage) } %`); } 
    
    // Observable que devuelve el posicionamiento de scroll (from top) en eventos de scroll
    // 🐷🐷 con "sampleTime()" evito tratar todos los eventos y así reduzco el gasto de recursos del sistema 
    const scroll$ = fromEvent(document, 'scroll').pipe(
        tap(evt => console.log("[scroll event]")),          // 🐷🐷 log A TODOS los eventos de scroll disparados
        throttleTime(50),                                   // 🐷🐷 PRIMER evento producido e ignora los demás en el intervalo de 50 ms desde ese primer evento
        map(() => docElement.scrollTop),
        tap(evt => console.log("[scroll]: ", evt))
    );

    // Observable que a partir de la posición me da el nº de páginas que se ha hecho scroll
    const scrollProgress$ = scroll$.pipe(
        map(evt => {
            const docHeight = docElement.scrollHeight - docElement.clientHeight;
            return (evt / docHeight) * 100;
        })  
    )

    // Dos suscripciones al Subject (⚠️ Hot Observable ⚠️):
    const scrollProgressHot$ = new BehaviorSubject(0);                           // emite el valor 0 como inicial
    scrollProgress$.subscribe(scrollProgressHot$);                               
    // (1) suscripción a scrollProgress$ para pintar una barra de progreso
    // (2) suscripción a scrollProgress$ para escribir el porcentaje por pantalla
    const subscription1 = scrollProgressHot$.subscribe(updateProgressBar);       
    const subscription2 = scrollProgressHot$.subscribe(updatePercentageText);    
                                           
}