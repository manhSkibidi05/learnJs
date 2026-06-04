// Ngày 14 : this và Object method (cơ bản)

    // - This và object method là một khái niệm quan trọng trong js nhưng trong react hiện đại (function component) bạn không cần dùng this . Tuy nhiên vẫn cần
    // hiểu để đọc code cũ , các thư viện , hoặc khi gặp class component 

    // - Mục tiêu : 
        // + Biết method là hàm thuộc object 
        // + Cách viết method (shorthand syntax)
        // + Hiểu this trong method tham chiếu đến object trước dấu chấm 
        // + Biết rằng arrow function không có this riêng 
        // + Học về các trường hợp phức tạp (bind , call , apply)

// 1. Object method là : Một hàm được định nghĩa như 1 thuộc tính của object , nó có thể truy cập các thuộc tính khác của cùng obj qua từ khóa this 

    const cat = {
        name : 'kitty',
        say(){
            return `${this.name} say : meo meo`
        }
    }
    console.log(cat?.say());

// 2. Từ khóa this trong method 
    // - Khi obj gọi method thì this bên trong method đó chính là object đang gọi nó 
    // -> this chỉ được mang giá trị khi mà được gọi 

    const cal = {
        a : 10,
        b : 26,
        // + lúc định nghĩa 1 phương thức this chưa được tham chiếu đến obj nó chỉ đại diện cho 1 obj truy cập đến thuộc tính của obj đó
        add(){
            return this.a + this.b;
        },
        multiply(){
            return this.a * this.b;
        }
    }
    // + khi obj gọi ra phương thức thì this lúc này được tham chiếu đến obj gọi nó và trả về thuộc tính cần thiết 
    console.log(cal?.add());
    console.log(cal?.multiply());

    // + trường hợp mà this không được tham chiếu đến obj gọi nó
    const func = cal.add;
    // console.log(func());
    // -> xảy ra lỗi do this = undefined

// 3. Arrow function và this 
    // - Arrow function không có this riêng . Nó lấy this từ phạm vi bên ngoài (lexical scope)
    // -> không nên dùng arrow function để làm method trong obj 

    const user = {
        name: 'An',
        greet: () => {
            console.log('Hello, ' + this.name); // this ở đây là global, không phải user
        }
    };
    // user.greet(); // "Hello, undefined"

// 4. call , apply , bind : cả 3 phương thức này đều được sử dụng để kiểm soát giá trị của this bên trong 1 hàm .
// -> đây là những công cụ quan trọng khi bạn cần gọi 1 hàm với ngữ cảnh do mình chỉ định thay vì để js tự xác định 

    // - this trong js kà 1 từ khóa tham chiếu đến đối tượng mà hàm được gọi trong ngữ cảnh đó 
    // -> call ,apply , bind cho phép can thiệp vào this giúp code linh hoạt tránh lỗi 

    // 4.1 Call()
    // - Gọi hàm ngay lập tức truyền các đối số gồm : this và các giá trị riêng lẻ 
    // - Cú pháp : func.call(thisArg , arg1 , arg2...);

    function introduce(greeting, punctuation) {
        console.log(greeting + ', tôi là ' + this.name + punctuation);
    }

    const person = { name: 'An' };
    introduce.call(person, 'Xin chào', '!'); 
    // Output: Xin chào, tôi là An!
    // -> this ở đây được gán = 1 obj nên bên trong hàm các this sẽ được tham chiếu đến obj này 

    // 4.2 Apply()
    // - Gọi hàm ngay lập tức truyền các đối số gồm : this và nhận 1 mảng các giá trị 
    // - Cú pháp : func.apply(thisArg , [arg1 ,arg2 ...])

    const numbers = [5, 2, 9, 1];
    const max = Math.max.apply(null, numbers); // nếu this không cần thiết trong hàm apply hoàn toàn có thể gán = null
    console.log(max); // 9

    // 4.3 Bind()
    // - Tạo hàm mới với this cố định , không gọi ngay
    // - Cú pháp : const boundFunc = func.bind(thisArg , arg1 , arg2...)

    const human = { name: 'Long' };
    function sayHello(greet) {
        console.log(`${greet} : bạn tên ${this.name}`);
    }
    const boundSayHello = sayHello.bind(human); // gán this tham chiếu mặc định = obj human chỉ thay đổi các đối số khác truyền vào lúc gọi hàm mới 
    boundSayHello('shut up'); 
    boundSayHello('chào nhé'); 

