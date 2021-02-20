import { displayLog } from './utils';
import { fromEvent } from "rxjs";
import { map, filter } from "rxjs/operators";

export default () => {

    // 🐷🐷 Los operadores, dentro de "pipe"
    // 🐷🐷 "mapTo()" devuelve siempre el mismo valor cualquiera que sea la entrada
    // 🐷🐷 "map()" aplica una función a cada valor emitido, 
    // 🐷🐷         en este caso casilla en que hago click [x,y] pq. cada casilla es 50x50 píxeles
    // 🐷🐷 "filter()" filtra y sólo pasan los emitidos que cumplan la condición dada
    // 🐷🐷         en este caso sólo las casillas blancas en el damero
    
    const grid = document.getElementById('grid');
    
    const click$ = fromEvent(grid, 'click').pipe(
        map(val => [
            Math.floor(val.offsetX / 50), 
            Math.floor(val.offsetY / 50)
        ]), 
        filter(val => (val[0] + val[1]) % 2 === 0) // 🐷🐷
    );
    const subscription = click$.subscribe(data => console.log(data));


}