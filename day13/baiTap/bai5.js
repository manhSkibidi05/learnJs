// Bài 5 : Nullish coalescing 

    export function checkNullish(value , defaultValue){
        console.log( value ?? defaultValue);
    }

    export function checkShortCiruit(value , defaultValue){
        console.log(value || defaultValue);
    }
    