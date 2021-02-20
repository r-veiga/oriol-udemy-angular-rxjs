import { displayLog } from './utils';
import { fromEvent } from "rxjs";

export default () => {

    const grid = document.getElementById('grid');
    
    const click$ = fromEvent(grid, 'click');
    const subscription = click$.subscribe(data => console.log(data));
    
}