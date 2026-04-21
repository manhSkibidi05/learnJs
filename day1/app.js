// JavasScript là ngôn ngữ lập trình dành cho trang web -> giúp người dùng có thể tương tác với website

// 1 . Biến (Variables)
// K/n : Biến là 1 vùng nhớ được đặt tên để lưu trữ dữ liệu , để sử dụng dữ liệu được lưu đó ta sử dụng tên biến 
// - Biến được lưu trữ ở bộ nhớ RAM trên máy tính -> khi khai báo 1 biến sẽ được máy tính cấp phát 1 vùng nhớ tạm thời trên RAM 
// và khi đóng trình duyệt sẽ giải phóng bộ nhớ

// - Có 3 cách khai báo 1 biến trong JS : let , const , var
// + let : phạm vi sử dụng trong dấu ngoặc {}
let name = "moi";
console.log(name);
name = "moi2";
console.log(name);
// có thể thay đổi giá trị của 1 biến     

// + const : phạm vi sử dụng trong dấu ngoặc {}
const age = 18;
console.log(age);
// age = 19;
console.log(age);
// không thể thay đổi giá trị của 1 biến khi khai báo bằng const -> được coi như 1 hằng số không thể thay đổi

// -> sử dụng const là chủ yếu với những biến giá trị cố định không cần thay đổi
// -> sử dụng let với những biến thay đổi giá trị được trong tương lai vd : bộ đếm vòng lặp , giá trị đếm số thay đổi

// 2. Kiểu dữ liệu (data types)
// K/n : Kiểu dữ liệu các kiểu giá trị mà biến có thể lưu trữ 
// - Trình duyệt nhận biết 1 biến thuộc kiểu dữ liệu nào dựa trên cú pháp ta khai báo giá trị cho biến đó
// + kiểu number : số nguyên và số thực
const a = 10;
const b = 3.14;
// + kiểu string : văn bản
const c = "văn bản";
// + kiểu boolean : true hoặc false
const d = true;
const e = false;
// + kiểu undefined : biến được khai báo nhưng chưa có gán giá trị
let f;
// + kiểu null
// - Xác định kiểu dữ liệu 1 biến thông qua toán tử typeof
console.log(typeof a);
console.log(typeof c);
console.log(typeof d);
console.log(typeof f);
 

