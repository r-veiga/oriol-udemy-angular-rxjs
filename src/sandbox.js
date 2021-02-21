import { displayLog } from './utils';
import { fromEvent } from 'rxjs';
import { distinct, distinctUntilChanged, map, takeWhile, tap } from 'rxjs/operators';

export default () => {

    // 🐷🐷 "distinct()" sólo deja pasar ítems diferentes a los ya emitidos en el pasado (todo el histórico)
    // 🐷🐷              Ojo con los objetos, si sus direcciones de memoria son diferentes (da igual que todas sus propiedades sean iguales)
    // 🐷🐷              tratar con tipos simples como números es mucho más sencillo
    // 🐷🐷              Se puede pasar a "distinct()" una función para seleccionar el valor a chequear como distinto
    // 🐷🐷 "distinctUntilChanged()" sólo pasa un ítem si es distinto al emitido inmediatamente anterior
    // 🐷🐷                          puede pasarse una función seleccionando qué información se compara, debe recibir el elemento actual y el anterior

    const grid = document.getElementById('grid');
    const click$ = fromEvent(grid, 'click').pipe(
        map(val => [ 
            Math.floor(val.offsetX/50), 
            Math.floor(val.offsetY/50)
        ]),
        takeWhile( ([col, row]) => col != 0 ),
        tap(val => console.log(`celda: [${val}]`)),
        distinctUntilChanged( ([column1, row1], [column2, row2]) => (column1 == column2) && (row1 == row2) )  // 🐷🐷 
    );

    const subscription = click$.subscribe(data => displayLog(data));

}