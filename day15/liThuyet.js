// Ngày 15 : Bất đồng bộ nâng cao - Promise , async/await , fetch API và ứng dụng thực tế

    // - Thực hành xây dựng các ứng dụng web nhỏ sử dụng fetch API ,Promise , async/await và xử lí lỗi 
    // -> Đây là kỹ năng sống còn khi làm việc với dữ liệu từ server 

    // - Mục tiêu : 
    // + Ôn tập Promise (.then() , .catch()) và async/await
    // + Dùng fetch để gọi API thật
    // + Xử lí lỗi mạng , lỗi HTTP , lỗi JSON
    // + Xây dựng các ứng dụng nhỏ : Random User , Tìm kiếm sản phẩm , Thời tiết , Todo , Github search 

// - Ôn lại về lý thuyết
    // 1. Promise
    const promise = new Promise((resolve , reject) => (resolve(a) || reject(b)))

    // - Promise : Là một đối tượng đại diện cho kết quả sẽ có trong tương lai 
    // - Khi định nghĩa promise cần truyền vào hàm , hàm này gồm 2 đối số là resolve và reject
        // + resolve là 1 hàm được gọi khi kết quả trả về là 1 dữ liệu -> resolve(data) : trả về 1 Promise với dữ liệu
        // + reject là 1 hàm được gọi khi kết quả trả về là 1 lỗi -> reject(err) : trả về 1 Promise với lỗi 

    promise.then(value => console.log(value))
            .catch(err => console.log(err))
            .finally(() => console.log('dọn dẹp'))

    // - Promise có 3 trạng thái : pending , fulfilled , rejected 
    // -> ở trạng thái pending lúc dữ bất đồng bộ chưa được sử lí xong , fulfilled khi dữ liệu đã được trả về , rejected khi trả về lỗi 
    
    // - Cách lấy dữ liệu của 1 promise sau khi xử lí xong bất đồng bộ 
    // + sử dụng hàm .then() nhận dữ liệu trả về từ promise
    // + sử dụng hàm .catch() bắt lỗi được trả về từ promise
    // + sử dụng hàm .finally() không nhận dữ liệu hay lỗi vẫn chạy sau khi then và catch chạy xong
    // -> các hàm trên đều trả về 1 promise nên có thể nối thành 1 chuỗi xử lí tuần tự dữ liệu 
    
    // - Các phương thức tĩnh thường sử dụng với Promise

    Promise.all(arrPromise)
    // + Promise.all() nhận vào 1 mảng các promise hàm này sẽ chạy song song các promise đợi tất cả các promise resolve kết quả sẽ trả về 1 mảng
    // -> trường hợp có 1 promise reject sẽ trả về reject đó dừng toàn bộ các promise còn lại 

    Promise.allSettled(arrPromise)
    // + Promise.allSettled() nhận vào 1 mảng promise chạy song song các promise đợi tất cả các promise resolve/reject sẽ trả về 1 mảng 
    // -> khác với all thì allSettled trả về mảng các Promise reject và cả resolve 

    Promise.race(arrPromise)
    // + Promise.race() nhận vào 1 mảng promise chạy song song các promise sẽ trả về 1 promise xử lí bất đồng bộ xong trước và trả về kết quả
    // -> race sẽ trả về 1 promise resolve/reject chỉ cần xử lí bất đồng bộ xong đầu tiên
    
    // 2. Async/await 
    // - Async/await là cách sử lí bất động bộ giúp cho bất đồng bộ giống với đồng bộ -> giúp code dễ đọc hơn 

    async function getData(){
        let data = await new Promise(resolve => resolve(a))
    }
    // - Async là một loại hàm cho phép trả về Promise resolve/reject 
    // -> khi hàm return kết quả Promise resolve kết quả, khi hàm throw lỗi thì Promise sẽ reject lỗi

    // - Await là từ khóa đứng trước 1 Promise nó sẽ dừng tất cả tiến trình phía dưới nó để đợi Promise resolve/reject chỉ nằm trong phạm vi hàm async
    // -> khi await đợi Promise resolve sau khi resolve chạy tiếp phần code phía dưới , trường hợp Promise reject sẽ cần try catch để bắt lỗi đó

    async function getData2(){
        try{
            let data = await new Promise((resolve , reject) => resolve(a) || reject(b))
            return data;
        }catch(err){
            throw new err(err);
        }
    }

    // - Khi sử dụng async/await bắt buộc phải sử dụng try/catch để bắt lỗi được trả về từ Promise 
    
    getData2().then(val => console.log(val)).catch(err => console.log(err))

    // - với hàm async luôn trả về Promise nên hoàn toàn có thể sử dụng .then() và .catch() để bắt lỗi và lấy dữ liệu 

    // 3. fetch api sử dụng async/await 

    async function getData() {
        try {
            // fetch(url) -> trả về Promise của response
            const response = await fetch(url);
            // kiểm tra kết nối của response -> nếu lỗi throw ra lỗi mới sẽ được catch bắt
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            // lấy dữ liệu từ response thông qua phương thức .json() 
            const data = await response.json();
            // in ra dữ liệu sau khi chờ 
            console.log(data);
        } catch (err) {
            // in ra lỗi nếu gặp lỗi 
            console.error('Lỗi:', err.message);
        }
    }
