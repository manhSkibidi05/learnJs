// Cấp độ 2 : Kết hợp Promise methods

    // Bài 4 : Promise.all với async/await
    // Đề bài : Dùng promise.all tải đồng thời dữ liệu từ 3 API của JSONPlaceholder : users , comments , posts -> in ra số lượng mỗi loại và số bài viết trung bình/1 user

        async function fetchAll(){
        try{
            const usersData =  fetch(`https://jsonplaceholder.typicode.com/users`).then(res => { if(!res.ok) throw new Error(`Lỗi mạng`); return res.json()});
            const postsData =  fetch(`https://jsonplaceholder.typicode.com/posts`).then(res =>{ if(!res.ok) throw new Error(`Lỗi mạng`); return res.json()});
            const commentsData =  fetch(`https://jsonplaceholder.typicode.com/comments`).then(res => { if(!res.ok) throw new Error(`Lỗi mạng`); return res.json()});
            
            const [users , posts , comments] = await Promise.all([usersData ,postsData ,commentsData]);
            console.log(`Số lượng user là : ${users.length}`);
            console.log(`Số lượng post là : ${posts.length}`);
            console.log(`Số lượng comment là : ${comments.length}`);
            console.log(`Số bài viết trung bình của 1 user là : ${posts.length / users.length}`);
        }catch(err){
            console.log(err.message);
        }
    }
    fetchAll();

    // Bài 5 : Promise.race - timeout 
    // Đề bài : Dùng fetch kết hợp với Promise.race -> fetch xong trước thời gian timeout trả về Json nếu xong sau reject lỗi timeout

    async function fetchWithTimeout(url , timeoutMs){
        try{
            const data = fetch(url).then(res => { if(!res.ok) throw new Error(`Lỗi mạng`); return res.json()});
            const timeLimit =  new Promise((resolve , reject) => {setTimeout(() => reject(`Lỗi timeout`),timeoutMs)});
            const result = await Promise.race([data , timeLimit]);
            console.log(result);
        }catch(err){
            console.log(err)
        }
    }
    fetchWithTimeout(`https://jsonplaceholder.typicode.com/users/1` , 500);

    // Bài 6 : Promise.allSetlled
    // Đề bài : Cho mảng các URL (có đúng và sai) . Dùng Promise.allSetlled để tải tất cả -> in ra danh sách URL và URL thất bại

    let urls = [`https://jsonplaceholder.typicode.com/users/1`,`https://jsonplaceholder.typicode.com/users/21` , `https://jsonplaceholder.typicode.com/users/6` ,
        `https://jsonplaceholder.typicode.com/users/5`, `https://jsonplaceholder.typicode.com/users/52`
    ];

    function fetchUrl(url){
        return new Promise((resolve , reject) => {
            fetch(url)
                .then(res => {
                    if(!res.ok) throw new Error(`lỗi`);
                    return res.json();
                })
                .then(val => resolve(val))
                .catch(err => reject(err));
        })
    }

    async function filterUrl(arr){
        let arrFetch = arr.map(url => fetchUrl(url))
        let results = await Promise.allSettled(arrFetch);
        let urlSuccess = [];
        let urlFailed = [];
        results.forEach(result => {
            if(result.value.ok) urlSuccess.push(result.value.url);
            else urlFailed.push(result.value.url)    
        })
        console.log(urlSuccess);
        console.log(urlFailed);
    }
    filterUrl(urls);

    
