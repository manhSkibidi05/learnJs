// Cấp 4 : Tổng hợp và Thực chiến 

// Bài 13 : Hệ thống tải dữ liệu dashboard (kết hợp nhiều kỹ thuật)

// Đề bài : tải users , posts , comments song song bằng Promise.All -> tính tổng users , posts , comments , số bài viết trung bình trên mỗi user
// Bất cứ request nào thất bại thử tối đa 2 lần -> hiện thị kết quả trong console 

    function loadDashbroard(){
        let url = {
            users : `https://jsonplaceholder.typicode.com/users`, 
            posts : `https://jsonplaceholder.typicode.com/postss`,
            comments : `https://jsonplaceholder.typicode.com/comments`
        }
        
        Promise.all([
            retryWithFetch(url[`users`],2 ),
            retryWithFetch(url[`posts`],2 ),
            retryWithFetch(url[`comments`],2 )
        ])
            .then(([val1 , val2 , val3]) => {
                console.log(`Tổng số users là : ${val1.length}`);
                console.log(`Tổng số posts là : ${val2.length}`);
                console.log(`Tổng số comments là : ${val3.length}`);
                console.log(`Số bài viết trung bình trên mỗi user là : ${val2.length / val1.length}`);
            })
            .catch(error => console.log(error))
    }

    function retryWithFetch(url , maxRetries){
        let count = 1;
        return new Promise((resolve , reject) => {
            function request(){
                if(count > maxRetries) return reject(`Lỗi quá số lần quy định . Tải dữ liệu thất bại`);
                fetch(url)
                    .then(response => {
                        if(!response.ok) throw new Error(`Lỗi của đường dẫn ${url}`);
                        return response.json();
                    })
                    .then(value => resolve(value))
                    .catch(error => {
                        console.log(`Lỗi lần thứ ${count} : ${error} `);
                        count++;
                        setTimeout(request , 1000);
                    })
            }

            request();
        })   
    }

    loadDashbroard();

// Bài 14  : Xây dựng hàng đợi xử lí Promise tuần tự 

// Đề bài : viết class PromiseQueue với phương thức add(task) nhận 1 hàm -> trả về Promise 
// Các task thực thi lần lượt , mỗi task chỉ chạy sau khi task trước hoàn thành , hỗ trợ tùy chọn concurrency -> số task chạy song song tối đa

// Bài 15 : Timeout cho bất kỳ Promise nào 

// Đề bài : viết hàm withTimeout(promise , timeoutMs) -> trả về 1 Promise mới 
// Nếu promise gốc resolve hay reject trong vòng timeoutMs -> trả về kết quả đó , nếu quá thời gian reject với lỗi 
// Không được dùng Promise.race với setTimeout? – Bạn có thể, nhưng cần xử lý clear timeout để tránh memory leak.

    function withTimeout(promise , timeoutMs){
        return new Promise((resolve , reject) => {
            
            let setTimeoutId = setTimeout(() => {
                clearTimeout(setTimeoutId);
                return reject(`Timeout`);
            },timeoutMs)

                promise
                .then(value => {
                    clearTimeout(setTimeoutId);
                    return resolve(value);
                })
                .catch(error => {
                    clearTimeout(setTimeoutId);
                    return reject(error);
                })
        })
    }

    const p1 = new Promise((resolve , reject) => {
        setTimeout(() => {
            return resolve(`Đường lên đỉnh olopia`);
        },1200)
    });

    const p2 = new Promise((resolve , reject) => {
        setTimeout(() => {
            return reject(`Lỗi 302`);
        },1500)
    });

    withTimeout(p1 , 1000)
        .then(value => console.log(value))
        .catch(error => console.log(error));

    withTimeout(p2 , 2000)
        .then(value => console.log(value))
        .catch(error => console.log(error))