import { displayLog as displayLogInScreen } from './utils';
import { fromEvent } from 'rxjs';
import { first, map, take, takeWhile } from 'rxjs/operators';

export default () => {

    // 🐷🐷 "first()" cuando sólo quiero el primer elemento emitido, ignora los demás
    // 🐷🐷           se le puede aplicar un predicado (1er valor que cumpla predicado)
    // 🐷🐷 "take( N )" quiero los primeros N elementos emitidos
    // 🐷🐷 "takeWhile( predicate )" en cuanto un elemento no cumpla la condición, se cierra el stream
    
    const grid = document.getElementById('grid');
    const click$ = fromEvent(grid, 'click').pipe(
        map(val => [ 
            Math.floor(val.offsetX/50), 
            Math.floor(val.offsetY/50)
        ]), 
        takeWhile(([column, row]) => row > 3) // 🐷🐷 hasta que el elemento sea de fila 3 o menor
    );

    const subscription = click$.subscribe(data => displayLogInScreen(data));

}