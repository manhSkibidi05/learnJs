// Cấp độ 3 : Xử lý tuần tự có điều kiện & retry 

// Bài 7 : retry với async/await
// Đề bài : Viết hàm fetchWithRetry(url , maxRetries , delayMs) -> sử dụng async/await thử lại đường dẫn = fetch API 
// Nếu thành công trả về JSON , nếu thất bại -> chờ delayMs thử lại tối đa maxRetries nếu hết lần thử throw lỗi cuối cùng 

    function fetchUrl(url){
        return fetch(url)
            .then(response => {
                if(!response.ok) throw new Error(`Lỗi mạng`);
                return response.json();
            })
    }

    async function fetchWithRetry(url , maxRetries , delayMs){
        let attempt = 1;

        async function request(){
            try{
                let result = await fetchUrl(url);
                return result;
            }catch(err){
                console.log(`Lỗi lần thứ ${attempt} : ${err.message}`);
                if(attempt >= maxRetries) throw new Error(`Lỗi quá ${maxRetries} . Hủy kết nối`);
                attempt++;
                await new Promise(resolve => setTimeout(resolve , delayMs));
                return request();
            }
        }
        return request();
    }

    fetchWithRetry(`https://jsonplaceholder.typicode.com/users/1` , 3 , 1000).then(value  => console.log(value)).catch(error => console.log(error.message));
    
// Bài 8 : Xử lí tuần tự có dừng sớm 
// Đề bài : viết hàm processUrlSenquential(urls , shouldStopOnError = true) , dùng async/await , duyệt lần lượt từng url in ra status (thành công/thất bại)
// Nếu shouldStopOnError là true và có URL lỗi -> dừng ngay throw lỗi , nếu false chạy tiếp url sau 

    async function processUrlSenquential(urls , shouldStopOnError = true){
        for(let url of urls){
            try{
                let data = await fetchUrl(url);
                console.log(`Lấy dữ liệu thành công của : ${url}`);
            }catch(err){
                console.log(`Lấy dữ liệu thất bại của : ${url} `);
                if(shouldStopOnError) throw new Error(`Dừng lấy dữ liệu do lỗi`)
            }
        }
        console.log(`Hoàn tất xử lí các url`);
    }

    let urls = [`https://jsonplaceholder.typicode.com/users/1`,`https://jsonplaceholder.typicode.com/users/21` , `https://jsonplaceholder.typicode.com/users/6` ,
        `https://jsonplaceholder.typicode.com/users/5`, `https://jsonplaceholder.typicode.com/users/52`
    ];
    processUrlSenquential(urls , true).catch(err => console.log(err.message));