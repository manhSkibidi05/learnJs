// Cấp độ 3 : Nâng cao 

// Bài 8 : Promisify callback 

// Đề bài : cho hàm giả lập đọc file bằng callback -> chuyển từ callback sang Promise 

    function readFileCallback(fileName , callback){
        setTimeout(()=>{
            if(fileName === `data.txt`) callback(null , `Nội dung file`);
            else callback(`file không tồn tại`);
        },500);
    }

    function promisify(fnc){
        return function(...args){
            return new Promise((resolve , reject) => {
                fnc(...args , (err , result) => {
                    if(err) reject(err);
                    else resolve(result);
                })
            })
        }
    }

    const readFilePromise = promisify(readFileCallback)(`data.txt`);
    // readFilePromise.then(result => console.log(result)).catch(error => console.log(error));

// Bài 9 : Retry với Promise

// Đề bài : Viết hàm fetchWithRetry(url , maxRetries) -> dùng fetch tự dộng thử lại tối đa số lần quy định nếu request thất bại 
// Mỗi lần thử lại cách nhau 1s -> trả về Promise 

    function fetchWithRetry(url , maxRetries){
        return new Promise((resolve , reject) =>{
            let count = 1;

            function recursive(){
                if(count > maxRetries) return reject(`Lỗi do kết nối thất bại ${maxRetries} lần`);
                
                fetch(url)
                    .then(response => {
                        if(!response.ok) throw new Error(`lỗi do ${response.status}`);
                        else{
                            return response.json();
                        }
                    })
                    .then(result => resolve(result))
                    .catch(error => {
                        console.log(`kết nối thất bại lần thứ ${count} và ${error.message}`);
                        count++;
                        setTimeout(recursive , 1000);
                    })
            } 

            recursive();
        })
    }
    
    fetchWithRetry(`https://jsonplaceholder.typicode.com/users/12` , 3)
        .then(result => console.log(result))
        .catch(error => console.log(error))

// Bài 10 : Promise chain với xử lý lỗi chi tiết 

// Đề bài : giả sử có các hàm trả về Promise hàm 1 -> hàm 2 -> hàm 3 . nếu bất kì bước nào lỗi , in ra thông báo cụ thể 

    const users = {
        user1 : {
            token : `abc`
        },
        user2 : {
            token : `bbc`
        },
        user3 : {
            token : `nan`
        },
    }

    const profiles = {
        bbcc : {
            id : 1,
            name : `long`,
        },
        bbc : {
            id : 2,
            name : `bằng`,
        },
        nan : {
            id : 3,
            name : `nhims`,
        }
    }

    const orders = {
        1 : {
            food : `bánh tráng`,
            table : 1
        },
        5 : {
            food : `bún bò huế`,
            table : 5
        },
        3 : {
            food : `phở bòa`,
            table : 3
        }
    }


    function authenticate(user){
        return new Promise((resolve , reject) => {
            setTimeout(() => {
                if(users[user]) resolve(users[user][`token`]);
                else reject(`wrong user`);
            },1000);
        })
    }

    function fetchProfile(token){
        return new Promise((resolve , reject) => {
            setTimeout(() => {
                if(profiles[token]) resolve(profiles[token][`id`]);
                else reject(`token is not available`);
            },1000)
        })
    }
    
    function fetchOrders(profileId){
        return new Promise((resolve , reject) => {
            setTimeout(() => {
                if(orders[profileId]) resolve(orders[profileId]);
                else reject(`cant find profile id`);
            },1000)
        })
    }
    
    authenticate(`user1`)
        .then(token => fetchProfile(token))
        .then(profileId => fetchOrders(profileId))
        .then(order => console.log(order))
        .catch(error => console.log(error))

// Bài 11 : Promise.allSettled 

// Đề bài : tạo 3 Promise -> dùng Promise.allSetlled và in ra từng kết quả (status , value/reason)

    const p1 = new Promise((resolve , reject) => {
        setTimeout(() => {
            resolve(`OK1`)
        },500)
    });
    
    const p2 = new Promise((resolve , reject) => {
        setTimeout(() => {
            reject(`Error2`)
        },300)
    }); 

    const p3 = new Promise((resolve , reject) => {
        setTimeout(() => {
            resolve(`OK3`)
        },700)
    }); 

    Promise.allSettled([p1 , p2 , p3])
        .then(results => {
            results.forEach(result => {
                if(result.status === `fulfilled`) console.log(`status : ${result.status} and value : ${result.value}`);
                else console.log(`status : ${result.status} and reason : ${result.reason}`);
            })
        })
    
// Bài 12 : Tự viết hàm promiseAll (không dùng Promise.all) 

// Đề bài : nhận 1 mảng các Promise -> trả về 1 Promise mới resolve là mảng các Promise trước đó nếu tất cả resolve nếu reject trả về reject đó 

    function promiseAll(promises){
        

    }