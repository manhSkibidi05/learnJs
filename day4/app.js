// Mảng là cấu trúc dữ liệu lưu trữ các dữ liệu liên tiếp nhau 
// + truy cập các dữ liệu được lưu trong mảng thông qua chỉ số index
// + mảng giúp lưu trữ dữ liệu liên quan cùng 1 chỗ -> so = [1,2,3] mảng số
// chuoi = ["a" , "b" , "c"] mảng chuỗi , arr = ["a" , 1 , true] mảng hỗn hợp
// + kiểm soát số lượng lưu trữ trong mảng -> thuộc tính lenghth : trả về kích thước của mảng
// + duyệt qua từng giá trị bằng vòng lặp -> dùng khi muốn tìm 1 giá trị hay xóa 1 giá trị
// + có nhiều phương thức đã được định nghĩa trước để thực hiện các thao tác như : thêm , sửa , xóa , xắp xếp trên mảng

// lưu ý :
// + mảng là object đặc biệt mang các thuộc tính và phương thức riêng 
// khi dùng phương thức type of -> mảng trả về object 
// muốn kiểm tra 1 mảng là 1 mảng tránh nhầm lẫn với đối tượng sử dụng phương thức Array.isArray(mảng 1) -> trả về true vì là 1 mảng
// Array.isArray(đối tượng 1) -> trả về false vì là 1 đối tượng
// + mảng khi được khởi tạo lúc này nó sẽ lưu địa chỉ đến vùng nhớ của mảng đó
// khi gán 1 mảng mới = mảng trên -> mảng mới sẽ tham chiếu đến vùng nhớ của mảng trên khi thay đổi dữ liệu thì sẽ thay đổi chung 2 mảng này
// vậy khi muốn sao chép toàn bộ 1 mảng sang mảng mới mà khi thay đổi dữ liệu không ảnh hưởng tới nhau sử dụng arr2 = [...arr1]
// arr2 = [...arr1] -> lúc này arr2 sao chép toàn bộ dữ liệu mảng arr1 sang địa chỉ mới -> lúc này thay đổi với các dữ liệu primitive (nguyên thủy) sẽ không làm ảnh
// hưởng tới mảng arr1 -> nhưng với các dữ liệu arr/obj trong mảng lúc này chỉ sao chép địa chỉ trỏ tới mảng và đối tượng nằm trong arr1 -> khi thay đối các dữ liệu
// kiểu arr/obj nằm trong mảng arr2 vẫn ảnh hưởng tới arr1 

// bài 1 : thao tác cơ bản với mảng
let friend = ["nam","nhàn","linh","moy","huy"];

console.log(`bạn đầu tiên trong mảng là : ${friend[0]}`);
console.log(`bạn cuối cùng trong mảng là : ${friend[friend.length - 1]}`);

friend.push("anh");
console.log(`bạn vừa mới thêm vào cuối là : ${friend[friend.length - 1]}`);

friend.unshift("ấn độ");
console.log(`bạn vừa mới thêm vào đầu là : ${friend[0]}`);

let loseLast = friend.pop();
console.log(loseLast);
let loseFirst = friend.shift();
console.log(loseFirst);

console.log(`kích thước của mảng là : ${friend.length}`);

// bài 2 : sao chép mảng với spread operator [...] 
console.log("_____BÀI 2_____")
// mảng đồ ăn có các giá trị hỗn hợp bao gồm cả chuỗi , số , obj
let food = ["bún bò huế","phở bò",8,{a: "bánh xèo"}];
// sao chép mảng đồ ăn sang 1 mảng mới
let foodClone = [...food];

console.log(`kích thước của mảng thật ${food.length}`);
console.log(`kích thước của mảng clone ${foodClone.length}`);

// thay đổi các giá trị nguyên thủy
foodClone[0] = "bunbohue";
foodClone[2] = 7;
// không ảnh hưởng tới mảng còn lại
console.log(`giá trị đầu mảng thật ${food[0]}`);
console.log(`giá trị đầu mảng clone ${foodClone[0]}`);

// thay đổi giá trị của obj
foodClone[3].a = "con cak";
// vẫn ảnh hưởng tới mảng còn lại
console.log(`giá trị đối tượng trong mảng thật ${food[3].a}`);
console.log(`giá trị đối tượng trong mảng clone ${foodClone[3].a}`);

// iterable là : các object có phương thức Symbol.iterator -> cho phép duyệt qua từng phần tử một  

// với iterable thì có thể sử dụng các thao tác chỉ dành riêng cho một iterable
// + for...of -> dùng để duyệt toàn bộ các phần tử của iterable
let chu = "duma";
for(let kitu of chu){
    console.log(kitu);
} 
// + spread operator : trải các phần tử thuộc iterable (array , string , map , set) -> lúc này các phần tử đứng riêng lẻ 
let so = [1,2,3];
console.log(...so);
console.log(so.length);

// Bài 3 : chuyển 1 chuỗi thành 1 mảng , sau đó tạo mảng mới mang toàn bộ dữ của mảng cũ đảo ngược nó rồi chuyển lại thành chuỗi . In dữ liệu của 2 mảng riêng biệt 
let chao = "hello world";
// khởi tạo mảng chu bằng phương thức split("") chia các phần tử trong chuỗi thành từng phần tử rồi chuyển vào mảng
let arrChu = chao.split("");

// sao chép mảng chu sử dụng spread operator : nó sẽ phân giải các giá trị trong mảng thành các phần tử độc lập -> thêm các phần tử đó vào mảng
let arrChuReverse = [...arrChu];
// đảo ngược mảng -> không ảnh hưởng tới mảng cũ
arrChuReverse.reverse();
// chuyển các phần tử trong mảng thành chuỗi bằng phương thức join("")
let chaoReverse = arrChuReverse.join("");

console.log("____Mảng đầu____")
// sử dụng for of duyệt từng phần tử trong mảng
for(let cu of arrChu){
    // in ra giá trị của nó
    console.log(cu);
}
console.log(`chuỗi đầu : ${chao}`);
console.log("____Mảng sau____")
for(let cu of arrChuReverse){
    console.log(cu);
}
console.log(`chuỗi sau : ${chaoReverse}`);

// sử dùng vòng lặp forEach với mảng
let mangLego = ["naruto" , 7 , "son wukong" ,[2,3] ,{a : "bát giới"}];
mangLego.forEach((value)=>{
    console.log(value);
})
// sử dụng spread operator sao chép mảng
let mangLegoClone = [...mangLego];
mangLegoClone.forEach((value)=>{
    console.log(`clone : ${value}`);
})