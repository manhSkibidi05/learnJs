// Closure : Bao đóng là một đặc điểm của hàm 
    // - Đặc điểm :
    // -> các dữ liệu khi được khai báo bên trong hàm sẽ luôn private 
    // -> để sử dụng , lấy các dữ liệu đó ra khỏi hàm ta dùng đặc điểm closure(bao đóng) này của hàm

    // - Cách hoạt động : 
    // - trong 1 hàm khi khai báo 1 biến ta đang cho nó vùng nhớ closure 
        // -> khởi tạo 1 hàm con trong hàm lớn lúc này có thể sử dụng/thay đổi dữ liệu đó 
    
    // - Nhược điểm :
    // - mỗi lần gọi ra hàm có closure thì lúc này đang khởi tạo 1 thể hiện (instance) tùy vào số hàm con trong nó mà khởi tạo bấy nhiêu
        // -> tạo nhiều thể hiện gây tốn bộ nhớ 
        // -> kế thừa phức tạp
    
// Hàm bậc cao : 
    // - trong 1 hàm thì tham số truyền vào có thể là 1 hàm khác
    // - dữ liệu trả về cũng có thể là 1 hàm khác
    // - cả 2 tham số truyền vào và dữ liệu trả về là 1 hàm
