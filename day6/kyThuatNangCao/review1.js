// currying : là một kĩ thuật chia nhỏ hàm với nhiều tham số đầu vào , lúc này mỗi hàm chỉ được nhận 1 tham số trả về hàm mới cho tới khi hết tham số 
    // + biến 1 hàm lớn thành các hàm nhỏ hơn 
    // + tái sử dụng hàm -> khi muốn cố định 1 tham số và thay đổi các tham số còn lại 

    const sum = a => b => c=> a + b + c;
    const sum5 = sum(5);
    console.log(sum5(3)(2));

// partial application : là kĩ thuật cố định nhiều tham số cùng 1 lúc trả về hàm với ít tham số hơn 

    const string = (action , food , emoji) => `${action} on ${food} ${emoji}`;
    const eat = string.bind(null , `eatting`);
    console.log(eat(`potato fried` , `??`));

// function composition (kết hợp hàm) : kĩ thuật cho phép kết hợp các hàm nhỏ lại với nhau thành 1 hàm lớn trả về kết quả khi dữ liệu xử lí qua tất cả các hàm

    // - pipe : kết hợp các hàm theo chiều từ trái sang phải 
        // + tham số đầu tiên của hàm là các hàm -> các hàm khi truyền vào pipe chỉ nhận 1 tham số
        // + tham số thứ 2 là 1 giá trị bất kì -> giá trị này sẽ được tích lũy qua các hàm : với hàm đầu sẽ hàm bố sau khi nhận dữ liệu và xử lí trả về cho hàm con kế tiếp  
        // + giá trị sau khi chạy qua các hàm từ trái sang phải trả về kết quả cuối cùng 
    // - hàm tổng quát :
        
        const pipe = (...fns) => (initialValue) => fns.reduce((currentValue , currentFn ) => currentFn(currentValue),initialValue); 
        
        const arr = [1,2,3,4,5,6,7,8];
        const filterLe = numbers => numbers.filter(value => value % 2 !== 0);
        const nhan3 = numbers =>  numbers.map(value => value * 3);
        const getFisrt = numbers => numbers[numbers.length - 1];

        const result = pipe(filterLe , nhan3 , getFisrt);
        console.log(result(arr));
        
    // - compose : kết hợp các hàm theo chiều từ phải sang trái 

        const compose = (...fns) => (initialValue) => fns.reduceRight((currentValue , currentFn) => currentFn(currentValue) , initialValue);

        const stringWrong = `    luon giu binh TINH   `;
        const lower = string => string.toLowerCase();
        const trimString = string => string.trim();
        const slugify = string => string.replaceAll(` `,`-`);

        console.log(compose(slugify , trimString , lower)(stringWrong));


