// Ôn tập mục 1 : Destructuring , Spread và Rest trong JavaScript

    // - 3 Khái niệm này destructuring , spread(...) và rest(...) là những tính năng mạnh mẽ từ ES6+ giúp code ngắn gọn , dễ đọc và biểu cảm
    // hơn , dù có cùng ký hiệu ... , nhưng chúng được sử dụng trong các ngữ cảnh khác nhau.

    // 1. Destructuring (Phân rã cấu trúc)
    // - Destructuring cho phép giải nén các giá trị từ arr/obj vào các biến riêng biệt 1 cách ngắn gọn 

    // 1.1. Destructuring với mảng 

        // - cách cũ :
        let arr = [1,2,3];
        let one = arr[0];
        let two = arr[1];
        let three = arr[2];

        // - sử dụng destructuring : 
        let [a , b , c] = [1 , 2, 3];
        console.log(a , b , c)

    // - Đặc điểm khi sử dụng với mảng : 
        // + có thể bỏ qua phần tử :
        let [e , , f] = [5,9,9];
        console.log(e , f);

        // + gán giá trị mặc định : 
        let [g = 5 , h = 34] = [36];
        console.log(g , h);

        // + hoán đổi giá trị : 
        let i = 10 ;
        let k = 1;
        [i , k] = [k , i];
        console.log(i , k);

    // 1.2. Destructuring với object 

        let user = {name : `Moy` , age : 18 , act : `fak u`};
        
        // gán biến trùng tên với thuộc tính 
        const {name , age} = user;
        console.log(name , age);

        // Đổi tên biến 
        const {name : fullName , age : fullAge} = user;
        console.log(fullName , fullAge);

        // tạo ra giá trị mặc định
        const { home = 'vp' } = user;
        console.log(home , user);

    // - Ứng dụng thực tế : 
        // + Sử dụng tham số cho 1 hàm : function({name , age}){ console.log(name ,age)}
        // + import module : import {useState , useEffect} from `react` ;
        // + đổi giá trị 2 biến : [a , b] = [b , a]

    // 2.Spread operator (...)
    // - Spread dùng để trải rộng các phần tử của 1 iterable (mảng , chuỗi , object ...) thành các phần tử riêng lẻ 

    // 2.1. Spread với mảng 

    // copy mảng -> sao chép nông mảng 
    const original = [1,2,3];
    const copy = [...original];
    copy.push(5);
    console.log(original) // -> thay đổi mảng copy không làm ảnh hưởng tới mảng gốc 

    // nối mảng 
    const arr1 = [1,2,3];
    const arr2 = [7,8,9];
    const merged = [...arr1 , ...arr2];
    console.log(merged);

    // 2.2. Spread với object (ES2018)

    // copy obj -> sao chép nông các thuộc tính của đối tượng 
    const objBase = {first : `num1` , second : `num2`};
    const objCop = {...objBase};
    objCop[`first`] = `num36`;
    console.log(objBase) // khi that đổi thuộc tính bên trong đối tượng copy không ảnh hưởng tới đối tượng ban đầu 
        // -> chỉ áp dụng với các thuộc tính mang giá trị nguyên thủy , với các thuộc tính là obj/arr chỉ sao chép địa chỉ obj/arr
    
    // gộp obj -> các thuộc tính trùng nhau obj sau sẽ đè lên obj trước 
    const objChange = {first : `num10` , thrid : `num3`};
    const objMerge = {...objBase , ...objChange};
    console.log(objMerge);

    // 2.3. Spread với chuỗi 
    const greet = `nice to see`;
    const greets = [...greet];
    console.log(greets); // chuyển nhanh 1 chuỗi kí tự thành 1 mảng các kí tự đó 

    // 2.4. Spread trong function call 
    const nums = [2,3,4,678,7];
    const max = Math.max(...nums);// phân rã 1 mảng thành các giá trị riêng biệt rồi đặt trong hàm 
    console.log(max);

    // 3. Rest Parameter (...)
    // - Rest được dùng trong khai báo hàm để thu thập các đối số còn lại thành 1 mảng . Sử dụng kí tự ... giống với Spread nhưng khác ở chỗ 
    // ngữ cảnh sử dụng rest khác với spread

    // 3.1. Rest trong tham số hàm

    function sum(...nums){
        return nums.reduce((sumVal , num) => sumVal+=num ,0);
    }
    console.log(sum(1,2,3,4,4,5)); // chuyển tất cả tham số truyền vào 1 mảng sum -> tính toán trả về kết quả 

    function helloNames(greet , ...names){
        console.log(greet + " " + names.join(` `));
    }
    helloNames(`hello`,`nam`,`mai`,`đào`,`long`) // tham số đầu tiên truyền vào hello , các tham số còn lại được truyền vào mảng names 
    // -> rest parameter luôn phải là tham số cuối cùng của 1 hàm 

    // 3.2. Rest trong destructuring mảng 

    const [so1 , so2 , ...soConLai] = [5,6,9,9,9,9];
    console.log(so1 , soConLai)// 2 số 1 2 nhận 2 số đầu của mảng , các số còn lại của mảng được gán vào mảng số còn lại 

    // 4. So sáng Spread và Rest 
    // - Spread được sử dụng trong mảng , obj luôn nằm bên phải dấu bằng -> tác dụng phân rã từng phần tử riêng lẻ 1 
    // - Rest được sử dụng với tham số của 1 hàm ,arr , obj nằm bên trái dấu bằng -> tác dụng gom các phần tủ còn lại thành 1 mảng 

    // 5. Lưu ý 
        // - Spread không được sử dụng để sao chép sâu -> với các obj/arr con thì sẽ gây ảnh hưởng tới obj/arr cũ
        // - Rest phải là tham số cuối cùng trong hàm hay bất kì đâu -> nếu rest không nằm ở cuối sẽ lỗi 
        // - Destructuring mặc định vởi undefined 
