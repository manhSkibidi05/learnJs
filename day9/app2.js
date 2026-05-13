// 3. Xử lí lỗi với try/catch trong cả đồng bộ và bất đồng bộ 

    // - try/catch là cấu trúc xử lí ngoại lệ (exception handling) trong js.
    // - try/catch hoạt động khác nhau giữa code đồng bộ và bất đồng bộ (đặc biệt khi kết hợp với async/await)
    // -> Hiểu rõ sự khác biệt này giúp bạn tránh những lỗi khó phát hiện 

    // 3.1. Xử lí lỗi đồng bộ với try/catch (cách truyền thống)
    // - Trong code đồng bộ , mọi lỗi xảy ra (gọi hàm không tồn tại , truy cập thuộc tính null , chia cho 0...) đều có thể bắt được bằng try/catch nếu nằm trong khối try

        let a = 10;
        let b = 0;
        try{
            let c = a/b;
            console.log(c);
        }catch(err){
            console.log(err.message);
        }

    // - Đặc điểm : + lỗi xảy ra ngay lập tức trong luồng thực thi
    // + catch được chạy ngay sau khi lỗi
    // + code phía sau trong cùng khối try không được thực thi 

    // 3.2. Xử lí lỗi bất đồng bộ thông thường (không dùng try/catch)
    // - Với callback hoặc Promise , lỗi xảy ra trong tương lai -> không thể bắt bằng try/catch trực tiếp 

        try{
            setTimeout(() => {
                // throw new Error(`lỗi`);
            },1000)
        }catch(err){
            console.log(err)
        }
    // -> lúc này hàm setTimeout được chạy và đẩy sang web api nhưng try/catch lại thực hiện bắt lỗi luôn nhưng không tìm thấy nên khi chạy song trả về lỗi
    // thì try/catch đã chạy xong rồi không thể bắt lỗi 

        Promise.reject(`adu`).catch(err => console.log(err));

    // -> với Promise chỉ sử dụng .catch() để có thể bắt lỗi được 
    
    // 3.3. Xử lí lỗi với try/catch trong async/await 
    // - Khi bạn dùng await bên trong hàm async , lỗi từ Promise rejection có thể được bắt bằng try/catch một cách đồng bộ hóa nhờ cơ chế biến rejection thành exception

        async function fetchData(){
            try{
                const response = await fetch(`https://invalid.url.example`);
                const result = await response.json();
                console.log(result);
            }catch(err){
                console.log(err.message);
            }
        }
        fetchData();

    // - await tạm dừng hàm async chờ Promise resolve/reject -> khi reject nó sẽ ném ra 1 lỗi ngay vị trí await và lúc này có thể bắt bằng try/catch

    // - Lưu ý khi sử dụng try/catch đối với async/await
        // + Lỗi đồng bộ xảy ra trong hàm async cũng có thể bắt được bằng try/catch : Bất kì lỗi đồng bộ nào xảy ra trong khối try đều có thể catch bắt được

        async function test(){
            try{
                let num1 = 10;
                let num2 = num1.toLowerCase();
                console.log(num2);
            }catch(err){
                console.log(err.message)
            }
        }
        test();

        // + try/catch sẽ không bắt được lỗi nếu không await phía trước các Promise reject() ra lỗi 

        async function fetchDataFail(){
            try{
                // sai -> không bắt được lỗi khi không có await phía trước 
                // fetch(`https://invalid.url.example`);

                // đúng 
                await fetch(`https://invalid.url.example`);
                
            }catch(err){
                console.log(err.message);
            }
        }
        fetchDataFail();

    // 4. Lưu ý quan trọng xử lí lỗi try/catch với async/await

        // 1. Chỉ bắt được lỗi của Promise đã được await -> nếu Promise không được await lỗi không vào catch 
        // 2. Có thể lồng nhiều try/catch xử lí lỗi chi tiết cho từng bước 
        // 3. Nếu không có try/catch , lỗi từ await sẽ làm hàm async reject và bạn phải xử lí bằng .catch() khi gọi hàm 

        async function hoyfah(){
            await Promise.reject(`fahhhh`);
        }
        hoyfah().catch(err => console.log(err));

        // 4. Dùng try/finally nếu cần dọn dẹp (tắt loading...) dù có lỗi hay không
        // 5. Không nên dùng try/catch cho mọi thứ - đôi khi bạn muốn để lỗi propagate lên cấp cao hơn 

    // 5. Tổng kết 

    // - Đối với code đồng bộ try/catch bắt ngay lỗi trong khối try và bắt được toàn bộ lỗi xảy ra
    // - Đối với async/await sử dụng cơ chế chuyển đổi lỗi từ Promise rejection sang exception cho phép bắt lỗi với try/catch
    // - Đối với Promise sử dụng .catch() để bắt lỗi , hàm callback trong bất đồng bộ phải tự định nghĩa để bắt lỗi cách thủ công

// 4. Chuyển đổi từ Promise sang Async/Await 

    // Bước 1 : Xác định hàm cần chuyển : hàm trả về Promise vd:  fetch hoặc promisify 
    // Bước 2 : Thêm async vào hàm và hàm bên trong sử dụng await
    // Bước 3 : Thay thế .then() bằng await bằng cách khai báo 1 biến nhận kết quả từ await trả về
    // Bước 4 : Thay thế .catch() bằng try/cacth để bắt lỗi 

    // vd : chuyển hàm sau sang async/await

    function getUser(id) {
        return fetch(`https://api.example.com/users/${id}`)
            .then(res => res.json())
            .then(user => user.name)
            .catch(err => null);
    }

    async function getUserPro(id){
        try{
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const user = await response.json();
            const userName = user.name;
            console.log(userName);
            return userName;
        }catch(err){
            return null;
        }
    }
    getUserPro(5);
    
    
