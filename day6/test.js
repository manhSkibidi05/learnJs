// Hàm bình thường
function add(a, b, c) {
    return a + b + c;
}

// Currying
function curriedAdd(a) {
    return function(b) {
        return function(c) {
            return a + b + c;
        };
    };
}

console.log(curriedAdd(1)(2)(3)); // 6

// Với arrow function
const curriedAddArrow = a => b => c => a + b + c;
console.log(curriedAddArrow(1)(2)(3)); // 6

// 
function nhan(a, b, c){
    return a*b*c;
}

function nhanCurrying(a){
    return function(b){
        return function(c){
            return a*b*c;
        }
    }
}