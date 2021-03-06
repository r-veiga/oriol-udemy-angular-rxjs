import { updateDisplay } from './utils';
import { fromEvent, BehaviorSubject, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

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
    // 🐷🐷 SUBJECT es un observable con tres propiedades muy útiles: 
    // 🐷🐷   (1) permite hacer multicast de sus valores hacia varios Observers
    // 🐷🐷       es, por definición, un Hot Observable
    // 🐷🐷   (2) es un Observer, además de un Observable
    // 🐷🐷       tiene los métodos subscribe & pipe, además de next, complete & error
    // 🐷🐷   (3) actúa como un distribuidor, 
    // 🐷🐷       emite a todos sus Observers los ítems que recibe como Observer a su vez
    // 🐷🐷    
    // 🐷🐷 Un Observable es a priori COLD. 
    // 🐷🐷 Nota: el operador "share()" permite convertir un Observable en HOT, internamente usa un SUBJECT.   
    // 🐷🐷    
    // 🐷🐷 Un BehaviourSubject es un Subject que siempre tiene un estado:
    // 🐷🐷 o el dado en el constructor o el del último valor emitido.

    const progressBar = document.getElementById('progress-bar');
    const docElement = document.documentElement;

    // Función Observer para actualizar la anchura de la barra de progreso de la vista/html
    const updateProgressBar = (percentage) => { progressBar.style.width = `${percentage}%`; }
    // Función Observer para actualizar el texto de % de progreso de la vista/html
    const updatePercentageText = (percentage) => { updateDisplay(`${ Math.floor(percentage) } %`); } 

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
        })  
    )

    // 🐷🐷 Dos suscripciones al Subject (⚠️ Hot Observable ⚠️):
    const scrollProgressHot$ = new BehaviorSubject(0);                           // 🐷🐷 emite el valor 0 como inicial
    scrollProgress$.subscribe(scrollProgressHot$);                               
    // (1) suscripción a scrollProgress$ para pintar una barra de progreso
    // (2) suscripción a scrollProgress$ para escribir el porcentaje por pantalla
    const subscription1 = scrollProgressHot$.subscribe(updateProgressBar);       
    const subscription2 = scrollProgressHot$.subscribe(updatePercentageText);    

    // 🐷🐷 BehaviorSubject guarda siempre el último valor, 
    // 🐷🐷 así que lo puedo consultar desde el punto que quiera de mi código 😀
    console.log("Estado inicial del scroll introducido en el constructor de BehaviorSubject: ", scrollProgressHot$.value);       // 🐷🐷
                                           
}