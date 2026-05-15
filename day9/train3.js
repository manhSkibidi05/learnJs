// Cấp độ 2 : Kết hợp Promise methods

    // Bài 4 : Promise.all với async/await
    // Đề bài : Dùng promise.all tải đồng thời dữ liệu từ 3 API của JSONPlaceholder : users , comments , posts -> in ra số lượng mỗi loại và số bài viết trung bình/1 user

        // khởi tạo hàm async trả về Promise chạy bất đồng bộ trong hàm 
        async function fetchAll(){
            // sử dụng try/catch để bắt lỗi 
            try{
                // gọi fetch api lấy dữ liệu trả về Promise nhưng ở trạng thái pending -> chạy lệnh nhưng chưa có dữ liệu được trả về 
                const usersData =  fetch(`https://jsonplaceholder.typicode.com/users`).then(res => { if(!res.ok) throw new Error(`Lỗi mạng`); return res.json()});
                const postsData =  fetch(`https://jsonplaceholder.typicode.com/posts`).then(res =>{ if(!res.ok) throw new Error(`Lỗi mạng`); return res.json()});
                const commentsData =  fetch(`https://jsonplaceholder.typicode.com/comments`).then(res => { if(!res.ok) throw new Error(`Lỗi mạng`); return res.json()});
                
                // sử dụng await Promise.all() -> await đợi dữ liệu được trả về của mảng Promise các Promise trong mảng chạy song song 
                const [users , posts , comments] = await Promise.all([usersData ,postsData ,commentsData]);
                // sau khi await trả về dữ liệu -> in ra dữ liệu đó
                console.log(`Số lượng user là : ${users.length}`);
                console.log(`Số lượng post là : ${posts.length}`);
                console.log(`Số lượng comment là : ${comments.length}`);
                console.log(`Số bài viết trung bình của 1 user là : ${posts.length / users.length}`);
                // nếu gặp lỗi khi chạy ở await -> ném ra lỗi cho catch
            }catch(err){
                console.log(err.message);
            }
        }
        fetchAll();

    // Bài 5 : Promise.race - timeout 
    // Đề bài : Dùng fetch kết hợp với Promise.race -> fetch xong trước thời gian timeout trả về Json nếu xong sau reject lỗi timeout
    
    // khởi tạo hàm async chạy bất đồng bộ -> với 2 tham số truyền vào là đường dẫn api và thời gian timeout 
    async function fetchWithTimeout(url , timeoutMs){
        // sử dụng try/catch để bắt lỗi
        try{
            // lấy dữ liệu từ đường dẫn bằng fetch api -> trả về Promise status là pending vì chưa await
            const data = fetch(url).then(res => { if(!res.ok) throw new Error(`Lỗi mạng`); return res.json()});
            // khởi tạo Promise reject sau thời gian timeout -> hiện tại mới gọi chưa trả về luôn
            const timeLimit =  new Promise((resolve , reject) => {setTimeout(() => reject(`Lỗi timeout`),timeoutMs)});
            // sử dụng Promise.race() lấy ra Promise trả về đầu await đợi và lấy dữ liệu đó 
            const result = await Promise.race([data , timeLimit]);
            console.log(result);
        }catch(err){
            console.log(err)
        }
    }
    fetchWithTimeout(`https://jsonplaceholder.typicode.com/users/1` , 500);

    // Bài 6 : Promise.allSetlled
    // Đề bài : Cho mảng các URL (có đúng và sai) . Dùng Promise.allSetlled để tải tất cả -> in ra danh sách URL và URL thất bại

    // 1 mảng các đường dẫn 
    let urls = [`https://jsonplaceholder.typicode.com/users/1`,`https://jsonplaceholder.typicode.com/users/21` , `https://jsonplaceholder.typicode.com/users/6` ,
        `https://jsonplaceholder.typicode.com/users/5`, `https://jsonplaceholder.typicode.com/users/52`
    ];

    // hàm fetchUrl -> từ đường dẫn cung cấp trả về Promise với dữ liệu từ trang web hoặc là ném ra 1 lỗi 
    function fetchUrl(url){
        return fetch(url)
                .then(res => {
                    if(!res.ok) throw new Error(`lỗi`);
                    return res.json();
                })
    }

    // hàm lọc các đường dẫn hợp lệ -> không ném ra lỗi trả về dữ liệu 
    async function filterUrl(arr){
        // khởi tạo mảng mới mang tất cả Promise được trả về từ đường dẫn thông qua hàm fetchUrl -> đều đang Promise pending
        let arrFetch = arr.map(url => fetchUrl(url))
        // khởi tạo mảng kết quả -> sử dụng Promise.allSettled() chạy song song toàn bộ các Promise pending trước đó và đặt await trước để đợi nhận dữ liệu
        // dữ liệu trả về 1 mảng Promise có thể reject / resolve 
        let results = await Promise.allSettled(arrFetch);
        // khởi tạo 2 mảng chứa đường dẫn 
        let urlSuccess = [];
        let urlFailed = [];
        // duyệt toàn bộ mảng Promise tất cả đã đều được trả về dữ liệu cả resolve/reject 
        results.forEach((result , index) => {
            // kiểm tra trạng thái Promise -> nếu fulfilled thì Promise resolve 
            if(result.status === `fulfilled`) urlSuccess.push(arr[index]);
            // nếu rejected -> Promise reject thêm đường dẫn ở vị trí index vào mảng cùng vị trí với mảng các Promise 
            else urlFailed.push(arr[index]);
        })
        console.log(urlSuccess);
        console.log(urlFailed);
    }
    filterUrl(urls);

    
