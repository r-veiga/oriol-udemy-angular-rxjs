import { displayLogInScreen } from './utils';
import { interval, timer } from "rxjs";

export default () => {

    // 🐷🐷 interval(500) empieza a contar desde cero: 0, 1, 2, 3, 4,...
    // 🐷🐷 incrementando 1 cada 0.5 segundos

    const source = interval(500);
    const subscription = source.subscribe(data => displayLogInScreen(data));
    
    // 🐷🐷 timer() es como setTimeout(), pero mejor
    // setTimeout(() => { subscription.unsubscribe(); }, 3 * 1000);  
    timer(3 * 1000).subscribe(() => subscription.unsubscribe());

    const source2 = timer(4 * 1000, 100); // 🐷🐷 delay de 4 segundos antes de lanzar cada 0.1 segundos
    const subscription2 = source2.subscribe(data => displayLogInScreen(`2 - ${data}`));
    timer(6 * 1000).subscribe( () => subscription2.unsubscribe() );
}