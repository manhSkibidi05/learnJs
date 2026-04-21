// debounce : kĩ thuật giúp kiểm soát số lần gọi hàm , hàm được debounce sẽ được khởi chạy khi đó là lần gọi cuối cùng sau 1 khoảng thời gian nhất định

    // - sử dụng khi : + thao tác cần gọi hàm nhiều lần nhưng chỉ cần lấy dữ liệu trả về cuối cùng
        // + hàm cần chạy lần cuối cùng khi kết thúc thao tác
        // + vd : nhập dữ liệu vào ô input chỉ lấy dữ liệu chỉ khi người dùng ngừng viết sau khoảng thời gian 

    // - định nghĩa : 

    function debounce(func , timeout){
        let timeoutId;
        return function(...args){
            clearTimeout(timeoutId);
            timeoutId = setTimeout(()=>{
                func.apply(this , args);
            },timeout)
        }
    }

    // - debounce ngay lập tức : gọi hàm lần đầu trì hoãn lần tiếp theo cho tới lần cuối gọi hàm 
    
    function debounceNow(func , timeout){
        let timeoutId;
        let check;
        return function(...args){
            if(!check){
                func.apply(this , args);
                check = true;
            }else{
                clearTimeout(timeoutId);
                timeoutId = setTimeout(()=>{
                    func.apply(this , args);
                },timeout)
            }
        }
    }

    function thongBao(message){
        console.log(message);
    }

    const debounceTb = debounceNow(thongBao , 1000);
    debounceTb(`thong bao 1`);
    debounceTb(`thong bao 1`);
    debounceTb(`thong bao 1`);
    debounceTb(`thong bao 5`);

// throttle : là kĩ thuật kiểm soát số lần gọi hàm , các hàm sẽ được khởi chạy theo thời gian quy định khi gọi hàm nhiều lần trong khoảng thời gian thì hàm chỉ chạy
// sau thời gian timeout của hàm đã chạy trước 

    // - sử dụng khi : + kiểm soát tần suất hàm được chạy hàm chỉ chạy sau khi kết thúc thời gian timeout của hàm trước 
        // + chạy lần lượt theo nhịp độ được quy định 
        // + vd : phù hợp với game fps giới hạn số lượng đạn ra mỗi lần click

    // - định nghĩa throttle : 

    function throttle(func , timeout){
        let check;
        return function(...args){
            if(!check){
                func.apply(this, args);
                check = true;
                setTimeout(()=>{
                    check = false;
                },timeout)
            }
        }
    }

    // - throttle lần gọi hàm cuối : 

    function throttleLast(func , timeout){
        let check;
        let timeoutId;
        return function(...args){
            if(!check){
                func.apply(this, args);
                check = true;
                setTimeout(()=>{
                    check = false;
                },timeout)
            }else{
                clearTimeout(timeoutId);
                timeoutId = setTimeout(()=>{
                    func.apply(this , args);
                },timeout)
            }
        }
    }

    const throttleTb = throttleLast(thongBao , 1000);
    throttleTb(`gọi th 1`);
    throttleTb(`gọi th 1`);
    setTimeout(()=>{
        throttleTb(`gọi th 1`);
    },1000)
    throttleTb(`gọi th 5`);