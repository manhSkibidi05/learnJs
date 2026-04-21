// Phần 1 : Các loại hàm 

    // - function declaration : hàm thông thường
        // - các ưu và nhược điểm : + hàm này có hoisting + hàm có arguments + có this riêng + viết code hơi dài dòng 
        // - dùng trong các trường hợp : + muốn gọi hàm trước khi định nghĩa + dùng làm phương thức trong obj/class + dùng làm constructor 
        // -> hàm này giúp dễ nhìn dê đọc code và fixbug nên dùng trong nhiều trường hợp

    // - function expression : hàm gán 
        // - các ưu và nhược điểm : + hàm này không có hoisting + có this riêng + có arguments 
        // - dùng trong các trường hợp : + sử dụng để gán luôn cho 1 biến

    // - function arrow : hàm mũi tên 
        // - các ưu và nhược điểm : + không có hoisting + không có this riêng + không sử dụng arguments + viết code ngắn gọn
        // - dùng trong các trường hợp : + sử dụng làm hàm callback + 
        // -> hàm này ngắn gọn nên phù hợp với những logic nhanh 1 dòng 

// Phần 2 : scope và hoisting 

    // - scope : phạm vi hoạt động của biến khi khai báo 
        // + biến global : được khai báo phạm vi ngoài cùng được sử dụng trên toàn bộ file
        // + biến function : được khai báo trong 1 hàm chỉ dùng được bên trong hàm đó 
        // + biến block : được khai báo trong khối lệnh nhất định {} chỉ sử dụng bên trong khối lệnh đó
    // - hoisting : các loại biến hoặc hàm có hoisting sẽ có thể được sử dụng trước khi định nghĩa nó
        // -> lúc này sau khi định nghĩa biến hoặc hàm có hoisting sẽ được hoisting lên đầu scope của nó
        // -> biến được khai báo bởi var , hàm sử dụng hàm declaration 

// Phần 3 : closure (bao đóng)

    // - closure : đặc tính của hàm có thể cho phép truy cập và sử dụng biến bên ngoài scope của hàm đó
    // - cách hoạt động của closure : +  với biến được khai báo trong 1 hàm thì biến đó được coi là biến private chỉ sử dụng bên trong hàm đó
        // + khi muốn sử dụng biến trong hàm đó -> khai báo các hàm con bên trong hàm lớn 
        // + các hàm con sẽ là kết quả trả về của hàm lớn -> các hàm con có thể tương tác thay dổi dữ liệu các biến lưu trữ trong hàm lớn (vì nằm ngoài scope hàm con)
    // - ưu và nhược điểm : + tạo ra thể hiện nhưng mỗi thể hiện mang phương thức khác + muốn có các dữ liệu bảo mật + kế thừa phức tạp 
    // - dùng trong các trường hợp : + tạo ra ít các thể hiện 

// Phần 4 : hàm bậc cao 

    // - hàm trong js là một công dân gương mẫu :
        // + hàm được sử dụng làm tham số cho 1 hàm khác
        // + hàm được trả về bởi hàm khác
        // + và hàm có thể có cả 2 đặc điểm trên
    // -> đây được gọi là hàm bậc cao trong js

// Phần 5 : callback

    // - callback là một cách sử dụng hàm -> khi truyền hàm làm tham số trong hàm khác rồi gọi lại hàm đó
    // - callback sử dụng với 2 loại kiểu hàm : hàm đồng bộ và hàm bất đồng bộ
        // + hàm đồng bộ : là hàm thông thường tron js chạy tuần tự khi hàm được gọi
        // + hàm bất đồng bộ : hàm chạy khi rảnh 
    