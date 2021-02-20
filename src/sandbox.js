import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export default () => {

    // 🐷🐷 el operador "tap()" crea efectos colaterales en el Observable fuente, 
    // 🐷🐷 devolviendo un Observable idéntico a la fuente
    // 🐷🐷 Cuando quieres modificar algo que no tiene que ver con el flujo de datos (aunque dependa de ello)

    const grid = document.getElementById('grid');
    const click$ = fromEvent(grid, 'click').pipe(
        tap(val => console.log('before: ', val)),
        map(val => [ 
            Math.floor(val.offsetX/50), 
            Math.floor(val.offsetY/50)
        ]),
        tap(val => console.log(`after: , ${val}`))
    );

    const subscription = click$.subscribe(data => displayLog(data));

}