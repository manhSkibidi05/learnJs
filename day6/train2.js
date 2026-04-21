// Bài 2.1 : callback bất đồng bộ với setTimeout

console.log(`___________BÀI 2.1___________`);
function delayLog(message , delay , callback){
    setTimeout(
    ()=>{ 
        console.log(message);
        callback(message);
    }, delay);
    
}
delayLog(`hi em anh đứng ở đây từ chiều` , 0, message => console.log(`lần 2 : ${message}`));

// Bài 2.2 : error-first callback pattern 

console.log(`___________BÀI 2.2___________`);
function divide(a , b , callback){
    if(callback(b)){
        console.log(`lỗi b = 0`);
        return;
    }
    console.log(a/b);
}
divide(5,0,num => num === 0 ? true : false);

// Bài 2.3 : Fetch dữ liệu với callback

console.log(`___________BÀI 2.3___________`);
const users = [
    { id: 1, name: "An", age: 25 },
    { id: 2, name: "Bình", age: 30 },
    { id: 3, name: "Châu", age: 22 }
];

function fetchUser(id ){
    console.log(`lấy dữ liệu`);
    setTimeout( () => {
        let user = users.find((value)=> value.id === id );
        if(!user){
            console.log(`id không hợp lệ`);
            return null;
        }
        console.log(user)
    } , 1000);
    console.log(`chuẩn bị dữ liệu`);
}
fetchUser(2);

// Bài 2.4 :  Xử lý nhiều tác vụ tuần tự

console.log(`___________BÀI 2.4___________`);


