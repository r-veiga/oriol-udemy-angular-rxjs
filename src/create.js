import { displayLogInScreen } from './utils';
import { Observable } from 'rxjs';

export default () => {
    // 🐷 DEPRECATED 🐷 const hola = Observable.create(function(observer) {
    const hola = new Observable((observer) => {
        observer.next("Hello");
        setTimeout(() => { observer.next("How you doing?"); }, 2 * 1000);
        observer.next("world");
    });

    const subscribe = hola.subscribe(evt => displayLogInScreen(evt));
}