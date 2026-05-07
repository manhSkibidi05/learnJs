// Cấp 4 : Tổng hợp và Thực chiến 

// Bài 13 : Hệ thống tải dữ liệu dashboard (kết hợp nhiều kỹ thuật)

// Đề bài : tải users , posts , comments song song bằng Promise.All -> tính tổng users , posts , comments , số bài viết trung bình trên mỗi user
// Bất cứ request nào thất bại thử tối đa 2 lần -> hiện thị kết quả trong console 

    function loadDashbroard(){
        let users = fetchData(`https://jsonplaceholder.typicode.com/users`);
        let posts = fetchData(`https://jsonplaceholder.typicode.com/postss`);
        let comments = fetchData(`https://jsonplaceholder.typicode.com/comments`);

        Promise.all([users , posts , comments])
            .then(([val1 , val2 , val3]) => {
                console.log(`Tổng số users là : ${val1.length}`);
                console.log(`Tổng số posts là : ${val2.length}`);
                console.log(`Tổng số comments là : ${val3.length}`);
                console.log(`Số bài viết trung bình trên mỗi user là : ${val3.length / val1.length}`);
            })
            .catch(error =>{
                console.log(error)
            })
        
        
    }

    function fetchData(url){
        return new Promise((resolve , reject) => {
            fetch(url)
            .then(response => {
                if(!response.ok) throw new Error(`Lỗi do đường dẫn ${url} : ${response.status}`);
                else return resolve(response.json()); 
            })
            .catch(error => reject(error))
        })
        
    }

    function retryFetch(url , maxRetries){
        return new Promise((resolve , reject) => {
            let count = 1;
            function recursive(){
                if(count > maxRetries) return reject(`Đã thử hết ${maxRetries} lần`);
                fetchData(url)
                .then(value => resolve(value))
                .catch(error => {
                    console.log(`Lỗi lần thứ ${count}`);
                    count++;
                    setTimeout(recursive , 1000);
                })
            }
            recursive();
        })
    }

    loadDashbroard();