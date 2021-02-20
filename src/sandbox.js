import { displayLog as displayLogInScreen } from './utils';
import { fromEvent } from 'rxjs';
import { first, map, take } from 'rxjs/operators';

export default () => {

    // 🐷🐷 "first()" cuando sólo quiero el primer elemento emitido, ignora los demás
    // 🐷🐷           se le puede aplicar un predicado (1er valor que cumpla predicado)
    // 🐷🐷 "take( N )" quiero los primeros N elementos emitidos

    const grid = document.getElementById('grid');
    const click$ = fromEvent(grid, 'click').pipe(
        map(val => [ 
            Math.floor(val.offsetX/50), 
            Math.floor(val.offsetY/50)
        ]), 
        take(4) // 🐷🐷 cuatro primeros eventos, cierra el stream después
    );

    const subscription = click$.subscribe(data => displayLogInScreen(data));

}