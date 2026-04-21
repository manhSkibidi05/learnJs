// 5. Debounce và throttle 

    // - vấn đề cần giải quyết : khi người dùng tương tác với giao diện (gõ phím , cuộn chuột , resize cửa sổ..) các sự kiện được kích hoạt nhiều lần trong thời gian 
    // ngắn . Nếu mỗi lần như vậy mà đều phải gọi hàm xử lí (vd : gọi api , tính toán nặng ..) nó sẽ gây quá tải , chậm chạp và tốn tài nguyên cho web
    // -> debounce và throttle là 2 kĩ thuật kiểm soát số lần gọi hàm trong một khoảng thời gian 

    // 5.1. debounce (trì hoãn - `gọi sau khi yên lặng`)
    // 5.1.1 : cơ chế hoạt động 
        // - debounce đảm bảo chỉ được gọi 1 lần duy nhất sau một khoảng thời gian trì hoãn kể từ lần kích hoạt cuối cùng 

        // - thiết lập debounce : 
        function debounce(func, delay) {
            let timeoutId;
            return function(...args) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                }, delay);
            };
        }

        // - giải thích đoạn code trên : 
            // + khởi tạo hàm debounce(func , delay) -> hàm debounce với 2 tham số là :  func là  1 hàm cần debounce , delay là số thời gian cần chạy trước khi hàm chạy
            // + let timeoutId : khởi tạo hàm timeoutId để chứa id của hàm setTimeout() -> lúc này giá trị ban đầu là undifined nhưng khi được chạy trong các hàm khác 
            // trong hàm debounce nhờ đặc tính closure của hàm nên biến sẽ được lưu trữ giá trị khi xảy ra trong hàm khác 
            // + return function(...args){} : trả về hàm khác để xử lí dữ liệu với tham số truyền vào sử dụng rest parameter nhận tất cả đối số truyền vào khi gọi 
            // + clearTimeout(timeoutId) : là phương thức của timeout nhằm để xóa id của hàm timeout cũ nếu có -> lúc này hàm timeout cũ sẽ không được chạy nữa 
            // + timeoutId = setTimeout(() => {}) : gán id của hàm timeout vào biến timeoutId lúc này nếu có hàm debounce được gọi sau sẽ xóa id của hàm timeout này
            // + func.apply(this , args) : dùng để gọi hàm func đã truyền vào với this : giá trị this của hàm debounced ( context tại thời điểm được gọi) , args là các
            // đối số thu thập ở lúc return hàm 

        // Hàm cần debounce
        function log(message) {
            console.log(message, new Date().toLocaleTimeString());
        }

        // Tạo phiên bản debounce (chờ 1000ms)
        const debouncedLog = debounce(log, 1000);

        // Gọi nhiều lần liên tiếp
        debouncedLog("App"); // lần 1
        debouncedLog("Appl"); // lần 2 (sau 100ms)
        debouncedLog("Apple"); // lần 3 (sau 100ms)
        // Chỉ có "C" được in ra sau 1 giây kể từ lần gọi cuối cùng.

        // - debounce giúp cho việc trì hoãn việc chạy 1 hàm nếu như hàm đó vẫn còn được gọi -> khi không còn được gọi nữa hàm cuối cùng được gọi sẽ được chạy sau số
        // thời gian quy định
            // - dùng khi : + các thao tác cần gọi quá nhiều hàm trong 1 khoảng thời gian ngắn
                // + thực thi hàm cuối cùng với tham số cuối cùng và sau thời gian quy định

    // 5.2. throttle (điều tiết - `gọi có nhịp`)
    // 5.2.1. cơ chế hoạt động 
        // - hàm throttle dùng để giới hạn số lần thực thi của 1 hàm , đảm bảo hàm đó chỉ được gọi tối đa một lần trong khoảng thời gian xác định 
        // - khác với debounce chỉ chạy hàm sau khi dừng hẳn , throttle đảm bảo hàm được thực thi ngay lập tức và sau đó phải chờ đủ thời gian quy định mới được gọi tiếp

        // thiết lập throttle : 
        function throttle(func, limit) {
            let inThrottle;                       // (1)
            return function(...args) {            // (2)
                if (!inThrottle) {                // (3)
                    func.apply(this, args);       // (4)
                    inThrottle = true;            // (5)
                    setTimeout(() => {            // (6)
                        inThrottle = false;       // (7)
                    }, limit);
                }
            };
        };

        // - giải thích cách hoạt động của code trên : 
            // + tạo hàm throttle với 2 tham số -> func là 1 hàm cần throttle (cần chạy đúng nhịp chỉ chạy sau thời gian quy định) , limit : thời gian quy định chạy 1 hàm
            // + let inThrottle : khởi tạo cờ với giá trị ban đầu undefined mang giá trị false -> nhờ đặc tính closure thì có thể thay đổi giá trị cờ sau thời gian quy định
            // + return function (...args) : hàm throttle trả về hàm khác với đối số là rest parameter (khi gọi hàm cho phép nhận nhiều tham số truyền vào không giới hạn)
            // + if(!inThrottle) : kiểm tra cờ -> nếu đang false lúc này hàm chưa được chạy nên sẽ chạy hàm 
            // + func.apply(this,args) : gọi hàm cần thực thi truyền vào các tham số được nhận bởi hàm return 
            // + inThrottle = true : thay đổi giá trị của cờ lúc này cho biết được rằng hàm đã chạy rồi 
            // + setTimeout(()=>{inthrottle = false}) : đặt timeout cho cờ thay đổi sau limit giây -> nếu hàm được gọi trước số giây đó thì hàm sẽ không được thực thi 

            // hàm cần throttle :
            function thongBao(message){
                console.log(message);
            } 
            
            const throttleLog = throttle(thongBao , 1000);

            throttleLog(`thông báo đầu`);
            throttleLog(`thông báo 2`);
            throttleLog(`thông báo 3`);
            setTimeout(()=>{
                throttleLog(`thông báo 4`)
            },1100)

            // - throttle giúp các hàm chỉ thực hiện đều sau khoảng thời gian nhất định nếu gọi quá nhiều hàm trong khoảng thời gian đó thì sẽ không được chạy 
                // - dùng khi : + khi gọi quá nhiều hàm trong khoảng thời gian
                    // + hàm sẽ được chạy luôn ngay lần đầu và đợi sau thời gian quy định mới có thể chạy tiếp hàm đó
        