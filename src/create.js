import { displayLogInScreen } from './utils';
import { of, range } from "rxjs";

export default () => {

    // 🐷🐷 ".of(...) es para una sucesión de elementos variopintos
    // 🐷🐷 ".range(x1, x2) me genera los valores en el intervalo desde x1 a x2

    const source1 = of(10,20,30,40,50,60);
    const subscription1 = source1.subscribe(data => displayLogInScreen(data));

    const source2 = of(
                        [1,2,3]                                         // 🐷🐷 array 
                        ,'Hello world'                                  // 🐷🐷 string
                        ,{ foo: "bar" }                                 // 🐷🐷 objeto
                        , function sayHello() { return 'Hi there!'}     // 🐷🐷 función
                    );
    const subscription2 = source2.subscribe(data => displayLogInScreen(data));
    
    const source3 = range(91, 10); // 🐷🐷 desde el 91 los 10 siguientes (del 91 al 100) 
    const subscription3 = source3.subscribe(data => displayLogInScreen(data));
}