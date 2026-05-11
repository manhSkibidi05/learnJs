// Ngày 9 : Async / Await - Làm chủ bất đồng bộ 1 cách đồng bộ 

    // - Async/Await cú pháp hiện đại cho phép viết mã bất đồng bộ y hệt đồng bộ , dễ đọc , dễ viết , dễ debug

    // - Mục tiêu ngày 9 :
    // 1. Hiểu Async/Await là gì và tại sao nó ra đời 
    // 2. Biết cách khai báo hàm async và sử dụng await 
    // 3. Xử lý lỗi với try/catch 
    // 4. Kết hợp Async/Await với Promise (vì bản chất là Promise)
    // 5. Chạy tuần tự , song song và các kỹ thuật nâng cao
    // 6. Chuyển đổi từ callback/Promise sang Async/Await

// 1. Async/Await là gì ?

    // - Async/Await là một cú pháp hiện đại trong JavaScript được giới thiệu từ ES2017 (ES8) cho phép bạn viết mã bất đồng bộ một cách tuần tự , dễ đọc như mã đồng bộ
    // trong khi vẫn giữa nguyên bản chất đồng bộ của JavaScript.
    
    // - Nó được xây dựng hoàn toàn dựa trên Promise , không phải thay thế Promise mà là một lớp đường bột giúp code gọn gàng dễ hiểu hơn 

// 1.1. Từ khóa async 
    // - Đặt từ khóa async trước 1 hàm (function declaration , expression , arrow function) 
    // - Hàm đó luôn trả về 1 Promise 
    // - Nếu hàm trả về một giá trị không phải Promise -> giá trị đó sẽ tự động được bọc trong Promise.resolve(...)
    // - Nếu hàm ném ra lỗi throw , lỗi đó sẽ được bọc trong Promise.reject(...)

    // vd : hàm async trả về giá trị thường 
    let text = `deadass`;
    async function getText(t){
        return t;
    }
    getText(text).then(value => console.log(value));

    // vd2 : hàm async ném lỗi 
    async function getError(){
        throw new Error(`error 404`);
    }
    getError().catch(error => console.log(error.message));

    // -> hàm async luôn trả về 1 Promise nên bạn có thể .then() , .catch() hoặc await() nó 

// 1.2. Từ khóa await 
    // - Chỉ sử dụng bên trong hàm async 
    // - await đứng trước 1 Promise (hoặc bất kỳ giá trị nào , nếu không phải Promise thì nó coi như Promise.resolve )
    // - Nó tạm dừng hàm async (chỉ hàm đang chạy này) cho tới khi Promise được giải quyết (resolve hoặc reject)
    // - Khi Promise resolve , await trả về giá trị resolve 
    // - Khi Promise reject , await ném ra lỗi (có thể bắt bằng try/catch)

    // -> Quan trọng : await không block luồng chính (event loop vẫn chạy ) , nó chỉ tạm dừng trong phạm vi hàm async 

    // vd : await xử lí với Promise 

    const p = new Promise((resolve , reject) => {
        setTimeout(() => {
            resolve(`dữ liệu 1`);
        },1000)
    });

    async function getData(){
        console.log(`Bắt đầu tìm dữ liệu...`);
        const result = await p;
        console.log(`Sau 1 giây...`);
        console.log(`Dữ liệu là : ${result}`);
    }
    getData();
    console.log(`Dữ liệu đang được tìm...`);

// 1.3. So sánh với Promise .then()

    // vd : fetch dữ liệu sử dụng Promise thuần 

    function fetchUserName(id){
        return new Promise((resolve , reject) => {
            fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
                .then(response => {
                    if(!response.ok) throw new Error(`check my ins`);
                    return response.json();
                })
                .then(value => resolve(value.name))
                .catch(error => reject(error.message));
        })
    }
    fetchUserName(5).then(value => console.log(`what your name : ${value}`)).catch(error => console.log(error));

    // Cách dùng Async/Await 

    async function fetchUserName2(id){
        try{
            let response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            if(!response.ok) throw new Error(`call me bb`);
            const user = await response.json();
            console.log(`what your name : ${user.name}`);
            return user.name;
        }
        catch(error){
            console.error(`Lỗi : ${error}`)
        }
    }
    fetchUserName2(5);

    // - Lợi ích : 
        // + code phẳng , không bị lồng .then()
        // + xử lí lỗi tập trung với try/catch
        // + dễ debug hơn (có thể đặt breakpoint trong V8)

    
