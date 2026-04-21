// kĩ thuật nang cao của hàm 

    //1. currying 
        // - là kĩ thuật chia nhỏ hàm to với nhiều tham số thành hàm nhỏ trả về hàm khác mỗi hàm chỉ nhận 1 tham số trả về hàm cho tới khi hết tham số 
        // -> làm thay đổi cấu trúc hàm 
        // - sử dụng khi : + khi cần chia nhỏ các hàm + cần cố định tham số + áp dụng với pipe khi mỗi hàm chỉ nhận 1 tham số 

        function cong(x){
            return function(y){
                return 10 + x - y;
            }
        }
        const cong5 = cong(5);
        console.log(cong5(10));

    // 2. partial 
        // - là kĩ thuật giúp cố định nhiều tham số của 1 hàm -> sử dụng hàm bind() của function 
        // -> không làm thay đổi cấu trúc hàm
        // - sử dụng khi : + cố định nhiều tham số 

        const tru = (x , y , z) => z - x - y;
        const tru67 = tru.bind(null , 6 , 7 );
        console.log(tru67(67));

    // 3. composition app 
        // 3.1. pipe 
        // - là kĩ thuật tích lũy giá trị thông qua nhiều hàm liên tiếp mỗi hàm nhận vào 1 tham số là giá trị mà hàm trước trả về sau khi tính toán
        // -> pipe các hàm chạy từ trái sang phải
        // - sử dụng khi : + muốn giá trị được lưu trữ tính toán thông qua nhiều hàm + kết hợp với currying trong trường hợp hàm có nhiều tham số 

        const pipe = (...fns) => (startValue) => fns.reduce((value , func)=> func(value),startValue);

        const cong10 = x => x +10;
        const nhan5 = x => x * 5;
        console.log(pipe(cong10 , nhan5)(10));

        // 3.2. compose 
        // - là kĩ thuật tương tự với pipe
        // -> compose các hàm chạy từ phải sang trái 

        const compose = (...fns) => (startValue) => fns.reduceRight((value , func)=> func(value),startValue);

        console.log(compose(cong10 , nhan5)(10));

    // 4. debounce và throttle
    // - 2 kĩ thuật sử dụng hàm bất đồng bộ -> setTimeout()

        // 4.1. debounce 
        // - là kĩ thuật kiểm soát các hàm được gọi trong thời gian nhất định hàm chỉ được chạy sau khi kết thúc thời gian chờ và đó làm hàm cuối 
        // - sử dụng khi : + gọi hàm liên tục trong thời gian nhất định mà hệ thống chưa cần dữ liệu để tính toán chỉ gửi dữ liệu khi đã không gọi hàm 1 khoảng timeout
            // + vd : điều chỉnh kích thước trang chỉ khi dừng điều chỉnh mới thay đổi , thanh tìm kiếm ngừng gõ mới hiện gợi ý

        function debounce(func , timeout){
            let timeoutId;
            return function(...args){
                clearTimeout(timeoutId);
                timeoutId = setTimeout(()=>{
                    func.apply(this , args);
                }, timeout);
            }
        }

        const sent = message => console.log(`fuck you ${message}`);
        const debounceSent = debounce(sent , 1000);
        debounceSent(`nigaa`);
        debounceSent(`nigaa`);
        debounceSent(`nigaa 36`);

        // 4.2. throttle 
        // - là kĩ thuật chỉ cho phép hàm được chạy sau khi cách trước hàm chạy trước đó 1 khoảng thời gian -> hàm này sẽ được chạy theo nhịp độ cố định tùy vào cách hàm 
        // được sử dụng.
        // - sử dụng khi : + hàm sẽ chạy sau mỗi thời gian cố định + đối với các game click sẽ được khôi phục sau mỗi giây 
        
        function throttle(func , timeout){
            let check;
            return function(...args){
                if(!check){
                    func.apply(this , args);
                    check = true;
                    setTimeout(()=>{
                        check = false;
                    },timeout);
                }
            }
        }

        const click = info => console.log(`that should be me ${info}`);
        const throttleClick = throttle(click , 500);
        throttleClick(`huyhue`);
        throttleClick(`huyhue`);
        setTimeout(()=>{throttleClick(`huyhue`)},600);

    // 5. các kĩ thuật với hàm nâng cao
        
        // 5.1. once 
        // - hàm chỉ được gọi đúng 1 lần duy nhất những lần gọi hàm này sau chỉ trả về kết quả đã được tính toán trước đó tránh lặp hàm
        // - sử dụng khi : + với các thao tác chỉ cần thực hiện đúng 1 lần không liên quan đến các giá trị đã được thay đôi -> liên kết database 

        function once(func){
            let check;
            let finalValue;
            return function(...args){
                if(!check){
                    check = true;
                    finalValue = func.apply(this , args);
                    return finalValue;
                }
                return finalValue;
            }
        }

        const connect = machine => `connect ${machine} successful`;
        const onceConnect = once(connect);
        console.log(onceConnect(`laptop`));
        console.log(onceConnect(`skibidi toilet`));
        
        // 5.2.after 
        // - hàm chỉ được gọi sau n lần gọi hàm trước đó sẽ không được khởi chạy mà nó được chạy sau khi đã gọi đủ số lần nhất định hàm sẽ chạy với dữ liệu lần thứ n + 1
        // - sử dụng khi : + đủ các thao tác mới thực hiện được thao tác mới 

        function after(func , times){
            let count = 1;
            return function(...args){
                if(count > times){
                    func.apply(this , args);
                }
                count++;
            }
        }

        const twoTime = her => console.log(`i miss ${her}`);
        const afterTwoTime = after(twoTime , 2);
        afterTwoTime(`linh`);
        afterTwoTime(`linh`);
        afterTwoTime(`linh`);

        // 5.3. before 
        // - hàm chỉ gọi tối đa được n lần sau n lần hàm sẽ khởi chạy với n lần gọi đầu tiên sau n lần đó gọi hàm sẽ chỉ trả về giá trị của hàm gọi thứ n
        // - sử dụng khi : + click tối đa n lần sau lần thứ n sẽ vô hiệu hóa 

        function before(func , times){
            let count = 1;
            let finalValue;
            return function(...args){
                if(count > times){
                    return finalValue;
                }
                finalValue = func.apply(this , args);
                count++;
                return finalValue;
            }
        }

        const threeTime = her => `i losing ${her}`;
        const beforeThreeTime = before(threeTime , 3);
        console.log(beforeThreeTime(`nhàn`))
        console.log(beforeThreeTime(`nhàn`))
        console.log(beforeThreeTime(`nhàn 1`))
        console.log(beforeThreeTime(`nhàn 2`))

