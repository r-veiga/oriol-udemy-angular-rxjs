import { displayLogInScreen } from './utils';
import { fromEvent } from "rxjs";

export default () => {

    // 🐷🐷 fromEvent() crea un Observable que emite eventos 
    // 🐷🐷 de un tipo específico provinientes de un target event dado 
    
    const actionBtn = document.getElementById('action-btn');
    const source = fromEvent(actionBtn, 'click');

    source.subscribe(event => {
        displayLogInScreen(`click event en la posición (${event.x}, ${event.y})`)
    })
}