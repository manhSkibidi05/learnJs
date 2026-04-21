// __________________________HÀM NÂNG CAO______________________________

// PHẦN 3 : CLOSURE (BAO ĐÓNG) - KHÁI NIỆM QUAN TRONG NHẤT
    // - closure khả năng của 1 hàm ghi nhớ và truy cập biến từ phạm vi bên ngoài nới nó được định nghĩa , ngay cả khi hàm đó được thực thi ở một phạm vi khác 
    // - closure = hàm + môi trường biến xung quanh nó 

    // hàm lớn
    function outer() {
        // biến thông báo -> biến private chỉ sử dụng bên trong hàm
        let message = "Hello from outer!";
        
        // inner function là closure
        // hàm con
        function inner() {
            // gọi dữ liệu của biến tb
            console.log(message + " alo"); // Truy cập biến của outer
        }
        
        // trả về hàm con
        return inner;
    }

    // gán 1 biến = hàm con được trả về 
    const myFunc = outer(); // outer đã chạy xong
    // console.log(outer())
    // đây là 1 hàm = hàm con nên sử dụng dc dữ liệu private của hàm lớn 
    myFunc(); // "Hello from outer!" - vẫn nhớ message!

    // - Closure là 1 đặc tính của hàm giống với đặc điểm đóng gói trong hướng đối tượng 
        // + closure đặc tính về việc sử dụng nhiều hàm con bên trong hàm lớn 
        // + với các biến của hàm lớn -> lúc này hàm con có thể lấy, sử dụng và thay đổi nó 
        // + khi gọi ra hàm lớn -> biến được gán với hàm lớn này sẽ tạo ra các hàm con và sử dụng các hàm con thông qua biến này 
    // - Với những đặc tính vậy nên sử dụng closure khi :
        // + cần dữ liệu private chỉ sử dụng trong hàm 
        // + định nghĩa các module nhỏ
        // + performance với ít số lượng instances cần tạo ra  
            // -> performance : hiệu suất làm việc của code : thời gian chạy + bộ nhớ tiêu tốn + trải nghiệm người dùng 
            // -> instances :  đối tượng tạo ra mỗi lần gọi 
        // -> khi tạo ra 1 hàm với closure thì sẽ tạo ra số lượng hàm con tương ứng -> khi tạo nhiều hàm lớn tương ứng vậy số hàm con tạo ra 
    
    // hàm thay đổi thời gian
    function changeTime(){
        // 2 biến private khai báo trong hàm = giờ và phút hiện tại
        let hours = new Date().getHours();
        let mins = new Date().getMinutes();
        
        // dữ liệu trả về là 1 đối tượng -> vì đối tượng chứa được nhiều các hàm và các hàm có thể lấy dữ liệu bên ngoài môi trường nó 
        return {
            // hàm thay đổi giờ
            setHour(hour = 0){
                console.log(`đổi giờ thành công`);
                return hours = hour;
            },
            // hàm thay đổi phút
            setMin(min = 0){
                console.log(`đổi phút thành công`);
                return mins = min;
            },
            // hàm trả về thời gian hiện tại
            getTime(){
                return `${hours}:${mins}`;
            }
        }
    }
    // tạo ra 1 thể hiện 
    const timeChina = changeTime();
    // tạo ra 1 thể hiện khác với 2 không gian lưu trữ khác nhau không ảnh hưởng đến thể hiện còn lại 
    const timeVietNam = changeTime();
    // gọi các phương thức của thể hiện -> tác động tới dữ liệu private
    console.log(timeChina.setHour(4));
    console.log(timeChina.getTime());
    console.log(timeVietNam.getTime());

// PHẦN 4 : HIGHER-ORDER FUNCTIONS (HÀM BẬC CAO)
    // - hàm bậc cao có thể :
        // + nhận hàm khác làm tham số
        // + trả về một hàm 
        // + một hàm bậc cao có thể chứa hàm làm tham số và trả về là một hàm 

    // có 1 hàm với 2 tham số truyền vào
    function processNumbers(numbers , caculator){
        // mảng rỗng
        let arr = [];
        // duyệt mảng truyền vào
        for(number of numbers){
            // tính toán các dữ liệu cho mảng truyền vào bằng hàm cal
            let newNumber = caculator(number);
            // đẩy nó vào mảng rỗng
            arr.push(newNumber);
        }
        // trả về mảng
        return arr;
    }
    // mảng số
    let arrNumbers = [2,3,4,5,6,7,8];
    // hàm nhân đôi các dữ liệu
    function caculator(n){
        return n * 2;
    }
    // gọi ra hàm truyền vào tham số là 1 mảng và 1 hàm
    console.log(processNumbers(arrNumbers,caculator));