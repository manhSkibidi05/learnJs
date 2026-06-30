// Bắt đầu học những cốt lỗi của react 

// 1. Hiểu về Virtual DOM
// - Đây là xương sống tạo nên tốc độ hiệu quả và đáng kinh ngạc của React 

    // 1.1. DOM thật (Browser DOM)
    // - Thông thường trình duyệt xây dựng giao diện người dùng (UI) dựa trên một cấu trúc cây gọi là DOM (Document Object Model)
    // -> Khi bạn dùng JS để thay đổi giao diện như document.createElement , bạn đang tương tác trực tiếp với DOM này 

        // + Vấn đề : Việc thay đổi các phần tử đã có thì khá nhanh nhưng việc chèn các phần tử mới vào DOM lại cực kì chậm 
        // và tốn kém hiệu xuất

    // 1.2. Giải pháp của React : Virtual DOM 
    // - Thay vì bắt bạn tự tay quản lí các thay đổi phức tạp và chậm chạp trên DOM thật , React tạo ra bản sao bẳng JS gọi là Virtual DOM

        // + Định nghĩa : Virtual DOM là một bộ các chỉ dẫn (instruction) dưới dạng đối tượng JS mô tả giao diện sẽ trông như thế nào
    
        // + Cơ chế hoạt động : Khi dữ liệu thay đổi , React sẽ thay đổi các đối tượng JS này trước (việc này rất nhanh)
        // Sau đó React sẽ so sánh bản cũ với bản mới để tìm ra những thay đổi tối thiểu cần thiết 

    // 1.3. Cách React cập nhật lại giao diện 
    // - Thay vì xóa toàn bộ danh sách và xây dựng lại từ đầu (rất chậm) . React chỉ cập nhật những thay đổi dựa trên so sánh trước đó

        // + vd : Nếu bạn có danh sách 5 người và chỉ thay đổi cảm xúc 3 người từ 'vui' sang 'buồn' , React nhận diện được 
        // 3 sự thay đổi nàyy và chỉ cập nhật 3 phần tử đó trong DOM thật , giữ nguyên 2 phần tử còn lại 
        
        // + Lợi ích : Giảm thiểu tối đa việc can thiệp vào DOM thật và giúp ứng dụng chạy mượt mà ngay cả với dữ liệu lớn 
