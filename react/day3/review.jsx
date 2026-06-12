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
        