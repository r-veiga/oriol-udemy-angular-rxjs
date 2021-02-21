import { updateDisplay, displayLogInScreen } from './utils';
import { fromEvent } from "rxjs";
import { debounceTime, map } from "rxjs/operators";

export default () => {

    // 🐷🐷 El operador "debounceTime( X )" sirve para esperar un tiempo de guarda X.
    // 🐷🐷 Cuando hay un evento emitido, espera X tiempo antes de publicar el último evento, 
    // 🐷🐷 si hay otro evento durante ese intervalo, recomienza el tiempo de guarda. 
    
    const inputBox = document.getElementById('input-box');
 
    // Observable de evento INPUT cuando se teclea en la caja de texto
    const inputSrc$ = fromEvent(inputBox, "input").pipe(
        map(event => event.target.value), 
        debounceTime(500) // 🐷🐷 tiempo de guarda antes de publicar es 0.5 seg 
    );

    inputSrc$.subscribe(displayLogInScreen);
}