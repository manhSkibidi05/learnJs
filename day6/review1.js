// Hàm nâng cao 
// - Các loại hàm :
    // + function declaration : hàm thông thường -> cú pháp : function ten_ham(tham_so){code}
        // - đặc điểm : + có được hoisting
            // + có arguments
            // + có this riêng 
        // - sử dụng hàm này có lợi ích gì và khi nào nên sử dụng :
            // + khi cần gọi hàm trước khi định nghĩa hàm đó
            // + cấu trúc đơn giản dễ đọc
            // + dùng làm constructor 
            // + dùng làm các phương thức cho class/object
            // + dùng khi sử dụng hàm đệ quy
        // -> sử dụng trong nhiều trường hợp vì tính đơn giản dễ đọc của hàm 

    // + function expression : hàm gán -> cú pháp : const ten_ham = function(tham_so){code}
        // - đặc điểm : + không được hoisting
            // + có arguments
            // + có this riêng
        // -> sử dụng hàm này khi gán vào biến cụ thể 

    // + function arrow : hàm mũi tên -> cú pháp : const ten_ham = tham_so => code;
        // - đặc điểm : + không được hoisting
            // + không có arguments -> sử dụng rest operator thay cho nó
            // + không có this riêng -> phụ thuộc this scope bên ngoài
        // - sử dụng hàm này có lợi ích gì và khi nào nên sử dụng :
            // + khi trả về dữ liệu hoặc biểu thức đơn giản 
            // + hàm code nhanh gọn

// - scope và hoisting trong hàm :
    // - scope là phạm vi sử dụng biến : 3 phạm vi
        // + global scope : biến toàn cục -> có thể gọi bất cứ đâu
        // + function scope : biến hàm -> chỉ có thể gọi và sử dụng trong hàm đó 
        // + block scope : biến khối -> chỉ có thể gọi và sử dụng trong khối {} 
    // - hoisting : nếu hàm hoặc biến có hoisting sẽ được đẩy lên đầu scope mặc dù có thể định nghĩa nó sau 
    // -> giúp cho việc chưa cần định nghĩa hàm/biến vẫn có thể gọi và sử dụng mà không gây lỗi
    // -> khai báo hàm là : function declaration ,khai báo biến là : var 
