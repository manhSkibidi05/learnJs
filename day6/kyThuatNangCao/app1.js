// Các kỹ thuật nâng cao với hàm 
    // -> các kỹ thuật này giúp code trở nên ngắn gọn , tái sử dụng và mang phong cách lập trình hàm (functional programming)
    // -> nắm vững các kỹ thuật này giúp bạn viết code chuyên nghiệp , dễ bảo trì và hiệu quả hơn  

    // 1 . Currying 
    // - currying là kĩ thuật biến đổi 1 hàm có nhiều tham số thành 1 hàm có 1 tham số và trả về là 1 hàm khác chứa tham số tiếp theo cho đến khi đủ tham số

    // hàm bình thường với 3 tham số 
    function nhan(a , b , c){
        return a * b * c;
    }

    // hàm bình thường khi áp dụng currying 
    function curryingNhan(a){
        // trả về 1 hàm khác với tham số kế tiếp 
        return function(b){
            return function(c){
                // lặp lại cho tới khi hết tham số trả về phép tính ban đầu
                return a * b * c;
            }
        }
    }
    // callback khi sử dụng currying
    const curryingArrow = a => b => c => a + b + c;
    console.log(curryingArrow(1)(2)(3));

    // - tại sao lại cần currying :
        // + tái sử dụng logic : cố định một số tham số để tạo hàm mới 
        // + dễ dàng composition : kết hợp các hàm nhỏ
        // + tránh lặp code : không cần truyền đi truyền lại cùng 1 giá trị 

        // Ví dụ: Tính thuế
        function calculateTax(rate, price) {
            return price * rate;
        }

        // Currying
        const curriedTax = rate => price => price * rate;

        // truyền tham số cho hàm đầu tiên gán vào 1 biến -> biến này là hàm được truyền tham số đầu 
        const vat10 = curriedTax(0.1);  // Hàm tính thuế 10%
        const vat8 = curriedTax(0.08);  // Hàm tính thuế 8%

        // truyền tiếp tham số 2 cho hàm đã nhận tham số đầu -> có thể thay đổi tham số 2 tùy thích với tham số đầu cố định
        console.log(vat10(100)); // 10
        console.log(vat8(100));  // 8

    // 2. Partial application (ứng dụng 1 phần)

    // 2.1  khái niệm 
        // - partial application : là kỹ thuật cố định một số tham số của hàm , tạo ra hàm mới với ít tham số hơn , khác với currying mỗi lần 1 tham số
        // thì partial cho phép cố định nhiều tham số cùng lúc 

        // Hàm gốc
        function greet(greeting, punctuation, name) {
            return `${greeting}, ${name}${punctuation}`;
        }

        // Partial application với bind
        // -> gán cố định 2 tham số chào vào dấu vào 1 hàm mới 
        const sayHello = greet.bind(null, 'Hello', '!');
        // gọi hàm mới với 2 tham số được cố định -> lúc này chỉ cần truyền vào tham số tên
        console.log(sayHello('An')); // "Hello, An!"

        // Tự implement partial
        function partial(fn, ...fixedArgs) {
            return function(...remainingArgs) {
                return fn(...fixedArgs, ...remainingArgs);
            };
        }

        const sayHi = partial(greet, 'Hi', '~');
        console.log(sayHi('Bình')); // "Hi, Bình~"

    // 2.2 so sánh currying và partial application 
        //  - currying : + biến đổi cấu trúc hàm + mỗi hàm nhận 1 tham số + trả về hàm cho tới lúc nhận đủ tham số
        //  - partial application : + giữ nguyên cấu trúc chỉ cố định tham số + có thể cố định nhiều tham số cùng lúc + trả về hàm mới với tham số ít hơn 

        // vd : currying 

        const currying = a => b => c => a + b + c;
        const lockOne = currying(10);
        const lockTwo = currying(10)(2);
        console.log(lockOne(2)(3));
        console.log(lockTwo(3));

        // vd : partial application 

        const partialApp = (action , food , emoji) => `${action} on ${food} ${emoji}`;
        const lockAction = partialApp.bind( null,`eat`);
        console.log(lockAction(`candy` , `~.~`));

    // 3 . Function Composition (kết hợp hàm )

    // 3.1. composition là gì ? 
        // composition là kỹ thuật kết hợp nhiều hàm nhỏ thành 1 hàm lớn trong đó kết quả của hàm này là đầu vào cùa hàm tiếp theo 

        // - pipe kĩ thuật kết hợp nhiều hàm nhỏ lại với nhau thực hiện tuần tự từ trái sang phải rồi trả về kết quả cuối cùng khi chạy trong các hàm con
        // - đĩnh nghĩa pipe : 
        const pipe = (...fns) => (initialValue) =>
            fns.reduce((value, fn) => fn(value), initialValue);
            // -> sử dụng kĩ thuật currying áp dụng để định nghĩa pipe :
            // (...fns) hàm con đầu tiên -> tham số là các hàm truyền vào 
            // ...fns sử dụng rest parameter : gom các hàm truyền vào thành 1 mảng chứa các hàm đó 
            // (initialValue) hàm con thứ 2 -> nằm trong hàm con đầu với tham số truyền vào là giá trị ban đầu 
            // có đủ 2 tham số từ 2 hàm bắt đầu tính toán để trả về kết quả 
            // sử dụng phương thức reduce() từ mảng -> khởi tạo 1 giá trị ban đầu tích lũy kết quả qua các hàm có trong mảng 
            // fn là 1 hàm trong mảng fns tính dùng để tính toán kết quả với value truyền vào : là giá trị tích lũy với giá trị ban đầu là initialValue
            // -> sau khi chạy xong trả về value kết quả cuối cùng sau khi chạy qua các hàm con

        const time = x => x * 2;
        const cong = x => x + 2;
        const tru = x => x - 2;
        // const process = pipe(nhan , cong , tru)
        console.log(pipe(time , cong , tru)(5));

        // - lưu ý : + các hàm được truyền vào pipe chỉ nhận 1 tham số -> với trường hợp nhận nhiều tham số phải currying trước 
            // + thứ tự thực hiện từ trái sang phải 

        // - compose kĩ thuật kết hợp nhiều hàm lại với nhau nhưng thực hiện với thứ tự từ phải sang trái 
        // - định nghĩa compose : 
        const compose = (...fns) => (initialValue) =>
            fns.reduceRight((value, fn) => fn(value), initialValue);
            // tương tự với các thao tác sử dụng với pipe : hàm đầu tiên ...fns gom các hàm con truyền vào thành 1 mảng tên là fns
            // hàm thứ 2 trong hàm đầu nhận 1 giá trị truyền vào là giá trị ban đầu
            // khác với pipe dùng phương thức reduceRight() : duyệt mảng fns từ phải sang trái -> tích lũy giá trị sẽ bắt đầu với hàm cuối cùng
            // -> sau khi chạy xong value trả về khi duyệt hết mảng từ cuối lên đầu

        const vietHoa = s => s.toUpperCase();
        const congThem = s => s + `???`;
        const daoNguoc = s => s.split(``).reverse().join(``);

        console.log(compose(daoNguoc , congThem , vietHoa)(`hello`));

        // - lưu ý : + thường được dùng trong toán học và các thư viện hàm như Ramda , Lodash/fp , Redux
            // + thứ tự từ phải sang trái giúp viết biểu thức theo đúng thứ tự tự nhiên của toán học
            // + nếu bạn quen đọc từ trái sang phải hãy dùng pipe , nếu quen với hàm hợp trong toán hãy dùng compose
        
    // 3.2. Các câu lệnh / kỹ thuật đi kèm với compose/pipe

        // 3.2.1 : point-free style ( phong cách không chỉ rõ tham số ) 
            // - khi dùng compose/pipe ta thường viết các hàm nhỏ kết hợp chúng mà không cần viết tham số 1 cách tường minh 
            // viết tường minh :
            const processNumber = x => pipe(add1 , double , quare)(x);
            // chỉ truyền hàm : 
            const processNumberPF = pipe(add1 , double , quare);
            console.log(processNumberPF(1));

        // 3.2.2 : kết hợp với currying 

            const doAn = [`mango` , `banana` , `apple` , `watermelon` , `coconu`];

            const loc = fn => foods => foods.filter(fn);
            const upper = fn => foods => foods.map(fn);
            const getLast = foods => foods[0];

            const char6 = char => char.length === 6;
            const viet = char => char.toUpperCase();

            console.log(pipe(loc(char6), upper(viet) , getLast)(doAn));

        // 3.2.3 : kết hợp với asyns 

        