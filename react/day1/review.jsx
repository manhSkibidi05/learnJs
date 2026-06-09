// Ôn tập lí thuyết ngày 1 

    // - React là một thư viện của javaScript nó tập chung vào việc xây dựng giao diện hiện thị cho người dùng
    // -> React xây dựng giao diện người dùng dựa trên các component và hoàn toàn có thể thêm các thư viện khác(axios) vào để hoàn thiện ứng dụng

    // - Sự khác biệt khi sử dụng JSX và html , css và js : 
        // + tất cả các biểu thức , biến trong js muốn sử dụng trong JSX đều phải để trong dấu {}
        // -> đây là cách jsx nhúng giá trị từ js 
        
        // + jsx có thể tạo thẻ tùy chọn từ việc khởi tạo các component từ 1 hàm và tham số là 1  đối tượng props cung cấp thuộc tính của thẻ tùy chọn
        // -> việc định nghĩa component giúp chia nhỏ các chức năng và dễ dàng tái sử dụng 

        // + các component khi trả về 1 phần tử thì trả về cách bình thường , trường hợp trả về nhiều phần tử và cần xuống dòng return cần bọc trong dấu () 
        // -> return chỉ trả về 1 phần tử cha nếu trường hợp có nhiều phần tử thì cần bọc trong khối fragment (<>...</>) hoặc khối div

        // + các thẻ không có thẻ đóng của html sang jsx đều phải đóng thẻ <img ../>

        // + các thuộc tính của thẻ phải tuân theo quy tắc của jsx , tên thuộc tính phải là camelCase , giá trị có thể bất kì giá trị nào 
        
        // + với style inline trong jsx thì cần giá trị nhận là 1 obj chứa các style cần thay đổi cho thẻ 

    // - Khi định nghĩa component thì định nghĩa thông qua 1 hàm (hoặc 1 class) hàm chỉ nhận tham số là 1 props và không thay đổi được 
    // -> chúng ta có thể dùng destruring để gọi ra các thuộc tính cần sử dụng trong việc định nghĩa component sau đó khi gọi thẻ component cần truyền dữ liệu vào các thuộc tính đó
    // -> thuộc tính đặc biệt children là các phần tử con bên trong thẻ component 
    