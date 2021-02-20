import { displayLog as displayLogInScreen } from './utils';
import { fromEvent } from 'rxjs';
import { first, map } from 'rxjs/operators';

export default () => {

    // 🐷🐷 "first()" cuando sólo quiero el primer elemento emitido, ignora los demás

    const grid = document.getElementById('grid');
    const click$ = fromEvent(grid, 'click').pipe(
        map(val => [ 
            Math.floor(val.offsetX/50), 
            Math.floor(val.offsetY/50)
        ]), 
        first() // 🐷🐷
    );

    const subscription = click$.subscribe(data => displayLogInScreen(data));

}