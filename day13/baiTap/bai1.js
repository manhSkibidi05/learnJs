// Bài 1 : truly/falsy kiểm tra 

    export default function getDisplayVal(value){
        if(!value) console.log(`Giá trị '${value}' là Falsy`);
        else console.log(`Giá trị '${value}' là Truly`);
    } 