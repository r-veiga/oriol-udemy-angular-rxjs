import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { distinct, map, takeWhile, tap } from 'rxjs/operators';

export default () => {

    // 🐷🐷 "distinct()" sólo deja pasar ítems diferentes a los ya emitidos en el pasado

    const grid = document.getElementById('grid');
    const click$ = fromEvent(grid, 'click').pipe(
        map(val => [ 
            Math.floor(val.offsetX/50), 
            Math.floor(val.offsetY/50)
        ]),
        takeWhile( ([col, row]) => col != 0 ),
        tap(val => console.log(`cell: [${val}]`)),
        map(([col, row]) => col+row),
        tap(val => console.log('sum of col + row is:', val)),
        distinct()  // 🐷🐷 sólo distintos para un valor numérico simple de suma de fila + columna   
    );

    const subscription = click$.subscribe(data => displayLog(data));

}