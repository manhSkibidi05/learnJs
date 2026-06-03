// Ngày 13 : Các khái niệm nâng cao - Truly/Falsy , short-circuit , ternary , optional chaining coalescing 

    // - Các khái niệm rất quan trọng để viết code sạch , an toàn , hiệu quả , đặc biệt khi render có điều kiện trong React 
    // -> Đây là một trong những thứ bạn sẽ dùng hằng ngày 

    // - Mục tiêu :
    // + Hiểu thế nào là truly và falsy 
    // + Dùng short-circuit && và || để render có điều kiện 
    // + Dùng ternary operator ? : để thay thế if-else ngắn 
    // + Dùng optional chaining ?. để truy cập an toàn vào object lồng nhau
    // + Dùng nullish coalescing ?? để cung cấp giá trị mặc định khi null hoặc undefined 
    // + Áp dụng toàn bộ kỹ thuật này trong react 

// 1. Truly và Falsy 
    // - Trong js mọi giá trị đều có thể chuyển đổi thành boolean. Falsy là những giá trị sẽ chuyển thành false 
    
    // 1.1. Falsy value : Gồm 8 giá trị
        // + false
        // + 0 , -0 , 0n
        // + ""
        // + null
        // + undefined
        // + NaN
    // -> khi các giá trị này được chuyển sang boolean sẽ trả về false

    // 1.2. Truly value : Các giá trị còn lại 
        // + true
        // + 1, 2, 3 -> các số khác 0
        // + 'abc' -> chuỗi khác chuỗi rỗng
        // + {} , [] , () => {} -> obj , mảng và function kể cả trường hợp rỗng 
    // -> Khi các giá trị này được chuyển sang boolean sẽ trả về true 

// 2. Short-circuit evaluation - && và || 

    // 2.1. Toán tử && (AND)
    // - a && b trả về a nếu a là falsy và trả về b nếu a là truly 
    // -> trường hợp này luôn trả về b nếu cả a và b là truly , nếu a hoặc b falsy thì luôn trả về a 

    let a = true;
    console.log(a && 'heloo');

    // -> sử dụng && trong trường hợp biểu thức b sẽ được chạy nếu như a truly : b phụ thuộc vào a 

    // 2.2. Toán tử || (OR)
    // - a || b trả về a nếu a truly và ngược lại nếu b truly sẽ trả về b 
    
    console.log("" || 'come');
    console.log(0 || 'my');
    console.log(null || 'way');
    console.log('son tung' || undefined)

    // -> Thường sử dụng || để gán giá trị mặc định nếu a biểu thức ban đầu falsy sẽ trả về biểu thức b (biểu thức mặc định)
    // - Chú ý : với || tất cả giá trị falsy sẽ được áp dụng nên đối với vài trường hợp 0 hay chuỗi rỗng được trả về thì nên sử dụng ?? (null / undefined)

// 3. Ternary operator - biểu thức 1 (điều kiện) ? biểu thức 2 : biểu thức 3
    // - Thay thế cho if else ngắn -> xét điều kiện bt1 true sẽ trả về giá trị bt2 false trả về giá trị bt3

    let age = 18;
    console.log(age > 17 ? 'pem': 'pem x2');

// 4. Optional chaining - ?.

    // - Cho phép truy cập thuộc tính của object mà không gây lỗi nếu object hoặc thuộc tính trung gian là null/undefined 

    const user = {name : { fullName : 'cau' , lastName : 'co' , firstName : null} , address : {city : 'hn'}};

    console.log(user?.name?.fullName);
    console.log(user?.name?.firstName);
    console.log(user?.address?.hometown);

    // -> Giá trị trả về undefined nếu thuộc tính chưa được khởi tạo , trả về null nếu thuộc tính mang giá trị null
    // -> ?. giúp cho phép chúng ta truy cập thuộc tính của obj lồng nhau 1 cách an toàn , trong các trường hợp thuộc tính = null hay chưa được khởi tạo
    // giá trị trả về null/undefined 

// 5. Nullish coalescing - ?? 

    // - a ?? b trả về a nếu a không phải là null/undefined , nếu a là null/undefined thì trả về b 
    // -> khác với a || b , a ?? b thì a chỉ nhận null/undefined là giá trị falsy các giá trị khác sẽ vẫn in ra bình thường 

    console.log( 0 || 'chuỗi 1');
    console.log( 0 ?? 'chuỗi 1');

    console.log(null || 'chuỗi 2' );
    console.log(null ?? 'chuỗi 2' );

    // -> với a ?? b thì a đóng vai trò biểu thức điều kiện a đúng thì trả về a và  a sai trả về b và b là trường hợp mặc định 
    // -> khác với || thì ?? a sai khi a là null/undefined rất phù hợp khi kết hợp với ?. 

// 6. Kết hợp các toán tử 
    // - Có thể kết hợp ?. và ?? để truy cập an toàn và có giá trị mặc định 

    console.log(`Tên user là : ${user?.name?.fullName ?? 'Tên chưa thêm'}`);
    console.log(user?.name?.firstName ?? 'Tên chưa tồn tại');
    console.log(user?.address?.hometown ?? 'Địa chỉ chưa được thêm');
    // -> 2 thuộc tính firstName và hometown trả về null/undefined nên trả về giá trị mặc định 

    // - Kết hợp với ternary 
    console.log(user?.hobby?.freeTime ? 'Có tồn tại' : 'Chưa tồn tại')