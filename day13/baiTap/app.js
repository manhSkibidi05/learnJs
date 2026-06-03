// App.js import và chạy các file khác 

// Bài 1 :  
    import getDisplayVal from './bai1.js';
    getDisplayVal(0);
    getDisplayVal(1);
    getDisplayVal('');
    getDisplayVal('hi lo');
    getDisplayVal([]);
    getDisplayVal(null);
    getDisplayVal(undefined);

// Bài 2 : 
    import check from './bai2.js';
    console.log(check(''));
    console.log(check(0));
    console.log(check(null));
    console.log(check({name : 'aba'}));

// Bài 5 : 
    import {checkNullish , checkShortCiruit} from './bai5.js';
    checkNullish(0 , 'mặc định 1');
    checkShortCiruit(0 , 'mặc định 1');

    checkNullish(null , 'mặc định 2');
    checkShortCiruit(null , 'mặc định 2');

    checkNullish({name : 'abe'} , 'mặc định 1');
    checkShortCiruit({name : 'abe'} , 'mặc định 1');
