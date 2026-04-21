// kĩ thuật nâng cao với hàm tiếp theo 

    //  4 . memoization (ghi nhớ kết quả )
        // 4.1 . memoization là gì ?
        // - là kĩ thuật lưu cache kết quả của hàm dựa trên tham số đầu vào , tránh tính toán lại khi cùng tham số được gọi nhiều lần 

        // Hàm tính toán chậm
        function slowFibonacci(n) {
            if (n <= 1) return n;
            return slowFibonacci(n - 1) + slowFibonacci(n - 2);
        }

        // Memoization
        function memoize(fn) {
            const cache = {};
            return function(...args) {
                const key = JSON.stringify(args);
                if (cache[key] !== undefined) {
                    console.log(`Lấy từ cache: ${key}`);
                    return cache[key];
                }
                console.log(`Tính toán: ${key}`);
                const result = fn(...args);
                cache[key] = result;
                return result;
            };
        }

        const fastFibonacci = memoize(slowFibonacci);
        console.log(fastFibonacci(40)); // Tính toán lần đầu
        console.log(fastFibonacci(40)); // Lấy từ cache

    // 5. Debounce  và Throttle
        // Vấn đề cần giải quyết : khi người dùng tương tác với giao diện (gõ phím , cuộn chuột ..) , các sự kiện được kích hoạt rất nhiều lần trong thời gian ngắn 
        // Nếu mỗi lần đều gọi hàm xử lý (gọi api , tính toán nặng ..) sẽ gây quá tải , chậm chạp và tốn tài nguyên.
        // vd : khi gõ tìm kiếm mỗi lần nhấn phím đều gửi request -> hàm trăm request không cần thiết 
        // -> Debounce và Throttle là 2 kỹ thuật kiểm soát số lần gọi hàm trong 1 khoảng thời gian 


