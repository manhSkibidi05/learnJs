// Ngày 12 : Module System (import / export) -  Tổ chức code chuyên nghiệp 

    // - Module system - cách chia code thành nhiều file , export/import các thành phần để tái sử dụng và quản lí dự án dễ dàng 
    // - Lưu ý : Module chỉ hoạt động trong môi trường có type = 'module' (trên trình duyệt) hoặc Node.js (với .mjs hoặc 'type' = 'module' trong 
    // package.json) . Trong react việc import / export là bắt buộc hằng ngày .

    // - Mục tiêu : 
    // + Hiểu export default và export named
    // + Biết cách import tương ứng  
    // + Phân biệt khi nào dùng export default , khi nào dùng named export 
    // + Tổ chức code thành nhiều file nhỏ 

// 1 . Các loại export : 2 loại

    // 1.1. Name export 
    // - Có thể xuất nhiều giá trị từ 1 module 
    // - Khi import phải dùng cùng tên (có thể đổi tên bằng 'as')

    // vd : trong 1 module
    export const PI = 3.14;
    export function reverseStr(str){return str.split(``).reverse().join(``)};
    export const checkEven = num => num % 2 === 0;

    // 1.2. Default export 
    // - Mỗi module chỉ có 1 default export 
    // - Khi import có thể đặt tên tùy ý 
    
    // vd : trong 1 module
    export default function add(a , b){return a + b}

// 2 . Các loại import : tương ứng với số loại của export là 2 

    // import named export 
    import {PI , reverseStr , checkEven } from './tên file';
    // -> import sử dụng tên tương ứng lúc export 

    // import named export với alias 
    import {checkEven as isEven} from './tên file';
    // -> import đặt lại tên của giá trị export 

    // import default export 
    import add from './tên file';
    // -> import giá trị default duy nhất của export 

    // import tất cả named export thành 1 object
    import * as obj from './tên file';
    console.log(obj.PI);
    // -> import gộp tất cả các giá trị named của export thành 1 đối tượng 

    // import kết hợp default và named 
    import add , {PI , checkEven} from './tên file';
    // -> import cùng lúc cả default và named export chung 1 lần nhưng đảm bảo các giá trị này chung 1 file 

// 3. vd hoàn chỉnh 
// 4. Khi nào dùng default export , khi nào dùng named ? 

    // - Tình huống : 
    // + File chỉ export một thứ duy nhất (một hàm / một class)  -> export default 
    // + File export cần nhiều hàm / hằng số liên quan -> export named
    // + Thư viện tiện ích (utility) -> export named (dễ import chọn lọc)
    // + component react -> default export (phổ biến) hoặc named (tùy style)



