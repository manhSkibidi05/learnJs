// Bài tập luyện tập về Destructuring , spread , rest 

// Cấp độ 1 : Cơ bản 

    // Bài 1 : Destructuring mảng cơ bản 
    const colors = [`red` , `green` , `blue` , `yellow`];
    const [first , second , ...remaining] = colors;
    console.log(first , second , remaining);

    // Bài 2 : Destructuring obj cơ bản 
    const user = {name : `alice` , age : 18 , city : `Hà Nội` , job : `dev`};
    const {name , age , city : hometown} = user;
    console.log(name , age , hometown);

    // Bài 3 : Spread với mảng 
    const arr1 = [1,2,3];
    const arr2 = [4,5,6];
    const merged = [...arr1 , ...arr2];
    console.log(merged);

    // Bài 4 : rest parameter trong hàm 
    function sumAll(...nums){
        return nums.reduce((sumVal , num) => sumVal+=num , 0);
    }
    console.log(sumAll(1,2,3,4));

    // Bài 5 : Spread trong obj 
    const defaultConfig = {theme : `light` , showSidebar : true , fontSize : 14};
    const userConfig = {theme : `dark` , fontSize : 16};
    const finalConfig = {...defaultConfig , ...userConfig};
    console.log(finalConfig);

// Cấp độ 2 : Kết hợp và xử lí dữ liệu 

    // Bài 6 : Destructuring functions params 
    function printUserInfo({name , age , email = `N/A`}){
        console.log(name , age , email )
    }
    const user1 = {name : `bob` , age : 30};
    const user2 = {name : `carol` , age : 28 , email : `concak@gmail.com`};
    printUserInfo(user1);
    printUserInfo(user2);

    // Bài 7 : Hoán đổi biến không dùng biến tạm 
    let a = 5;
    let b = 10;
    [a , b] = [b , a];
    console.log(a , b);

    // Bài 8 : Lọc và copy mảng với spread 
    const numbers = [1,2,3,4,5,6,7,8,9];
    const oddNums = [...numbers].filter(num => num % 2 !== 0);
    console.log(oddNums);

    // Bài 9 : Rest trong destructuring mảng kết hợp obj
    const students = [
        { id: 1, name: 'An', scores: [8, 9, 7] },
        { id: 2, name: 'Binh', scores: [6, 7, 8] },
        { id: 3, name: 'Chau', scores: [9, 9, 10] }
    ];
    for(let student of students){
        let {name , scores} = student;
        let avg = scores.reduce((sumVal , score) => sumVal+=score , 0) /  scores.length;
        console.log(name , avg);
    }

    // Bài 10 : Spread với mảng và obj lồng nhau 
    const original = {a : 1 , b : {c : 2 , d : 3} };
    const copy = {...original};
    copy[`b`][`c`] = 99;
    console.log(original)
    // -> giá trị khi thay đổi ở obj copy có ảnh hưởng tới obj original vì sử dụng spread chỉ đang sao chép địa chỉ của obj con bên trong obj original
    // Vậy nên khi thay đổi giá trị tại địa chỉ của obj con của obj copy ảnh hưởng tới obj original 