import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { distinct, map, takeWhile, tap } from 'rxjs/operators';

export default () => {

    // 🐷🐷 "distinct()" sólo deja pasar ítems diferentes a los ya emitidos en el pasado
    // 🐷🐷              Ojo con los objetos, si sus direcciones de memoria son diferentes (da igual que todas sus propiedades sean iguales)
    // 🐷🐷              tratar con tipos simples como números es mucho más sencillo

    const grid = document.getElementById('grid');
    const click$ = fromEvent(grid, 'click').pipe(
        map(val => [ 
            Math.floor(val.offsetX/50), 
            Math.floor(val.offsetY/50)
        ]),
        takeWhile( ([col, row]) => col != 0 ),
        tap(val => console.log(`celda: [${val}]`)),
        distinct()  // 🐷🐷 no se repiten, los objetos creados se consideran distintos   
    );

    const subscription = click$.subscribe(data => displayLog(data));

}