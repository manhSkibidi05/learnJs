// Ngày 7 : Context API và useReducer , Kết hợp Context API và useReducer tạo store quản lí state 

    // Mục tiêu : 
        // + Hiểu rõ Context API là gì , tại sao cần dùng để tránh 'prop drilling'
        // + Biết cách tạo Context , Provider , và custom hook tiêu thụ context 
        // + Làm chủ useReducer - Giải pháp quản lý state phức tạp hơn useState , đặc biệt state có nhiều 
        // trường và cần cập nhật theo logic 
        // + Kết hợp Context API + useReducer để tạo một store toàn cục nhẹ , quản lí state ở cấp ứng dụng 
        // + Áp dụng vào bài tập thực hành

// 1. Context API - Giải pháp cho 'prop drilling' 

    // - Prop drilling là 