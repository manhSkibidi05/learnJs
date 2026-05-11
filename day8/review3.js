// Những gì đã học được về Promise :

    // 1. Promise là gì : là 1 đối tượng đặc biệt được khởi tạo để đại diện cho 1 kết quả sẽ có trong tương lai 
    
    // - Các trạng thái của Promise : 
        // + pending : đang chờ kết quả -> xảy ra trong trường hợp in ra kết quả của Promise luôn không đợi dữ liệu trả về
        // + fulfilled : kết quả trả về là dữ liệu -> xảy ra khi Promise trả về dữ liệu thông qua resolve()
        // + rejected : kết quả trả về là lỗi -> xảy ra khi Promise trả về lỗi thông qua reject() 
    
    // - Khởi tạo 1 Promise 
        const p = new Promise((resolve , reject) => {
            if(true) resolve(`dữ liệu`);
            else reject(`lỗi`);
        })
        p.then(value => console.log(value))
        .catch(error => console.log(error))
        .finally(() => console.log(`end`));

        // + Với 1 Promise khi khởi tạo bắt buộc tham số là 1 hàm excutor bao gôm 2 tham số là resolve và reject
        // -> 2 tham số này là hàm callback khi được gọi và nhận dữ liệu nó sẽ trả về 1 Promise mang dữ liệu đó 
        // +  Để nhận dữ liệu bất đồng bộ của Promise phải sử dụng phương thức có sẵn của Promise :
            // .then() : nhận dữ liệu là 1 Promise lúc này sẽ đợi Promise thực hiện xong thao tác bất đồng bộ rồi trả về dữ liệu 
            // -> chỉ nhận dữ liệu từ resolve() và then cũng trả về là 1 Promise
            // .catch() : nhận dữ liệu là 1 Promise lúc này cũng sẽ đợi Promise thực hiện xong thao tác bất đồng bộ rồi trả về dữ liệu
            // -> chỉ nhận dữ liệu từ reject() và catch cũng trả về 1 Promise 
            // .finally() : khônng nhận dữ liệu nào cả -> chỉ đóng vai trò dọn dẹp vẫn chạy kể cả lỗi hay không
        // -> then() chạy khi trương chình không gặp lỗi trả về dữ liệu , catch() bắt lỗi ngay khi gặp cả 2 đều trả về Promise nên 
        // có thể nối thành 1 chuỗi Promise dài

    // 2.Các phương thức tĩnh thường gặp
        
        // - Promise.all() : nhận vào là 1 mảng các Promise trả về 1 mảng các Promise đã thực hiện xong thao tác bất đồng bộ 
        // -> dùng khi cần chạy song song các Promise và sẽ kiểm tra lỗi của Promise truyền vào : nếu có 1 Promise reject -> bị catch ngay và không chạy vào then
        
        // - Promise.allSetlled() : nhận vào là 1 mảng các Promise trả về mảng các Promise đã thực hiện xong thao tác bất đồng bộ nhưng không phải dữ liệu mà là 1 đối tượng
        // -> dùng khi cần dữ liệu trả về là 1 đối tượng và có thể duyệt cả các Promise ở cả 2 trạng thái rejected và fulfilled 

        // - Promise.race() : nhận vào là 1 mảng các Promise trả về là 1 Promise xử lí dữ liệu bất đồng bộ nhanh nhất 
        // -> dùng khi cần setTimeout 1 dữ liệu của Promise nếu vượt quá thời gian quy định trả về dữ liệu trống hoặc lỗi 

    // 3. Fetch API

        // Fetch(url) : cho phép lấy dữ liệu từ 1 đường dẫn trên internet 
        // -> Dữ liệu trả về là 1 Promise của response 

        fetch(`https://jsonplaceholder.typicode.com/users`)
        .then(response => {
            if(!response.ok) throw new Error(`Lỗi : ${response.status}`);
            return response.json()
        })
        .then(value => console.log(value))
        .catch(error => console.log(error))

        // Response : Là 1 đối tượng đặc biệt đại diện cho dữ liệu được lấy về của 1 trang web thông qua fetch 
        // -> Để kiểm tra dữ liệu được lấy thành công sử dụng các thuộc tính : Response.ok , Response.status
        // -> Để lấy dữ liệu từ trang web rồi trả về dạng cho phép js có thể đọc được sử dụng các phương thức : Response.json() , Response.text() , Response.blob()

        // - Thao tác bất đồng bộ của fetch là lúc lấy dữ liệu thông qua các phương thức của Response : Response.json() ...
        // ->  Các thao tác này cũng trả về Promise cho phép sử dụng then() và catch nhận dữ liệu

    // 4. Promise và hàm callback 

    // - Ưu điểm Promise so với callback : 
        // + Xử lí các thao tác tuần tự một cách hiệu quả tránh callback hell
        // + Có các phương thức tĩnh sẵn không cần tự định nghĩa
        // + Xử lí dữ liệu và lỗi dễ dàng thông qua .then() và .catch()
    // - Nhược điểm so với callback :
        // + Khó đọc code đối với người mới 
    
    // - Chuyển đổi 1 hàm callback sang Promise 
    
    function checkData(data , callback){
        setTimeout(() => {
            if(data) callback(null , data);
            else callback(`Lỗi` , null);
        },1000)
    }

    function changeCallback(fnc){
        return function(...args){
            return new Promise((resolve , reject) => {
                fnc(...args , (error , result) => {
                    if(error) reject(error);
                    else resolve(result);
                })
            })
        }
    }

    const a = changeCallback(checkData)([1,2,3]);
    a.then(value => console.log(value)).catch(error => console.log(error));

    // - Lưu ý khi sử dụng bất đồng bộ với Promise: 
        // + với các thao tác cần tuần tự hãy sử dụng .then() trả về Promise  -> nhận dữ liệu từ Promise cũ đưa nó vào Promise mới rồi trả về dữ liệu mới 
        // + .catch() thường đặt ở cuối chuỗi để có thể bắt lỗi nếu xảy ra trong bất kì thao tác nào 
        // + thao tác song song sử dụng vòng lặp , thao tác tuần tự sử dụng đệ quy 

        

