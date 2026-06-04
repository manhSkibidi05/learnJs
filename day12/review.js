// review về import/export 

    // - import : giúp nhập những giá trị được export ở các file khác
    // - export : cho phép xuất những giá trị này sang ở file khác 
    // -> những giá trị export file này khi được import sang file khác và sử dụng nó
    
    // - 2 kiểu export : 
    // + export named : cho phép export nhiều giá trị (biến , hàm ..)
    // -> khi import sử dụng tên biến/hàm lúc export (có thể đổi bằng từ khóa 'as')
    // -> các giá trị đó nằm chung trong dấu '{}' , sau khi import xong có thể gọi ra và sử dụng 

    // + export default : mỗi 1 file chỉ cho phép 1 export default -> chỉ export default 1 giá trị 
    // -> khi export default không cần định nghĩa = tên biến (let , const , var) 
    // -> cần thiết khi export default 1 function declaration , 1 đối tượng bằng cách sử dụng dấu '{}' ngày sau default
    // -> khi import giá trị default cần định nghĩa tên lưu trữ obj chưa được khai báo , đối với hàm sử dụng luôn tên hàm

    // + chú ý :
    // - trong 1 file có thể export named và cả export default 
    // -> có thể vừa import named và default trên cùng 1 câu lệnh 

    // - có thể import tất cả giá trị export named thành 1 đối tượng bằng cách sử dụng : *
    // vd : import * as obj from './tenfile' -> gom tất cả giá trị named export từ file thành 1 đối tượng obj 

