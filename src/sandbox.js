import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { map, startWith, takeWhile, tap } from 'rxjs/operators';

export default () => {

    // 🐷🐷 "startWith()" el Observer introduce los ítems pasados como parámetro
    // 🐷🐷               antes de proceder a leer los ítems emitidos por la fuente Observable
    // 🐷🐷               Ojo, que startWith() lo pongo después del stream que me he definido

    const grid = document.getElementById('grid');
    const click$ = fromEvent(grid, 'click').pipe(
        map(val => [ 
            Math.floor(val.offsetX/50), 
            Math.floor(val.offsetY/50)
        ]),
        takeWhile( ([col, row]) => col != 0 ),
        tap(val => console.log(`cell: [${val}]`)),
        startWith("dimensiones del grid: ", "10x10 casillas")  // 🐷🐷
    );

    const subscription = click$.subscribe(data => displayLog(data));

}