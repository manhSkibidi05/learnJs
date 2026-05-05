// Cấp độ 2 : Thao tác với mảng & Fetch

// Bài 4 : Promise.all với setTimeout

// Đề bài : tạo 3 Promise mỗi Promise resolve sau 1 2 3 s với các giá trị lần lượt là A B C -> in ra cả 3 kết quả sau 3 s

    const p1 = new Promise((resolve , reject)=>{
        setTimeout(()=>{
            resolve(`A`);
        },1000);
    });

    const p2 = new Promise((resolve , reject)=>{
        setTimeout(()=>{
            resolve(`B`);
        },2000);
    });

    const p3 = new Promise((resolve , reject)=>{
        setTimeout(()=>{
            resolve(`C`);
        },3000);
    });

    Promise.all([p1 , p2 , p3])
        .then(([result1, result2 , result3])=>{
            console.log(result1);
            console.log(result2);
            console.log(result3);
        }).catch(error => console.log(error));

// Bài 5 : Promise.race

// Đề bài : tạo 2 promise 1 resolve 1s nhanh 2 reject 2s chậm -> in ra Promise nhanh nhất

    const promise1 = new Promise((resolve , reject)=>{
        setTimeout(()=>{
            reject(`nhanh`);
        },1000);
    });

    const promise2 = new Promise((resolve , reject)=>{
        setTimeout(()=>{
            reject(`chậm`);
        },2000);
    });

    Promise.race([promise1 , promise2]).then(result => console.log(result)).catch(error => console.log(error))

// Bài 6 : Fetch dữ liệu từ API

// Đề bài : dùng Fetch API lấy danh sách user từ https://jsonplaceholder.typicode.com/comments -> hiện thị tên và mail của user đầu , xử lý lỗi nếu thất bại

fetch(`https://jsonplaceholder.typicode.com/users/1`)
    .then(response => {
        if(!response.ok){
            throw new Error(`HTTP error : ${response.status}`);
        }
        return response.json();
    })
    .then(user => {
        console.log(`tên là : ${user.name}`);
        console.log(`email là : ${user.email}`);
    })
    .catch(error => console.log(error));
    
// Bài 7 : Fetch với Promise.all 

// Đề bài :  tải đồng thời 3 endpoints /users /posts /comments -> hiện thị số lượng bài viết trung bình trên mỗi user 

// lấy dữ liệu từ trang web users 
const users = fetch(`https://jsonplaceholder.typicode.com/users`)
    // dựa vào fetch trả về 1 Promise của response
    .then(response => {
        // kiểm tra response được lấy thành công chưa 
        if(!response.ok) throw new Error(`error : ${response.status}`);
        // lấy dữ liệu của trang web rồi trả về 
        return response.json();
    });
// -> users mang dữ liệu của trang web đó -> dữ liệu dưới dạng Promise resolve

const posts = fetch(`https://jsonplaceholder.typicode.com/posts`)
    .then(response => {
        if(!response.ok) throw new Error(`error : ${response.status}`);
        return response.json();
    });

const comments = fetch(`https://jsonplaceholder.typicode.com/comments`)
    .then(response => {
        if(!response.ok) throw new Error(`error : ${response.status}`);
        return response.json();
    });

// lấy cả 3 mảng dữ liệu Promise đó truyền vào làm tham số của all  
Promise.all([users , posts , comments])
    // dùng destructing nhận dữ liệu đó rồi chạy trong hàm callback  
    .then(([us , ps , cmts])=>{
        let result = ps.length / us.length;
        console.log(`số lượng bài viết trung bình của 1 user là : ${result} `);
    })
    // nếu 1 trong 3 dữ liệu có throw lỗi sẽ catch bắt lấy và hủy chạy then 
    .catch(error => console.log(error));

