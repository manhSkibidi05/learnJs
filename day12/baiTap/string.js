// file string.js chứa các hàm thay đổi string -> cho phép export hàm đó

    export function capitalize(str){
        str = str.toLowerCase();
        str[0].toUpperCase();
        return  str;
    }

    export function reverseStr(str){
        return str.split('').reverse().join('');
    }

    export function countWord(str){
        let count = 0;
        for(let char of str){
            if(char) count ++;
        }
        return count;
    }
