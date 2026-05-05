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
        let count = 1;
        let result = null;
        
        function retry(){
            if(count >= maxRetries){
                return Promise.reject(`quá số lần quy định`);
            } 
            if(result){
                return Promise.resolve(result);
            } 

            fetch(url).then(response => {
                if(!response.ok){
                    count++;
                    throw new Error(`lỗi`);
                }
                    return response.json();
            }).then(value => result = value).catch(error => setTimeout(()=>{retry()},1000));
        }

        retry();
    }
    
    console.log(fetchWithRetry(`https://jsonplaceholder.typicode.com/users/155` , 3))
    

// AI 

function fetchWithRetry(url, maxRetries) {
    return new Promise((resolve, reject) => {
        let attempt = 0; // Đếm số lần thử

        function makeRequest() {
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        // Status code không thành công (4xx, 5xx)
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json(); // hoặc response.text() tùy nhu cầu
                })
                .then(data => {
                    resolve(data); // Thành công -> giải quyết Promise
                })
                .catch(error => {
                    attempt++;
                    console.log(`Attempt ${attempt} failed:`, error.message);
                    if (attempt <= maxRetries) {
                        // Còn lượt thử -> gọi lại sau 1 khoảng thời gian (tùy chọn)
                        setTimeout(makeRequest, 1000 * attempt); // delay tăng dần
                    } else {
                        reject(new Error(`Failed after ${maxRetries} retries: ${error.message}`));
                    }
                });
        }

        makeRequest(); // Bắt đầu lần thử đầu tiên
    });
}

// Sử dụng
fetchWithRetry('https://jsonplaceholder.typicode.com/users/1', 3)
    .then(user => console.log('Success:', user.name))
    .catch(err => console.error('Final error:', err.message));