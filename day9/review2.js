// - Async/Await : 2 từ khóa phục vụ cho việc giúp làm việc với bất đồng bộ như đồng bộ 

// - Từ khóa Async : 
    // + Sử dụng đặt trước 1 hàm -> hàm đó sẽ luôn trả về Promise resolve / reject
    // + Async giúp tạo ra 1 hàm làm việc với bất đồng bộ riêng biệt với bên ngoài
    // + Hàm async luôn trả về 1 Promise resolve/reject nên có thể sử dụng .then() .catch() đề nhận kết quả từ hàm

// - Từ khóa Await :
    // + Chỉ được sử dụng bên trong hàm async và đứng trước 1 Promise 
    // + Await sẽ đợi cho Promise trả về kết quả lúc này phần code bên trong hàm async phía dưới await sẽ tạm dừng đợi kết quả từ nó 
    // + Await chỉ ảnh hưởng trong phạm vi hàm async , các phần code phía dưới nó đợi kết quả từ Promise 
    // -> Nếu Promise resolve chạy tiếp phần code phía dưới trong catch , Promise reject sẽ throw ra 1 lỗi ngay trước await và bắt bởi cacth

// - Sử dụng try/catch đối với đồng bộ và bất đồng bộ
    // + Đối với đồng bộ : try/catch bắt được mọi lỗi nếu được đặt trong try và thực hiện ngay lập tức khi gặp lỗi bắt bởi catch

    // + Đối với bất đồng bộ : 
        // - callback và Promise : là 2 cách nhận giá trị trong tương lai mà try/catch bắt luôn lỗi ở hiện tại 
        // -> try/catch không thể bắt được lỗi của callback và Promise , callback tự tạo ra thủ công bắt lỗi , Promise sử dụng .catch()

        // - async/await : có thể sử dụng try/catch vì lúc này biến đổi lỗi của Promise rejection thành exception nên nêu code nằm 
        // trong khối try có thể bắt lỗi và ném ra 1 lỗi cạnh await rồi catch bắt lỗi đó 
        // - lưu ý sử dụng try/catch đối với async/await:
            // + muốn bắt lỗi Promise bắt buộc phải có await đứng trước Promise đó -> chuyển Promise rejection sang exception
            // + có thể bắt lỗi đồng bộ bên trong hàm async miễn là phải nằm trong catch
            // + có thể try/catch lồng nhau
            // + không nên lạm dụng try/catch quá nhiều 
            
    async function fetchPost(id){
        try{
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
            if(!response.ok) throw new Error(`Lỗi mạng : ${response.status}`);
            const posts = await response.json();
            const title = posts[`title`];
            console.log(title);
            return title; 
        }catch(err){
            console.log(err.message);
        }
    }
    fetchPost(1);
    fetchPost(101);

    // test
    b = Date.now()
    setTimeout(()=> {
        let a = Date.now();
        console.log(a - b)
    },2000)
    