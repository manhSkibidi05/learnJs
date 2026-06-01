// file calculator.js cho phép export named và export default

    export default function createCal(initialVal){
        return {
            add10(){
                return initialVal += 10;
            },

            time10(){
                return initialVal *=10;
            }
        }
        
    }

    export const PI = 3.14;
    export const E = 2.718;