// 6. HIGHER-ORDER FUNCTIONS NÂNG CAO 

    // 6.1. Once (chỉ gọi 1 lần)
    // - hàm chỉ thực hiện đúng 1 lần với lần đầu tiên gọi nó sẽ thực thi và trả về kết quả , sau đó những lần gọi hàm kế tiếp sẽ chỉ trả về kết quả đã được 
    // tính toán từ lần gọi đầu tiên 

    // - sử dụng khi : + khởi tạo chỉ 1 lần (kết nối database , load config)
        // + xử lý sự kiện chỉ 1 lần : đảm bảo 1 hành động chỉ hiện 1 lần 
        // + tránh gọi lại hàm tốn kém : tính toán 1 giá trị chỉ cần làm 1 lần 

    // - định nghĩa  once : 

    function once(func){
        let check;
        let result;
        return function(...args){
            if(!check){
                check = true;
                result = func.apply(this , args);
            }
            return result;
        }
    }

    const ketNoi = once((args)=>{
        console.log(`lấy dữ liệu...`);
        return {value : args}
    });
    
    console.log(ketNoi(`dữ liệu 1`));
    console.log(ketNoi(`dữ liệu 2`));

    // 6.2. after - gọi sau N lần 
    // - hàm chỉ được khởi chạy sau số lần gọi quy định , nếu gọi đủ số lần của hàm đó thì sẽ khởi chạy và các lần gọi hàm trước sẽ bị bỏ qua 

    // - sử dụng khi : + đợi nhiều tác vụ hoàn thành (trong callback), vd : đợi 3 api trả về rồi mới xử lý 
        // + kích hoạt hành động sau một số lần tương tác , vd : hiện thị quảng cáo sau 5 lần click 
        
    // - định nghĩa after : 

    function after(func , times){
        let count = 0;
        return function(...args){
            count++;
            if(count >= times){
                func.apply(this , args);
            }
        }
    }

    const tacVu = after((args)=>{
        console.log(`kết quả sau kết nối 3 lần : ${args}`);
    },3);

    tacVu(`MCK`);
    tacVu(`MCK`);
    tacVu(`TLINH`);
    tacVu(`GỖ`);

    // 6.3. before - gọi tối đa N lần 
    // - hàm sẽ chỉ được chạy đến mức số lần quy định , hàm sẽ chạy được từ lần đầu tiên đến lần tối đa thứ n và sau lần thứ n dù có gọi hàm cũng không được chạy
    
    // - sử dụng khi :+ giói hạn lần thử , vd : thử kết nối tối đa 3 lần
        // + hàng động lặp lại có giới hạn , vd : nhận thưởng tối đa 5 lần

    // - định nghĩa before : 

    function before(func , times){
        let count = 0;
        let lastResult;
        return function(...args){
            count++;
            if(count <= times){
                lastResult = func.apply(this , args);
                return;
            }
            console.log(lastResult) ;
        }
    }

    const toiDa = before((args)=>{
        console.log(`kết quả trước 3 lần : ${args}`);
        return args;
    }, 3);

    toiDa(`Bằng`);
    toiDa(`Bằng cổ`);
    toiDa(`Bằng cổ tay`);
    toiDa(`Nhím`);

    // 6.4. lazy (lazy evalution) - tính toán lười 
    // - lazy trì hoãn việc tính toán 1 giá trị cho đến khi thực sự cần và chỉ tính toán 1 lần 
    // -> cơ chế giống once nhưng dành cho giá trị thay vì hành động 

    // - sử dụng khi : + tối ưu hiệu năng : chỉ tính toán các giá trị đắt khi thực sự cần 
        // + tránh khởi tạo sớm : 1 số đối tượng hoặc cấu hình chỉ khởi tạo khi cần thiết 
        

    // - định nghĩa lazy :
    
    function lazy(func){
        let check;
        let result;
        return function(...args){
            if(!check){
                check = true;
                result = func.apply(this , args);
            }
            return result;
        }
    }