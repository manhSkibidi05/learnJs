// Bài tập Ngày 9 : Async/Await - Từ cơ bản đến nâng cao 

// Cấp độ 1 : Cơ bản 

    // Bài 1 : Chuyển đổi Promise sang async/await
    // Đề bài : Viết lại hàm sau sang async/await

    // Promise version
    function wait(ms) {
        return new Promise(resolve => setTimeout(() => resolve(`Đã chờ ${ms}ms`), ms));
    }
    wait(1000).then(console.log);

    // Promise version
    function fetchUser(id) {
        return fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(res => res.json())
            .then(user => user.name);
    }
    fetchUser(1).then(console.log);

    // Async/Await version
    async function wait2(ms){
        const result = await new Promise(resolve => setTimeout(() => resolve(`Đã chờ ${ms}ms`), ms));
        console.log(result);
    }
    wait2(1000);

    // Async/Await version 
    async function fetchUser2(id){
        try{
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            if(!response.ok) throw new Error(`Lỗi mạng : ${response.status}`);
            const user = await response.json();
            const userName = user[`name`];
            console.log(userName);
        }catch(err){
            console.log(err.message);
        }
    }
    fetchUser2(2);

    // Bài 2 : Xử lí lỗi với try/catch
    // Đề bài : lấy user nếu không thành công in ra lỗi "không thể lấy user"

    async function getUser(id){
        try{
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            if(!response.ok) throw new Error(`Không thể lấy user`);
            const user = await response.json();
            console.log(user);
        }catch(err){
            console.log(err.message);
        }
    }
    getUser(1);
    getUser(100);

    // Bài 3 : Tuần tự và song song
    // Đề bài : Cho 3 hàm trả về Promise : task1() chờ 1s trả về A , task2() chờ 2s trả về B , task3() chờ 1.5s trả về C 
    // Viết 2 hàm tuần tự và song song chạy in ra kết quả và tổng thời gian 

    function task1() {
        return new Promise(resolve => setTimeout(() => resolve(`A`), 1000));
    }

    function task2() {
        return new Promise(resolve => setTimeout(() => resolve(`B`), 2000));
    }

    function task3() {
        return new Promise(resolve => setTimeout(() => resolve(`C`), 1500));
    }

    async function runSequential(){
        let timeBefore = Date.now();
        const rs1 = await task1();
        const rs2 = await task2();
        const rs3 = await task3();
        console.log(rs1);
        console.log(rs2);
        console.log(rs3);
        let timeAfter = Date.now();
        console.log(`Tổng thời gian chạy là : ${timeAfter - timeBefore} ms`);
    }
    runSequential();
    
    async function runParallel(){
        let t1 = task1();
        let t2 = task2();
        let t3 = task3();
        let timeBefore = Date.now();
        const [rs1 , rs2 , rs3] = await Promise.all([t1, t2 , t3]);
        console.log(rs1);
        console.log(rs2);
        console.log(rs3);
        let timeAfter = Date.now();
        console.log(`Tổng thời gian chạy là : ${timeAfter - timeBefore} ms`);
    }
    runParallel();