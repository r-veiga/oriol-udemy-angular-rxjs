import { displayLogInScreen } from './utils';
import { from } from 'rxjs';

export default () => {
    //🐷🐷 Ejemplo previo
    //🐷🐷
    // const myArray = [1,2,3,4,5]; 
    // const observable1 = from(myArray);
    // const subscription1 = observable1.subscribe(val => displayLogInScreen(val));
    //
    // const myString = 'Hello world';
    // const observable2 = from(myString);
    // const subscription2 = observable2.subscribe(val => displayLogInScreen(val));
    
    const myPromise = new Promise(resolve => 
        setTimeout(() => {
            resolve('Hello World')
        }
        , 2 * 1000));
        
    //🐷🐷 El uso habitual del operador from() 
    //🐷🐷 es convertir PROMISE en OBSERVABLE
    const observable = from(myPromise);
    const subscription = observable.subscribe(val => displayLogInScreen(val));
}