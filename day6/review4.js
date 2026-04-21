// hàm nâng cao 

    // - các loại hàm : 
        // + function declaration : hàm thông thường 
            // đặc điểm : + có hoisting + có arguments + có this riêng 
            // dùng loại hàm này để : + muốn gọi hàm trước khi định nghĩa + làm constructor (hàm tạo) + làm phương thức cho obj/class
            // -> hàm này cơ bản được sử dụng phổ biến do cách viết rõ ràng dễ đọc 
        // + function expression : hàm gán 
            // đặc điểm : + không có hoisting + có this riêng + có arguments
            // dùng loại hàm này để : + gán trực tiếp hàm vào 1 biến
        // + function arrow : hàm mũi tên
            // đặc điểm : + không có hoisting + không có this riêng + không sử dụng argument
            // dùng loại hàm này để : + dùng làm hàm callback + viết những hàm với những logic ngắn gọn 
            // -> hàm này cấu trúc ngắn gọn nhưng hơi khó đọc dùng chỉ trong các trường hợp nhất định
    
    // - hoisting và scope :
        // + hoisting : đặc tính cho phép sử dụng hàm/biến trước khi định nghĩa chúng -> sau khi được định nghĩa biến/hàm sẽ được hoisting lên đầu scope 
            // - biến được hoisting thông qua khai báo = var -> khi sử dụng biến đó trước khi được định nghĩa sẽ = undefined
            // - hàm được hoisting thông qua khai báo = loại hàm function declaration 
        // + scope : vùng có thể hoạt động của 1 biến
            // - global var : biến toàn cục hoạt động trên toàn bộ file code
            // - function var : biến hàm chỉ hoạt động trong hàm
            // - block var : biến khối chỉ hoạt động trong khối 
    
    // - closure (bao đóng) : cách sử dụng hàm như một đối tượng để có thể thao tác và sử dụng dữ liệu private trong hàm thông qua các hàm con bên trong 
        // - dựa trên 2 đặc tính của hàm :
            // + hàm có thể sử dụng biến ở scope bên ngoài mang sang 1 scope khác để thay đổi dữ liệu biến đó
            // + kiểu trả về của 1 hàm có thể là 1 hàm khác bên trong 
                // ->  khi trả về là đối tượng -> tạo ra 1 đối tượng khi gán vào hàm đó với mỗi đối tượng sử dụng dữ liệu phương thức riêng biệt
        // - sử dụng trong trường hợp :
            // + dữ liệu private chỉ thao tác với dữ liệu thông qua phương thức 
            // + tạo ra ít các thể hiện (instance) với các phương thức riêng biệt 
        
    // - hàm bậc cao : giữa trên nguyên tắc first-class citizen (công dân gương mẫu) của 1 hàm trong js
        // + 1 hàm có thể làm 1 tham số cho 1 hàm khác
        // + 1 hàm có thể làm kiểu trả về cho 1 hàm khác
        // + 1 hàm có thể có cả 2 điều đó
        // -> hàm có các đặc điểm trên được gọi là hàm bậc cao

    // - callback : cách sử dụng hàm khi hàm được truyền vào hàm khác làm tham số và hàm đó gọi tham số đó như 1 hàm 
        // - đặc điểm : + dựa trên hàm bậc cao + khi định nghĩa hàm ta truyền tên hàm như 1 tham số -> sử dụng tham số đó như 1 hàm 
            // + khi gọi hàm vừa định nghĩa đó truyền vào hàm đã được định nghĩa vào vị trí tham số đó
        // - dùng trong trường hợp :
            // + hàm đồng bộ : hàm chạy lần lượt từ trái sang phải từ trên xuống dưới -> sử dụng callback với các phương thức định nghĩa sẵn của arr
            // + hàm bất đồng bộ : dùng để xử lí các dữ liệu bên ngoài vào (gọi api , lấy dữ liệu database ...)
                // -> hàm bất đồng bộ sẽ gửi câu lệnh cần thời gian xử lí sang web api để làm trống call stack nhường chỗ cho các câu lệnh phía sau khi call stack rảnh
                // mới gọi lại câu lệnh trên vào . 
                // -> những câu lệnh gây mất thời gian chiếm call stack sẽ chuyển sang web api nhường chỗ cho câu lệnh khác chạy song song 2 câu lệnh tránh gây nghẽn
