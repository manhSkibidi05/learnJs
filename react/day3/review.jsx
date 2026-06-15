// review ngày 3 : 

    // - Sử dụng map() để tạo ra mảng các phần tử JSX 
        // + Dựa trên giá trị từ props hoặc state trả về 1 mảng ta có thể sử dụng map() tạo ra mảng mới với các phần tử JSX
        // -> Khi chạy tự React sẽ render hết các phần tử trong mảng nhưng các phần tử JSX phải có thêm thuộc tính key

    // - Thuộc tính key của phần tử JSX 
        // + Thêm thuộc tính key trong trường hợp các mảng phần tử JSX giúp React dễ phân biệt hơn
        // -> thuộc tính key phải mang giá trị duy nhất thường mang giá trị id của phần tử mảng do props hoặc state cung cấp

    // - Conditional rendering 
        // + Sử dụng if...else ở bên ngoài vùng JSX xử lí điều kiện phức tạp 
        // + Sử dụng toán tử 3 ngôi bên trông vùng JSX dùng trong ngoặc {} xử lí điều kiện đơn giản
        // + Sử dụng && và || khi cần render 1 phần tử dựa vào sự tồn tại phần tử khác 

    // - Css moudule 
    // -> sử dụng css cục bộ cho các component tránh việc trùng tên class khi có nhiều component , các bước :
        // + tạo file tênComponent.module.css -> bắt buộc có cụm module.css
        // + import file này với styles là biến nhận -> styles là 1 đối tượng nhận từ file trên
        // + sử dụng các class trong file bằng cách gọi styles.tenClass -> sử dụng class như thuộc tính của styles
        // + react tự tạo ra các tên class riêng biệt cho phần tử JSX và phần tử đó sẽ mang các css của class đó
        

// review 3 ngày : 
    // - React là một thư viện của javascript 

    // - React tạo ra cú pháp mới là JSX viết giống html nhưng có các điểm khác : 
        // + cú pháp này không thể chạy trên trình duyệt mà khi chạy các đoạn mã jsx sẽ được biên dịch thành mã js 
        // + có thể tự tạo ra các phần tử jsx tùy chọn thay vì những thẻ được định nghĩa sẵn giống html
        // + các thuộc tính của phần tử JSX phải tuân theo đúng quy tắc : tên thuộc tính phải camelCase , giá trị thuộc tính có thể bất kì kiểu giá trị nào
        // + có thể viết mã js bên trong mã jsx nhưng phải sử dụng dấu {} -> bên trong dấu {} mã js có thể bất kì giá trị nào nhưng phải trả về 1 giá trị 
        // + các thẻ không có thẻ đóng như img , br thì khi viết bằng jsx phải đóng thẻ vd : <img />
        // + thuộc tính style nhận 1 đối tượng các thuộc tính là các style của css nhưng vẫn tuân theo đúng quy tắc camelCase
    
    // - Định nghĩa 1 component 
        // + react chia chức năng nhỏ thành các component giúp tái sử dụng , dễ bảo trì và phát triển chức năng đó 
        // + quy tắc đặt tên : tên component phải viết hoa chữ cái đầu ngắn gọn không quá dài dòng và không có kí tự 
        // + định nghĩa dựa trên hàm : nhờ vào các đặc điểm công dân hạng nhất của hàm js nên việc react dùng hàm để định nghĩa component 
        // + props : là tham số duy nhất cho phép hàm nhận vào , props là 1 đối tượng trả về các thuộc tính cần thiết nhưng chỉ dùng các thuộc tính chứ không thể thay đổi giá trị 
        // + state : là giá trị cung cấp bởi hàm useState của react , state được coi là nguồn sự thật duy nhất khi dựa vào dữ liệu state để render web và chỉ thay đổi thông qua hàm setState 
            // -> hàm setState nhận giá trị mới rồi thông báo cho component re-render lại 
            // -> cú pháp : const [state , setState] = useState(initialVal)
        // + return của component luôn phải trả về 1 phần tử jsx duy nhất nhưng khi muốn trả về nhiều phần tử cần bọc trong khối div hoặc sử dụng fragment <>...</>

    // - Sử dụng module.css cho component 
        // + khi có nhiều các component tránh việc gây ra mâu thuẫn các className nên react cung cấp module.css  
        // + định nghĩa tên file css : tênComponent.module.css bắt buộc phải có cụm .module.css 
        // + tên các class sử dụng trong file css vẫn áp dụng quy tắc camelCase 
        // + sử dụng bằng cách import file đó sang component và import vào 1 đối tượng styles 
            // -> truy cập tên class giống như thuộc tính của styles sau đó sẽ trả về tên class độc nhất do react chuyển đổi
            // -> 1 phần tử jsx có thể có nhiều class bằng cách nối chuỗi 
        // + cuối cùng phần tử jsx sẽ mang các style của class nó có 

    // - Một số lưu ý :
        // + sử dụng if...else ở vùng code js với trường hợp có nhiều điều kiện và các điều kiện dài phức tạp
        // + sử dụng ternary operator ở vùng code jsx nằm trong dấu {} với các điều kiện đơn giản 
        // + sử dụng map() để tạo ra mảng các phần tử jsx , react tự render ra các phần tử jsx nhưng phải có thuộc tính key cho các phần tử này
        // + thêm state mới khi cần thiết với các giá trị có thể được tính toán dựa trên giá trị state thì không cần thiết thêm làm state mới 
        // + sự kiện của các phần tử jsx chỉ gán địa chỉ các hàm sẽ chạy khi sự kiện diễn ra không gọi trực tiếp hàm 
        // + controller component : các thẻ của form giá trị hiện thị dựa trên giá trị state , khi thay đổi giá trị sẽ gọi hàm setState để cập nhật rồi re-render component
        // + không gọi hook (useState , useEffect) có điều kiện :
            // - không gọi các lời gọi hook trong các điều kiện như if...else , ternary , vòng lặp hay hàm lồng nhau không phải component
            // - React dựa vào thứ tự gọi hook để liên kết state và effect với đúng component instance . Mỗi lần component render react duy trì mảng hook đã dc gọi trước đó 
            // - Khi gọi hook có điều kiện , thứ tự hook giữa các lần render có thể thay đổi dẫn đến : 
                // + state bị sai lệch : react không thể khớp với state cũ với hook mới 
                // + lỗi runtime
                // + hành vi không xác định 