// object (đối tượng) : giống 1 chiếc hộp thần kì lưu trữ mọi thứ : số , chuỗi , mảng , hàm ,obj khác

// + Phần 1:
    // Object là 1 cấu trúc dữ liệu lưu trữ dữ liệu dưới dạng key và value
    let n1 = {
        name : "a long",
        age:28,
        home:"Hà Nội"
    };
    console.log(`tên của n1 là ${n1.name}`);

// + Phần 2:
    // Khai báo 1 object : khai báo trong dấu ngoặc {} mỗi cặp key value cách nhau bởi dấu phảy ,
    // sử dụng từ khóa new Object() -> khởi tạo trước đối tượng rồi mới thêm các cặp key và value
    let n2 = new Object();
    n2.name = "a nong";
    console.log(`tên của n2 là ${n2.name}`);

// + Phần 3:
    // Truy cập vào các giá trị trong obj : truy cập thông qua dấu chấm .
    // -> truy cập thông qua dấu ngoặc [] : áp dụng đối với các key mang kí tự đặc biệt
    let n3 ={
        name : "dog",
        "hình dáng" : "lông lá ",
    };  
    console.log(`hình dáng của con chó : ${n3["hình dáng"]}`);
    // các thao tác cơ bản đối với obj : thêm , sửa , xóa 1 cặp key và value bên trong obj
    // + thêm
    n3.age = 18;
    n3["chiêu trò"]= "sủa";
    // + sửa 
    n3.name = "mèo";
    n3["chiêu trò"] = "kêu";
    // + xóa
    delete n3.name;
    console.log(n3);

// + Phần 4 :
    // Các thao tác quan trọng đối với obj
    // + kiểm tra 1 thuộc tính có tồn tại bên trong obj hay không
        // - sử dụng in oparator để kiểm tra các thuộc tính đang tồn tại bên trong obj tính cả các thuộc tính được kế thừa
        // - sử dụng phương thức hasOwnProperty() cũng để kiểm tra thuộc tính có đang tồn tại trong obj không -> nhưng không tính các thuộc tính được kế thừa
        let dt = {
            ten : "smart phone",
            nam :2005
        }
        let iphone = Object.create(dt);
        iphone.gia = 10000;
        if("ten" in dt){
            console.log("sử dụng in operator thuộc tính ten nằm trong obj dt");
        } 
        if("ten" in iphone){
            console.log("sử dụng in operator thuộc tính ten nằm trong obj iphone");
        }else{
            console.log("ten không nằm trong iphone")
        }
        if(dt.hasOwnProperty("ten")){
            console.log("sử dụng hasOwnProperty() ten có nằm trong obj dt");
        }
        if(iphone.hasOwnProperty("ten")){
            console.log("sử dụng hasOwnProperty() ten có nằm trong iphone");
        }else{
            console.log("sủ dụng hasOwnProperty() ten không được tính");
        }
        // -> sủ dụng phương thức hasOwnProperty() trong trường hợp chỉ kiểm tra các thuộc tính nằm trực tiếp trong obj mà không thông qua kế thừa

    // + duyệt qua các thuộc tính của object 
        // - sử dụng for in 
        for(let key in dt){
            console.log(`${key} : ${dt[key]}`);
        }
        // -> duyệt qua toàn bộ key trong đối tượng , mỗi key trả về 1 value bằng cách truy cập obj[key]

        // - sử dụng 3 phương thức cho sẵn bởi object -> biến đối tượng thành mảng rồi dùng vòng lặp forEach lặp qua từng giá trị
            // Cú pháp và cách hoạt động vòng lặp forEach 
                // Cú pháp : arr.forEach(function(currentValue,index,array){
                // câu lệnh mỗi lần lặp }); -> mỗi lần lặp sẽ đi qua giá trị nằm trong mảng và thực hiện câu lệnh trong hàm cho mỗi giá trị
                // hàm có 3 tham số : currentValue -> tham số bắt buộc là 1 giá trị của mảng 
                // index -> tham số kh bắt buộc là chỉ số index của giá trị hiện tại , array -> tham số không bắt buộc là mảng hiện tại 

            // + Object.keys(tên_obj) -> duyệt qua toàn bộ thuộc tính , lấy key (tên thuộc tính) , đưa vào 1 mảng mới -> trả về mảng đó
            // -> phương thức này lấy danh sách tên thuộc tính 
            arrKeys = Object.keys(dt);
            arrKeys.forEach((currentValue)=>{
                console.log(`tên thuộc tính key : ${currentValue}`);
            });
            // + Object.values(tên_obj) -> duyệt qua toàn bộ thuộc tính , lấy value ( giá trị của thuộc tính) , đưa vào 1 mảng mới -> trả về mảng đó
            // -> phương thức này lấy danh sách giá trị của thuộc tính
            arrayValues = Object.values(dt);
            arrayValues.forEach(function(cValues){
                console.log(`giá trị thuộc tính value : ${cValues}`);
            });
            // + Object.entries(tên_obj) -> duyệt qua toàn bộ thuộc tính, mỗi thuộc tính tạo 1 mảng con , đưa mảng con vào mảng lớn -> trả về 1 mảng 2 chiều
            // -> lấy danh sách thuộc tính mỗi thuộc tính là 1 mảng con bao gồm key và value , mảng con nằm trong mảng lớn chứa tất cả thuộc tính
            arrayEntries = Object.entries(dt);
            arrayEntries.forEach(function([key,value]){
                console.log(`${key} : ${value}`);
            });
            // -> tham số truyền vào hàm là 1 mảng [key,value] do mảng đang thực hiện vòng lặp là 1 mảng 2 chiều 1 giá trị = 1 mảng gồm 2 phần tử
            // -> sử dụng destructuring chuyển currentValue = [key , value] -> dễ dàng thao tác với key hoặc value hơn

    // + sao chép object
    // - sử dụng spread operator : liệt kê các thuộc tính riêng -> chỉ các thuộc tính riêng của obj mới được liệt kê ra
    let arrTet={
        a : 1,
        m : "mứt",
        p : "pánh trưng",
    }
    let arrTetClone = {...arrTet};
    arrTetClone.a = 2;
    console.log(arrTet.a);
    console.log(arrTetClone.a);
    // -> chỉ là sao chép nông với các thuộc tính mang dữ liệu nguyên thủy thì lúc thay đổi dữ liệu sẽ không ảnh hưởng bản gốc
    // -> dữ liệu là obj/arr thì chỉ đang tham chiếu đến arr/obj nên vẫn ảnh hưởng đến bản gốc

