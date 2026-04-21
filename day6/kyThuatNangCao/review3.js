// debounce và throttle 
    // - là 2 kỹ thuật sử dụng để kiểm soát số lần gọi hàm trong 1 khoảng thời gian nhất định 

    // - debounce : là kỹ thuật kiểm soát số lần gọi hàm trong 1 khoảng thời gian lúc này hàm được debounce sẽ chỉ chạy sau khi không còn thao tác gọi trong khoảng
    // thời gian kế tiếp -> chỉ chạy hàm cuối cùng sau thời gian chờ

        // - dùng khi : + gọi nhiều hàm 1 lần nhưng không chạy chỉ chạy hàm cuối cùng
            // + với những dữ liệu trả về liên tục nhưng chỉ nhận dữ liệu cuối
            // + nhập form tìm kiếm chỉ khi ngừng đánh máy thì sẽ hiện kết quả

        // - định nghĩa : 

        function debounce(func , timeout){
            let timeoutId; //(1)
            return function(...args){ //(2)
                clearTimeout(timeoutId); //(3)
                timeoutId = setTimeout(()=>{ //(4)
                    func.apply(this , args) //(5)
                },timeout)
            }
        }

        function payMoney(moneys){
            console.log(`${moneys} losing...`);
        }

        const debouncePay = debounce(payMoney , 1000);
        debouncePay(`100.000d`);
        debouncePay(`200.000d`);
        debouncePay(`500.000d`);

        // - (1) : khởi tạo biến timeoutId nếu như là lần đầu gọi hàm -> với các lần gọi hàm sau timeoutId đã có dữ liệu về id của lần setTimeout trước 
        // - (2) : trả về hàm với tham số nhận là 1 mảng các giá trị truyền vào -> gán vào 1 biến sẽ nhận hàm này và lúc gọi phải truyền tham số 
        // - (3) : hàm clearTimeout() giúp việc xóa bỏ setTimeout đang được chạy trước đó 
        // - (4) : gán id của setTimeout() nếu có hàm sau gọi tiếp sẽ xóa bỏ id của lần setTimeout này -> chỉ lấy lần setTimeout cuối
        // - (5) : sau khi chạy xong timeout hàm callback chạy : hàm cần debounce sử dụng phương thức apply() -> cho phép nhận than số của hàm return tại thời điểm gọi

    // - throttle : là kỹ thuật kiểm soát số lần gọi hàm trong 1 khoảng thời gian lúc này hàm được throttle sẽ chạy ngay lần đầu tiên gọi nhưng sẽ chỉ chạy lần tiếp
    // theo sau 1 khoảng thời gian quy định -> kể cả có gọi nhiều lần hàm trước khoảng thời gian đó hàm vẫn không được thực thi 
        
        // - dùng khi : + hàm chạy liên tục nhưng theo nhịp độ nhất định
            // + thực hiện 1 thao tác liên tục nhưng dữ liệu chỉ đổi khi chạy đúng thời gian 
            // + cập nhật liên tục trong quá trình nhưng không làm quá tải

        // - định nghĩa : 

        function throttle(func , timeout){
            let frag; //(1)
            return function(...args){ //(2)
                if(!frag){
                    func.apply(this , args); //(3)
                    frag = true; //(4)
                    setTimeout(()=>{ //(5)
                        frag = false;
                    },timeout)
                }
            }
        }

        function getPrize(prize){
            console.log(`${prize} here we go..`);
        } 

        const throttlePrize = throttle(getPrize , 1500);
        throttlePrize(`prize first`);
        throttlePrize(`prize second`);
        throttlePrize(`prize thrid`);
        setTimeout(()=>{
            throttlePrize(`prize four`);
        },1600)
        
        // - (1) : khởi tạo biến cờ với lần đầu gọi hàm -> với lần đầu giá trị là undefined là giá trị false lúc này có thể chạy hàm ngay lần đầu 
        // - (2) : trả về là 1 hàm -> thực hiện các thao tác bên trong 1 hàm khác để giữ biến private mà có thể thay đổi giá trị thông qua các hàm khác 
        // - (3) : hàm chạy ngay lần đầu tiên khi kiểm tra cờ đang ở trạng thái fasle -> với các tham số của hàm return tại thời điểm gọi 
        // - (4) : cập nhật cờ trạng thái true sau khi chạy hàm -> nếu có hàm khác gọi biêt rằng hàm đã chạy 
        // - (5) : chờ thời gian chạy timeout sau đó gọi hàm callback -> cập nhật cờ về false cho phép chạy hàm 