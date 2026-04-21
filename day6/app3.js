// PHẦN 5 : CALLBACK 

    // - Đặc điểm của hàm trong Js (first-class citizen) :
        // + sử dụng làm tham số cho 1 hàm khác
        // + sử dụng để làm dữ liệu trả về cho 1 hàm khác
        // + sử dụng để gán cho 1 biến

    // - callback : là một cách sử dụng hàm 
        // -> khi chúng ta sử dụng hàm như 1 tham số trong 1 hàm khác rồi gọi lại hàm đó -> hàm đó đc gọi là callback

        function yourName(name , nameUppercase){
            console.log(`1.tên hiện tại ${name}`);
            console.log(`2.tên sau khi callback : ${nameUppercase(name)}`);
            console.log(`3.end hàm tên`);
        }
        
        yourName(`Nhàn`,name => name.toUpperCase());

        // - các thao tác sử dụng callback :
            // + định nghĩa hàm ban đầu truyền vào tham số 
            // + sử dụng tham số đó như 1 hàm 
            // + khi gọi hàm ra truyền vào tham số đó là 1 hàm -> lúc này gọi hàm truyền vào tham số đó là hàm callback
        
    // - callback sử dụng với 2 loại : hàm đồng bộ và hàm bất động bộ 
        // 1. Hàm đồng bộ :
            // - hàm xử lí tuần tự các câu lệnh từ trên xuống dưới theo thứ tự 
            // -> đây là cách hoạt động của các hàm thông thường
        
        // 2. Hàm bất đồng bộ
            // - lúc này hàm callback không chạy cùng lúc -> chạy sau khi hết các câu lệnh khác

            console.log("1. Bắt đầu");

            setTimeout(() => {
                console.log("2. Callback chạy sau 2s");
            }, 2000);

            console.log("3. Kết thúc");

    // - tổng kết :
        // + callback là cách sử dụng hàm -> truyền hàm như 1 tham số vào 1 hàm khác và được gọi lại sau
        // + callback có thể là bất cứ loại hàm nào : declaration , expression , arrow -> arrow là phổ biến nhất
        // + sử dụng callback trong cả 2 trường hợp đồng bộ và bất đồng bộ