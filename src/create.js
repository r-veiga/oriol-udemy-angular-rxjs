import { displayLogInScreen } from './utils';
import { interval } from "rxjs";

export default () => {

    // 🐷🐷 interval(500) empieza a contar desde cero: 0, 1, 2, 3, 4,...
    // 🐷🐷 incrementando 1 cada 0.5 segundos

    const source = interval(500);
    const subscription = source.subscribe(data => displayLogInScreen(data));
    setTimeout(() => { subscription.unsubscribe(); }, 3 * 1000);

}