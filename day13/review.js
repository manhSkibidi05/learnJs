// Review ngày 13 : 

    // - Các giá trị trong js đều có thể chuyển sang kiểu boolean 
    // + Các giá trị falsy : 0 , -0 , 0n , false , null , undefined , "" , NaN -> khi kiểm tra sẽ trả về false
    // + Các giá trị truly : Các giá trị còn lại (số khác 0 , chuỗi khác rỗng , [] , {} , () => {})

    // - Toán tử && và || 
    // + a && b : trả về b nếu cả a và b mang giá trị truly , nếu a mang falsy trả về a 
    // + a || b : trả về a nếu a mang giá trị truly , nếu a mang giá trị falsy trả về b 
        // -> dùng để gán giá trị mặc định cho 1 phần tử khi giá trị a falsy thì mặc định giá trị là b  
    
    // - Toán tử 3 ngôi : biểu thức điều kiện ? biểu thức trả về khi đúng : bt trả về khi sai 
    // + a ? b : c -> sử dụng để chạy 1 biểu thức bất kì dựa trên điều kiện (rút gọn của if else)

    // - ?. : lấy thuộc tính / phương thức an toàn trong đối tượng lồng nhau 
    
    let user = { name : {firstName : 'lam' , lastName : {lastFullName : null}}};

    // -> nếu thuộc tính bên trong đối tượng chưa tồn tại hoặc mang giá trị null thay vì báo lỗi thì
    // giá trị được trả về là null/undefined
    console.log(user?.name?.firstName);
    console.log(user?.name?.LastName?.lastFullName);

    // - ?? : gán giá trị mặc định cách an toàn hơn || 
    // + a ?? b : nếu a mang giá trị null/undefined thì trả về b , nếu a mang các giá trị còn lại thì trả về a
    // -> chỉ trong trường hợp a = null/undefined thì trả về b là giá trị mặc định 

    // -> kết hợp giữa ?. và ?? để kiểm tra an toàn 1 đối tượng và gán giá trị mặc định 
    console.log(user?.address?.city ?? 'Chưa có địa chỉ')