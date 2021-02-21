import { displayLog as displayLogInScreen } from './utils';
import { fromEvent } from 'rxjs';
import { first, last, map, take, takeWhile, tap } from 'rxjs/operators';

export default () => {

    // 🐷🐷 "first()" cuando sólo quiero el primer elemento emitido, ignora los demás
    // 🐷🐷           se le puede aplicar un predicado (1er valor que cumpla predicado)
    // 🐷🐷 "take( N )" quiero los primeros N elementos emitidos
    // 🐷🐷 "takeWhile( predicate )" en cuanto un elemento no cumpla la condición, se cierra el stream
    // 🐷🐷 "last()" espera al cierre del stream y devuelve el ÚLTIMO elemento 
    
    const grid = document.getElementById('grid');
    const click$ = fromEvent(grid, 'click').pipe(
        map(val => [ 
            Math.floor(val.offsetX/50), 
            Math.floor(val.offsetY/50)
        ]), 
        takeWhile(([column, row]) => row > 3),
        tap(val => console.log(`elemento aceptado por el takeWhile(): ${val}`)),
        last() // 🐷🐷 último valor emitido por el stream (tras su cierre)
    );

    const subscription = click$.subscribe(data => displayLogInScreen(data));

}