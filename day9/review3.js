// async/await với xử lí bất đồng bộ 

    // async : Từ khóa đặt trước 1 hàm -> hàm đó luôn trả về 1 Promise 
    // - Khi hàm async return về giá trị nào đó thì sẽ là Promise.resolve giá trị đó
    // - Khi hàm async throw lỗi thì Promise.reject lỗi đó
    // -> Hàm async làm hàm luôn trả về Promise giúp hàm đó có thể .then() .catch() để lấy dữ liệu khi xử lí xong bởi hàm 

    // await : Từ khóa đặt trước 1 Promise -> Chỉ được sử dụng bên trong hàm async giúp tạm dừng phần code phía dưới nó để nhận dữ liệu 
    // - Khi await đứng trước Promise.resolve chạy tiếp phần code dưới nó cho tới hết chương trình 
    // - Khi await đứng trước Promise.reject trả ra lỗi -> nếu nằm trong khối try/catch sẽ được catch bắt 

    async function selectSumX2(a , b){
        try{
            let sum = a + b;
            let sumX2 = await new Promise(resolve => setTimeout(() => resolve(sum*2), 1000))
            if(sumX2 < 10) throw new Error(`Lỗi tổng quá nhỏ`);
            console.log(`Tổng hợp lệ : ${sumX2}`);
            return sumX2;
        }catch(err){
            console.log(err.message);
        }
    }
    selectSumX2(5 , 10);
    selectSumX2(1 , 2);
    
    // Các phương thức tĩnh được async/await sử dụng 
    // -> Vì bản chất async/await được xây dựng dựa trên Promise nên chúng ta có thể sử dụng các phương thức tính của Promise cho việc sử dụng async/await

    // - Promise.all() -> sử dụng với async/await để chạy song song các Promise đối với các task không cần phụ thuộc vào nhau thì chạy song song giúp tiết
    // kiệm thời gian . 
    // -> Khi có Promise gặp lỗi thì sẽ không chạy các Promise khác mà chạy vào catch để bắt lỗi 

    // - Promise.allSetlled() -> sử dụng với async/await để chạy song song các Promise nhưng dữ liệu trả về khác với Promise.all vì Promise.allSetlled
    // trả về 1 đối tượng Promise mang cả resolve và reject
    // -> Sử dụng khi lỗi task này không ảnh hưởng đến task khác vẫn chạy toàn bộ các Promise trong mảng 

    // - Promise.race() -> sử dụng với async/await để trả về 1 Promise xử lí bất đồng bộ nhanh nhất 
    // -> Sử dụng với việc đo thời gian 1 task xử lí nếu quá lâu hủy task đó 

    // Các kĩ thuật nâng cao 
    // - Xử lí tuần tự -> sử dụng await khi cần task đó xứ lí trước đợi nhận kết quả task này rồi mới sang task khác
    // - Xử lí song song -> sử dụng Promise.all gom lại mảng các Promise cần sử lí và await thao tác đó
    