// Cấp độ 3 : Xử lý tuần tự có điều kiện & retry 

// Bài 7 : retry với async/await
// Đề bài : Viết hàm fetchWithRetry(url , maxRetries , delayMs) -> sử dụng async/await thử lại đường dẫn = fetch API 
// Nếu thành công trả về JSON , nếu thất bại -> chờ delayMs thử lại tối đa maxRetries nếu hết lần thử throw lỗi cuối cùng 

    // hàm fectUrl -> đầu vào 1 đường dẫn api đầu ra dữ liệu của web hoặc lỗi 
    function fetchUrl(url){
        // trả về fetch -> vì fetch trả về 1 Promise
        return fetch(url)
            // Promise của response -> đại diện cho trang web kết nối api qua fetch tới 
            .then(response => {
                // kiểm tra kết nối -> nếu thất bại ném lỗi 
                if(!response.ok) throw new Error(`Lỗi mạng`);
                // nếu thành công -> lấy dữ liệu web chuyển sang dạng json
                return response.json();
            })
    }

    // hàm thử lại kết nối fetch sau số lần thử nhất định
    async function fetchWithRetry(url , maxRetries , delayMs){
        // lần thử
        let attempt = 1;

        // hàm yêu cầu 
        async function request(){
            // đặt khối trong try/catch
            try{
                // đợi dữ liệu từ đường dẫn url 
                let result = await fetchUrl(url);
                // -> nếu lấy thành công trả về dữ liệu đó -> trả về Promise.resolve
                return result;

            } // khi không lấy thành công
            catch(err){
                // in ra lỗi
                console.log(`Lỗi lần thứ ${attempt} : ${err.message}`);
                // kiểm tra vượt quá quy định -> nếu quá ném ra lỗi kết thúc hàm khi hàm async nhận lỗi sẽ trả về Promise.reject
                if(attempt >= maxRetries) throw new Error(`Lỗi quá ${maxRetries} . Hủy kết nối`);
                // khi chưa vượt quá mức -> tăng lần thử
                attempt++;
                // await new Promise này -> đợi sau thời gian chờ để thử lại kết nối , sau thời gian timeout trả về resolve
                await new Promise(resolve => setTimeout(resolve , delayMs));
                // trả về hàm yêu cầu -> khi kết quả được trả về khi gọi đệ quy thì sẽ trả về dữ liệu cuối cùng 
                return request();
            }
        }
        // trả về hàm request() -> 1 lỗi hoặc kết quả , Promise resolve/reject
        return request();
    }

    // Không in ra kết quả nên cần then/cacth để lấy kết quả do hàm trả về 
    fetchWithRetry(`https://jsonplaceholder.typicode.com/users/1` , 3 , 1000).then(value  => console.log(value)).catch(error => console.log(error.message));
    
// Bài 8 : Xử lí tuần tự có dừng sớm 
// Đề bài : viết hàm processUrlSenquential(urls , shouldStopOnError = true) , dùng async/await , duyệt lần lượt từng url in ra status (thành công/thất bại)
// Nếu shouldStopOnError là true và có URL lỗi -> dừng ngay throw lỗi , nếu false chạy tiếp url sau 

    // duyệt tuần tự từng đường dẫn -> fetch api từ đường dẫn đó -> nếu trả về lỗi kiểm tra điều kiện dừng thì sẽ kết thúc duyệt 
    async function processUrlSenquential(urls , shouldStopOnError = true){
        // duyệt toàn bộ đường dẫn từ mảng
        for(let url of urls){
            // đặt vào khối try/catch để bắt lỗi
            try{
                // đợi dữ liệu của đường dẫn trả về -> sau đó mới tiếp tục với đường dẫn kế tiếp
                let data = await fetchUrl(url);
                console.log(`Lấy dữ liệu thành công của : ${url}`);
            }catch(err){
                // nếu gặp lỗi -> in ra lỗi rồi kiểm tra điều kiện dừng 
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