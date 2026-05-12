// Review Async/Await ngày 1 

    // - Từ khóa Async : Được đặt trước 1 hàm -> lúc này hàm đó luôn trả về 1 Promise 
    // - Khi hàm return 1 giá trị hàm trả về Promise.resolve() , khi hàm throw 1 lỗi hàm trả về Promise.reject()

    async function getData(){
        console.log(`đang chờ data`);
        return `dữ liệu 1`;
    }

    async function getError(){
        console.log(`đang chờ data`);
        throw new Error(`fuck`)
    }

    getData().then(value => console.log(value));
    getError().catch(value => console.log(value.message));
    // - async luôn trả về Promise nên có thể then và catch

    // - Từ khóa Await : Đặt trước 1 Promise -> lúc này Await chỉ được sử dụng bên trong hàm async 
    // - Await dùng với các Promise trả về các thao tác bất đồng bộ -> nó sẽ tạm dừng code phía dưới nó để đợi Promise trả về giá trị 
    // -> Await chỉ tạm dừng code bên trong hàm async không ảnh hưởng tới phần code đồng bộ bên ngoài hàm 

    async function checkB(){
        try{
            console.log(`Đang kiểm tra B`)
            const result = await new Promise((resolve , reject) => setTimeout(() => {reject(`B clear`)},1000));
            console.log(`Kiểm tra thành công : ${result}`);
        }
        catch(error){
            console.log(`lỗi check b : ${error}`)
        }
        
    }
    checkB();
    console.log(`Vẫn đang kiểm tra B`);
    // -> await đợi Promise  resolve/reject nếu resolve chạy tiếp trong try , reject ném ra lỗi cho catch 

    // - Sử dụng fetch API với async/await

    // - đặt async trước hàm 
    async function fetchUserName2(id){
        try{
            // bọc code trong khối try để bắt lỗi
            // với các thao tác trả về 1 Promise đều có await đứng trước -> fetch(url) trả về Promise của response 
            let response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            // kiểm tra đối tượng response -> nếu lỗi ném ra lỗi 
            if(!response.ok) throw new Error(`call me bb`);
            // response.json() -> trả về promise chứa dữ liệu của trang web nên có await đứng trước đợi thời gian lấy dữ liệu xong mới cho chạy phần code dưới
            const user = await response.json();
            // sau khi lấy dữ liệu xong -> in ra kết quả
            console.log(`what your name : ${user.name}`);
            // hàm trả về kết quả đó -> Promise.resolve(kq)
            return user.name;
        }
        // catch nhận 1 tham số lỗi
        catch(error){
            // in ra nếu trong try ném ra lỗi
            console.error(`Lỗi : ${error}`)
        }
    }
    fetchUserName2(5);
    fetchUserName2(50);