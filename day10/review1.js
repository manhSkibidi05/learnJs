// Ôn tập 1 : Destructuring , Spread operator và rest parameter

// - Destructuring : Là kĩ thuật sử dụng để gán giá trị cho các biến riêng lẻ với giá trị là từ 1 arr/obj 
// -> cú pháp : [tên biến 1 , tên biến 2] = arr -> 2 biến nhận 2 giá trị đầu tiên của mảng 

    // - Sử dụng Destructuring trong các trường hợp : 
    // + gán nhanh nhiều giá trị của 1 obj/arr cho nhiều biến độc lập 
    // + dùng để đổi giá trị của 2 biến : [a , b] = [b , a];
    // + kết hợp với rest parameter để lấy tất cả giá trị của 1 arr/obj
    // [biến 1 , biến 2 , ...conLai] = arr -> 2 biến đầu nhận 2 giá trị đầu mảng còn lại chứa các phần tử còn lại của mảng 

// - Spread operator : Là toán tử dùng để phân rã các phần tử nằm trong 1 iterator (arr , string , obj ...) thành các phần tử đơn lẻ 
// -> cú pháp sử dụng kí tự ... đặt trước 1 iterator nằm bên phải dấu = : let arrClone = [...arr] -> copy mảng tất cả phần tử từ mảng arr sang arrClone

    // - Sử dụng Spread operator trong các trường hợp : 
    // + dùng để shallow copy 1 mảng/obj -> sao chép nông arr/obj mang các giá trị nguyên thủy khi thay đổi giá trị không ảnh hưởng tới arr/obj ban đầu
    // + sử dụng với phương thức tĩnh cần nhiều giá trị mà không truyền vào 1 arr/obj 
    let arr = [5,6,2,1,2,7];
    let maxV = Math.max(...arr);
    console.log(maxV);

    // + dùng để ghép các mảng với nhau thành 1 mảng lớn  
    let nums = [1,2,3];
    let foods = [`banana` , `watermelon`];
    let numFood = [...nums , ...foods];
    console.log(numFood);

    // + dùng để tổng hợp lại các thuộc tính của các đối tượng -> với các thuộc tính trùng nhau thì đối tượng thêm vào sau đè lên đối tượng thêm trước 
    let man = {name : `batman` , sex : `girl`};
    let homelander = {name : `god` , age : 28};
    let homelanderMan = {...man , ...homelander};
    console.log(homelanderMan);

// - Rest parameter : Là kĩ thuật dùng để gom lại các đối số còn lại được thêm vào thành 1 mảng 
// -> cú pháp sử dụng kí tự ... đặt trước tên mảng bên trái dấu = : let [a , b , ...chars] = strings -> a , b mang 2 kí tự đầu mảng strings , mảng chars mang các kí tự còn lại

    // - Sử dụng Rest parameter trong các trường hợp : 
    // + gom lại các đối số truyền vào 1 hàm thành 1 mảng -> khi không biết trước hàm nhận bao nhiêu đối số 
    function tong(...nums){
        return nums.filter(value => value % 2 === 0);
    }

    // + sử dụng gom các phần tử còn lại từ 1 mảng cùng với Destructuring 
    // -> Lưu ý : sử dụng Rest parameter luôn đặt ở cuối 