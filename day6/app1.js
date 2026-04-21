// __________________________HÀM NÂNG CAO______________________________

// PHẦN 1 : CÁC LOẠI HÀM 
    // 1. function declaration : hàm khai báo (hàm thông thường)
    console.log(sayHi());
    function sayHi(){
        return `hi`;
    }
    // - Đặc điểm : + được hoisting -> đưa lên đầu scope
        // + có thể gọi hàm trước khi định nghĩa nó 
        // + có thể tạo trong global scope hoặc function scope
        // -> với hàm được hoisting lúc này có thể sử dụng trước hàm đó vì sau khi định nghĩa xong hàm này sẽ được hoisting lên đầu scope hàm được khai báo
        // -> global scope là phạm vi toàn bộ chương trình có thể gọi và sử dụng bất cứ đâu , function scope : phạm vi trong hàm chỉ có thể gọi và sử dụng trong hàm
    // - nên sử dụng declaration function khi :
        // + gọi hàm trước khi định nghĩa 
        // + tạo constructor
        // + tạo các phương thức cho class/object 
        // + sử dụng với hàm đệ quy 
        // + sử dụng được với argument object -> đối tượng lưu trữ các giá trị truyền vào hàm như 1 mảng nhưng không dùng dc các phương thức của mảng 
    // -> hàm dễ nhìn , dễ debug  dùng trong hầu hết các trường hợp 

    // 2. function expression : hàm biểu thức (khai báo 1 biến là 1 hàm)
    // lỗi khi sử dụng lệnh này console.log(sayHi2());
    const sayHi2 = function(){
        return `hi 2`;
    }
    console.log(sayHi2());
    // - Đặc điểm : + không được hoisting
        // + không thể gọi hàm trước khi định nghĩa nó 
        // + dùng gán cho 1 biến hoặc 1 thuộc tính
        // -> với hàm không được hoisting chỉ sử dụng hàm sau khi đã được định nghĩa
    // -> dùng ít
    
    // 3. arrow function : hàm mũi tên 
    // - cú pháp : const tên_hàm = (tham số 1 , tham số 2..) => {code};
    // -> trước dấu arrow sẽ là tham số , sau dấu arrow dữ liệu trả về cho hàm 
    // - return : trong arrow function khi dữ liệu đơn giản sẽ không cần thiết return sẽ tự return ngầm dữ liệu gán cho biến 
    const add = (a , b) => a + b;
    const square = x => x * x;
    const greet = () => console.log(`hi 3`);
    console.log(add(1,2));
    console.log(square(3));
    greet();
    // - đặc điểm : + cú pháp ngắn gọn 
        // + không có this riêng -> this phụ thuộc vào scope (phạm vi định nghĩa this bên ngoài )
        // + không có argument object 
        // + không dùng làm constructor
    // - nên sử dụng khi :
        // + sử dụng với hàm callback
        // + cần giữ this 
        // + logic 1 dòng 
        // + Rest parameter : dùng thay cho argument object -> vì arrow function kh dùng dc , sử dụng cách này là thao tác 1 arr có thể sử dụng phương thức của arr
    // -> arrow function ngắn gọn 
    

// PHẦN 2 : Scope (phạm vi ) -> nơi biến được phép tồn tại
    // 2.1 : Các loại phạm vi 
    const globalVar = `biến toàn cục`;

    function bye(prameter){
        const functionVar = `biến hàm`;

        if(!globalVar){
            const blockVar = `biến block 1`;
        }else{
            const blockVar = `biến block 2`;
        }
        return prameter + "  " +functionVar;
    }
    console.log(bye(globalVar));
    // - biến toàn cục : khai báo scope ngoài cùng -> có thể gọi và sử dụng trong bất kì scope nào 
    // - biến hàm : khai báo bên trong 1 hàm -> chỉ có thể gọi và dùng bên trong scope của hàm đó 
    // - biến block : khai báo biến bên trong 1 khối lệnh nằm trong dấu ngoặc {} (if , for ...) -> biến chỉ tồn tại trong khối lệnh này sử dụng trong scope của khối lệnh {}

    // 2.2 : lexical scope (scope tĩnh)
    const name = "Global";
    function outer() {
        const name = "Outer";
        
        function inner() {
            const name = "Inner";
            console.log(name); // "Inner"
        }
        
        function inner2() {
            console.log(name); // "Outer" (tìm ở scope bên ngoài)
        }
        
        inner();
        inner2();
    }
    outer();
    // -> Phạm vi sử dụng biến cùng tên nhưng khác scope :
        // + với hàm có khai báo biến cùng tên với biến được khai báo scope bên ngoài -> khi gọi sẽ dùng biến được khai báo ở chính hàm đó
        // + với hàm không khai báo biến cùng tên với biến được khai báo scope bên ngoài -> sử dụng biến ngay scope bên ngoài  
        // -> sử dụng biến khi chưa được khai báo trong scope của chính hàm này -> tìm biến đó ở scope bên ngoài nếu bên ngoài có sủ dụng -> nếu không tìm tiếp scope ngoài cùng
        // -> tìm biến từ trong ra ngoài 

    // 2.3 : hoisting -> đưa biến hoặc hàm lên đầu scope của chúng 
        // khai báo biến = var 
            console.log(yourName);
            var yourName = `bằng`;
            console.log(yourName);
            // -> khi sử dụng biến mà chưa được định nghĩa sẽ trả về undefined -> var sẽ được hoisting khởi tạo biến lên đầu scope 
            // -> biến sau khi được định nghĩa trả về giá trị bình thường 
            for(let i = 0 ; i < 10 ; i++){
                var count = 0;
                count++;
            }
            let doMiXi = count + " nà ná na na";
            console.log(doMiXi);
            // -> var không bị cản trở bởi block scope -> khai báo biên trong block scope nhưng khi sủ dụng bên ngoài vẫn dùng được 
        // khai báo biến let , const 
            // console.log(myName); lỗi 
            let myName = `nhím`;
            console.log(myName);
            // -> khai báo với let/const việc gọi biến trước gây lỗi -> không dc hoisting lên đầu scope 

