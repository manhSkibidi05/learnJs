// Lý thuyết về localStorage 
    // 1. khái niệm 
    // - localStorage : là 1 kho lưu trữ dưới dạng key-value (cặp khóa - giá trị) do trình duyệt cung cấp . Dữ liệu đươc lưu vĩnh viễn (cho đến khi xóa nó đi) và chỉ
    // có thể truy cập từ cùng 1 tên miền 

    // 2. đặc điểm 
    // + dung lương khoảng từ 5 đến 10 mb
    // + chỉ lưu trữ giá trị là 1 chuỗi -> nếu lưu obj hay arr thì phải chuyển thành JSON 
    // + tốc độ đồng bộ -> mọi thao tác chay ngay lập tức không cần callback
    // + tồn tại  không bị xóa khi tắt trình duyệt 
    // + phạm vi sử dụng khi dùng chung 1 tên miền lúc này dữ liệu sẽ được lưu tại tên miền đó -> khi truy cập có thể tải dữ liệu từ đó lên và hiển thị 

    // 3. các thuộc tính và phương thức chính 

    // + lưu trữ dữ liệu : 1 dữ liệu bao gồm cặp key và value -> value bắt buộc là 1 chuỗi
    localStorage.setItem(`name`,`đậu tẩm hành`);

    // + lấy dữ liệu : lấy value dựa trên key trước đó -> trả về string hoặc null nếu chưa tồn tại
    localStorage.getItem(`name`);

    // + xóa dữ liệu : xóa dữ liệu đã được lưu theo key trước đó 
    localStorage.setItem(`age`,`18`);
    localStorage.removeItem(`age`);

    // + xóa tất cả dữ liệu đã được lưu trong storage 
    localStorage.clear();

    // + số lượng hiện tại dữ liệu đang đươc lưu trong localStorage
    localStorage.length;

    // 4. cách lưu trữ mảng và obj vào localStorage 
    // - vì localStorage chỉ lưu trữ giá trị là string nên khi lưu obj hay arr thì cần chuyển đổi nó sang dạng string mới lưu được
    // - cách chuyển đổi arr/obj thành str bằng JSON : 
        // + sử dụng phương thức JSON.stringify() : chuyển đổi arr/obj thành dạng text
        // + sử dụng phương thức JSON.parse() : chuyển đổi lại text thành arr/obj

    const arr = [1,2,3,4,5,6,7,8];
    const obj = {name : `moy`, age : 18 , job : `dev web fulltime - parttime become to grab driver`};

    // lưu dữ liệu vào localStorage
    localStorage.setItem(`arr`, JSON.stringify(arr));
    localStorage.setItem(`obj` , JSON.stringify(obj));

    // đọc dữ liệu ra
    let strValue = localStorage.getItem(`arr`);
    if(valueOutput){
        let arrValue = JSON.parse(strValue);
        console.log(arrValue)
    }
    
    // 5. lưu ý 
    // + không lưu thông tin nhạy cảm (mật khẩu , token..) -> localStorage có thể bị đọc qua Js
    // + dữ liệu không dc mã hóa -> lưu dưới dạng plain text

    // review về localStorage 

    // - localStorage : là nơi lưu trữ dữ liệu của trang web mỗi dữ liệu được lưu thành kiểu key và value trong đó value chỉ có thể dưới dạng string (chuỗi)

    // - các phương thức của localStorage : 
        // + thêm hay sửa giá trị của 1 dữ liệu :
        localStorage.setItem(`key` , `value1`);
        // + xóa 1 dữ liệu thông qua key :
        localStorage.removeItem(`key`);
        // + xóa toàn bộ dữ liệu trong localStorage
        localStorage.clear();
        // + lấy giá trị của 1 dữ liệu thông qua key 
        localStorage.getItem(`key`);
        // + trả về số lượng dữ liệu trong localStorage
        localStorage.length ;

    // - sử dụng localStorage khi : 
        // + điểm lợi : + dữ liệu không biến mất sau khi reload trang 
            // + giá trị lưu trữ có thể là obj/arr thông qua chuyển đổi dữ liệu 
        // + hạn chế : + dữ liệu có thể đọc bởi người dùng vì dữ liệu đưới dạng text -> dễ dàng bị tấn công 
            // + chỉ lưu trữ dữ liệu nhỏ 

    // - chuyển đổi dữ liệu arr/obj sang string để lưu trữ dưới dạng JSON
    let arrLocal = [1,2,3,4,5];
    let objLocal = {name : `moy`};

    let arrJson = JSON.stringify(arrLocal);
    let objJson = JSON.stringify(objLocal);

    // -> phương thức stringify() giúp chuyển đổi dữ liệu dạng mảng và obj sang dạng chuỗi 

    localStorage.setItem(`arr` , arrJson);
    
    let arrAgain = JSON.parse(arrJson);

    // -> sau đó có thể thêm dữ liệu mới vào localStorage với dữ liệu JSON 
    // -> có thể chuyển đổi lại từ JSON sang obj dùng phương thức parse() 

        