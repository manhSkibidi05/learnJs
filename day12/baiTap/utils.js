// file utils.js 

    export function randomInt(){
        let num = Math.floor(Math.random()*1000);
        return num;
    }

    export function debounce(func , delay){
        let idTimeout;
        return function(...args){
            clearTimeout(idTimeout);
            idTimeout = setTimeout(() => {
                func.apply(this , args)
            },delay)
        }
    }

    export function throttle(func , delay){
        let check = true;
        return function(...args){
            if(check){
                func.apply(this , args);
                check = false;
            } 
            setTimeout(() => {
                check = true;
            },delay)
        }
    }