import { displayLog } from './utils';
import { fromEvent } from "rxjs";
import { mapTo } from "rxjs/operators";

export default () => {

    // 🐷🐷 Los operadores, dentro de "pipe"
    // 🐷🐷 "mapTo()" devuelve siempre el mismo valor cualquiera que sea la entrada
    
    const grid = document.getElementById('grid');
    
    const click$ = fromEvent(grid, 'click').pipe(
        mapTo('mouse is CLICKED')  // 🐷🐷
    );
    const subscription = click$.subscribe(data => console.log(data));


}