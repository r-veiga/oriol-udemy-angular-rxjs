import { displayLog } from './utils';
import { fromEvent } from "rxjs";
import { map } from "rxjs/operators";

export default () => {

    // 🐷🐷 Los operadores, dentro de "pipe"
    // 🐷🐷 "mapTo()" devuelve siempre el mismo valor cualquiera que sea la entrada
    // 🐷🐷 "map()" aplica una función a cada valor emitido, en este caso crea un array de posición [x,y]
    
    const grid = document.getElementById('grid');
    
    const click$ = fromEvent(grid, 'click').pipe(
        map(val => [val.offsetX, val.offsetY]) // 🐷🐷
    );
    const subscription = click$.subscribe(data => console.log(data));


}