// file main.js -> cho phép import các giá trị từ export 

    // bài 1
    import {capitalize , reverseStr , countWord as count} from './string.js';

    console.log(`Sử dụng các hàm import từ string.js`);
    console.log(capitalize('goodbYe'));
    console.log(reverseStr('workaholic'));
    console.log(count('god is good'));

    // bài 2
    // khi import cần thêm tên để lưu trữ giá trị từ export default
    import storageNew from './storage.js';

    console.log(`Sử dụng đối tượng import từ storage.js`);
    console.log(storageNew.name)

    // bài 3
    import {fetchUsers , checkVal} from './api.js';

    checkVal(0).then(val => console.log(val)).catch(err => console.log(err.message));

    // bài 4
    import createCal , {PI , E} from './calculator.js';
    console.log(E);
    let cal = createCal(10);
    console.log(cal.add10());
    console.log(cal.time10());

    // bài 5
    import * as Utils from './utils.js';
    console.log(Utils.randomInt())
    
    function sayHi(word){
        return `hi ${word}`;
    }
    let debounceSayHi = Utils.debounce(sayHi , 1000);
    console.log(debounceSayHi(`thanh nhàn`))