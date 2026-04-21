// Bài tập callback 

// Bài 1.1 : hello callback

console.log(`___________BÀI 1.1___________`);
function greet(name ,callback){
    console.log(`chào ${name}`);
    callback(name);
};

greet(`bằng` , name => console.log(`anh tên là ${name}`));

// Bài 1.2 : tính toán với callback

console.log(`___________BÀI 1.2___________`);
function calculate(a , b , operation){
    return operation(a , b);
}

console.log(`nhân : ${calculate(5,10 , (a , b) => a * b)}`);
console.log(`chia : ${calculate(5,10 , (a , b) => a / b)}`);
console.log(`cộng : ${calculate(5,10 , (a , b) => a + b)}`);

// Bài 1.3 : mảng và callback

console.log(`___________BÀI 1.3___________`);
function processArray(arr , callback){
    let newArr = [];
    for(value of arr){
        let newValue = callback(value);
        newArr.push(newValue);
    }
    return newArr;
}

const lego = [`wukong`,`pig`,`dragon`,`hourses`,`cutest`];
console.log(lego)
console.log(processArray(lego , value => value.toUpperCase()));

// Bài 1.4 : filter với callback

console.log(`___________BÀI 1.4___________`);
function filterArray(arr , callback){
    let newArr = [];
    for(value of arr){
        let validValue = callback(value);
        if(validValue){
            newArr.push(validValue);
        }
    }
    return newArr;
}

console.log(filterArray(lego, a => a.length === 6 ? value : ""));

