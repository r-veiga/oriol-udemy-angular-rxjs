import { displayLogInScreen } from './utils';
import { from } from 'rxjs';

export default () => {

    const myArray = [1,2,3,4,5]; 
    const myString = 'Hello world';

    const observable1 = from(myArray);
    const subscription1 = observable1.subscribe(val => displayLogInScreen(val));

    const observable2 = from(myString);
    const subscription2 = observable2.subscribe(val => displayLogInScreen(val));

}