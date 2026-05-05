// 4 . Fetch API - Gọi HTTP request với Promise 
    // - Fetch API là là phương thức hiện đại để gửi/ nhận dữ liệu từ mạng , trả về 1 Promise . Nó thay thế XMLHttpRequest cũ kĩ 

    // 4.1 Cú pháp cơ bản 

    fetch(url , [options])
        .then(response => response.json()) // hoặc .text() , .blob() , .formData()
        .then(data => console.log(data))
        .catch(error => console.log(`lỗi mạng ${error}`));

        // -> Fetch chỉ gặp reject khi lỗi mạng xảy ra (không thể kết nối , DNS fail...)

    // 4.2 Xử lý response đúng cách

    fetch('https://jsonplaceholder.typicode.com/users/1')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(user => console.log(user.name))
    .catch(err => console.error('Fetch failed:', err.message));

    // 4.3 Các phương thức parsing response

    // response.json() -> dữ liệu trả về dạng JSON 
    // response.text() -> dữ liệu dạng text thuần
    // response.blob() -> file , ảnh , video ...
    // response.formData() -> dữ liệu từ form HTML 
    // response.arrayBuffer() -> dữ liệu nhị phân 

    // 4.4 Gửi dữ liệu lên server (POST , PUT , DELETE)

    // POST - tạo mới
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: 'Bài viết mới',
            body: 'Nội dung chi tiết',
            userId: 1
        })
    })
        .then(res => res.json())
        .then(data => console.log('Created:', data))
        .catch(err => console.error(err));

    // 4.5. VD 

    function fetchUser(userId) {
    return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(res => {
            if (!res.ok) throw new Error(`User ${userId} not found`);
            return res.json();
        });
    }

    fetchUser(2)
        .then(user => console.log(`Tên: ${user.name}, Email: ${user.email}`))
        .catch(err => console.error(err.message));

// 5. Các phương thức tĩnh hữu ích của Promise 
    // - Các phương thức này giúp làm việc với nhiều Promise cùng 1 lúc 1 cáh dễ dàng 

    // 5.1 Promise.all - chờ tất cả hoàn thành (hoặc 1 lỗi)
    
    let p1 = new Promise((resolve , reject)=>{
        setTimeout(()=>{
            resolve(10);
        },1000);
    });

    let p2 = new Promise((resolve , reject)=>{
        setTimeout(()=>{
            resolve(20);
        },1200);
    });
    
    let p3 = new Promise((resolve , reject)=>{
        setTimeout(()=>{
            reject(`error 404`);
        },1000);
    });

    Promise.all([p1 , p2 , p3])
        .then(([num1 , num2 , num3])=>{
            console.log(num1);
            console.log(num2);
            console.log(num3);
        })
        .catch(error=> console.log(error));

    // - phương thức all([]) nhận vào tham số là 1 hàm các Promise và với then() sẽ phải có tham số cũng là 1 mảng để nhận các giá trị từ mảng Promise
        // -> lúc này then() sẽ phải đợi tất cả các Promise trả về đầy đủ kết quả sau thời gian bất đồng bộ thì mới chạy hàm callback của then() 
        // -> trường hợp tất cả các Promise đều resolve thì sẽ chạy bình thường 
        // -> trường hợp có 1 reject trong mảng Promise thì sẽ trả về 1 kết quả lỗi đó 
    
    // 5.2 Promise.allSettled - chờ tất cả r, bất kể thành công hay thất bại 

    Promise.allSettled([p1 , p2 , p3])
        .then(results => {
            results.forEach((value , index)=>{
                if(value.status === `fulfilled`){
                    console.log(`Promise ở vị trí ${index} có thành công = ${value.value}`);
                }else{
                    console.log(`Promise ở vị trí ${index} thất bại = ${value.reason}`);
                }
            })
        })

    // - phương thức allSettled([]) nhận vào tham số là 1 mảng và hàm callback của then nhận tham số là 1 mảng các Promise 
        // -> khác với all() thì phương thức này sẽ chạy tất cả các kết quả của Promise kể cả là resolve hay reject 
        // -> với 1 Promise sử dụng các thuộc tính :
            // + Promise.status : trả về trạng thái của 1 Promise (pending , fulfilled , rejected) 
            // + Promise.value : trả về kết quả  được truyền vào resolve
            // + Promise.reason : trả về kết quả được truyền vào reject

    // 5.3 Promise.race - lấy kết quả của Promise chạy nhanh nhất

    Promise.race([p1 , p2 , p3])
        .then(result => {
            console.log(`thắng cuộc ${result}`);
        })
        .catch(error => console.log(error));

    // - phương thức race([]) nhận tham số là 1 mảng các Promise nhưng then() chỉ nhận 1 Promise trả về kết quả sớm nhất 
        // -> Promise thắng cuộc sẽ được then() trả về với resolve
        // -> với Promise thắng cuộc với reject thì sẽ cần catch() bắt lỗi đó 

    // 5.4 Promise.resolve và Promise.reject - tạo Promise ngay lập tức 

    Promise.resolve(36).then(value => console.log(value));

    Promise.reject(`adu vip 123`).catch(error => console.log(error));

    // - 2 phương thức resolve() và reject() nhận và giá trị bất kì -> tạo ngay 1 Promise với trạng thái fulfilled hoặc rejected mà không qua pending 
    // -> trả về kết quả ngay nên then và catch chạy ngay lập tức không cần chờ  

// 6. Chuyển đổi callback sang Promise (Promisify)
    // - khi bạn có 1 hàm cũ dùng callback (error-first pattern) , bạn có thể wrap nó thành Promise để sử dụng với .then/catch hoặc async/await

    // 6.1 Hàm callback dạng error first

    function readFileCallback(fileName , callback){
        setTimeout(()=>{
            if(fileName === `data.txt`) callback(null , `Nội dung file`);
            else callback(`lỗi` , null);
        },500)
    }

    // 6.2 Wrap thủ công 

    function readFilePromise(fileName){
        return new Promise((resolve , reject) => {
            readFileCallback(fileName , (err , result) => {
                if(err) reject(err);
                else resolve(result);
            })
        })
    }

    readFilePromise(`data.txt`).then(result => console.log(result)).catch(error => console.log(error));

    // 6.3 Hàm promisify tổng quát -> dùng cho bất kì hàm callback nào : sử dụng currying cho công thức tổng quát 

    function promisify(fn){
        return function(...args){
            return new Promise((resolve , reject) => {
                fn(...args , (err , result) =>{
                    if(err) reject(err);
                    else resolve(result);
                });
            });
        };
    }

    // sử dụng 
    const readFilePromiseGeneric = promisify(readFileCallback);
    readFilePromiseGeneric(`data.txt`).then( result => console.log(result)).catch( error => console.log(error));

    // 6.4 Promisify có sắn trong node.js (util.promisify)
    // - Nếu bạn dùng Node.js , có thể dùng module util

    const util = require(`util`);
    const readFilePromise = util.promisify(readFileCallback);

    // 6.5 Vd

    

