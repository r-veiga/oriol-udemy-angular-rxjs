import { displayLog as displayLogInScreen } from './utils';
import { fromEvent } from 'rxjs';
import { first, last, map, skip, take, takeLast, takeWhile, tap } from 'rxjs/operators';

export default () => {

    // 🐷🐷 "first()" cuando sólo quiero el primer elemento emitido, ignora los demás
    // 🐷🐷           se le puede aplicar un predicado (1er valor que cumpla predicado)
    // 🐷🐷 "take( N )" quiero los primeros N elementos emitidos
    // 🐷🐷 "takeWhile( predicate )" en cuanto un elemento no cumpla la condición, se cierra el stream
    // 🐷🐷 "last()" espera al cierre del stream y devuelve el último elemento 
    // 🐷🐷 "takeLast( N )" espera al cierre del stream y devuelve los últimos N elementos emitidos
    // 🐷🐷 "skip( N )" ignora los N primeros eventos y emite a partir del siguiente 
    
    const grid = document.getElementById('grid');
    const click$ = fromEvent(grid, 'click').pipe(
        map(val => [ 
            Math.floor(val.offsetX/50), 
            Math.floor(val.offsetY/50)
        ]), 
        tap(val => console.log(`celda: ${val}`)),
        skip(5) // 🐷🐷 salta los 5 primeros eventos
    );

    const subscription = click$.subscribe(data => displayLogInScreen(data));

}