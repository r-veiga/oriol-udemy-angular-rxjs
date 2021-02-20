import { displayLogInScreen } from './utils';
import { fromEvent } from "rxjs";

export default () => {

    // 🐷🐷 fromEvent() crea un Observable que emite eventos 
    // 🐷🐷 de un tipo específico provinientes de un target event dado 
    
    // (1) sobre evento CLICK de botón
    const actionBtn = document.getElementById('action-btn');
    const source = fromEvent(actionBtn, 'click');

    source.subscribe(event => {
        displayLogInScreen(`click event en la posición (${event.x}, ${event.y})`)
    })

    // (2) sobre evento MOUSEMOVE del ratón
    fromEvent(document, 'mousemove').subscribe(evt => {
        console.log(evt)
    })
}