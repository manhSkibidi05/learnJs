// file main là nơi import các giá trị export từ các file khác

import checkEven , {add , PI} from './math.js';
console.log(PI);
console.log(checkEven(2));

import {reverseStr as rStr} from './format.js';
console.log(rStr('hello world'));