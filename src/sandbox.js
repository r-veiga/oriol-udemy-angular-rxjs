import { displayLog as displayLogInScreen } from './utils';
import { fromEvent } from 'rxjs';
import { first, last, map, reduce, scan, skip, take, takeLast, takeWhile, tap } from 'rxjs/operators';

export default () => {

    // 🐷🐷 "first()" cuando sólo quiero el primer elemento emitido, ignora los demás
    // 🐷🐷           se le puede aplicar un predicado (1er valor que cumpla predicado)
    // 🐷🐷 "take( N )" quiero los primeros N elementos emitidos
    // 🐷🐷 "takeWhile( predicate )" en cuanto un elemento no cumpla la condición, se cierra el stream
    // 🐷🐷 "last()" espera al cierre del stream y devuelve el último elemento 
    // 🐷🐷 "takeLast( N )" espera al cierre del stream y devuelve los últimos N elementos emitidos
    // 🐷🐷 "skip( N )" ignora los N primeros eventos y emite a partir del siguiente 
    // 🐷🐷 "reduce()" acumulador, que aplica una función a cada elemento y muestra el resultado al cerrar el stream
    // 🐷🐷            permite un 2º parámetro opcional, seed/semilla para inicializar el acumulador
    // 🐷🐷 "scan()" acumulador, se usa igual que "reduce()", 
    // 🐷🐷            pero muestra el resultado cada vez que se emite un valor (y no al fin de stream)
    
    const grid = document.getElementById('grid');

    const seed_initialAccumulatorValue = { clicks: 0, cells: [] };  // 🐷🐷

    const click$ = fromEvent(grid, 'click').pipe(
        map(val => [ 
            Math.floor(val.offsetX/50), 
            Math.floor(val.offsetY/50)
        ]), 
        takeWhile(([column, row]) => column != 0),          // 🐷🐷
        tap(val => console.log(`celda: ${val}`)),
        scan(                                               // 🐷🐷
            (acum, current) => {                            // 🐷🐷
                    return {                                // 🐷🐷
                        clicks: acum.clicks + 1,            // 🐷🐷
                        cells: [...acum.cells, current]     // 🐷🐷
                    }                                       // 🐷🐷
                }                                           // 🐷🐷
                , seed_initialAccumulatorValue )            // 🐷🐷 
    );

    const subscription = click$.subscribe(data => displayLogInScreen(`${data.clicks} clicks: ${JSON.stringify(data.cells)}`));

}