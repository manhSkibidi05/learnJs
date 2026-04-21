// 1. Toán tử
// - Toán tử số học : các phép tính giữa các biến mang kiểu dữ liệu là số với nhau
let a = 10;
let b = 5;
console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a / b);
console.log(a % b);
// - Toán tử gán : gán giá trị cho 1 biến
let c = 3;
c += 10;
console.log(c);

//  - Toán tử so sánh -> so sánh 2 giá trị với nhau trả về true/false
let e = 10;
let f = "10";
// so sánh giữa == và === trong js
// trả về true -> == so sánh 2 giá trị không quan tâm kiểu dữ liệu
console.log(e == f);
// trả về false -> === so sánh cả về giá trị và kiểu dữ liệu
console.log(e === f);
// -> luôn sử dụng === vì sẽ so sánh 1 cách toàn diện cả về giá trị và kiểu dữ liệu

// - Toán tử logic -> kết hợp các điều kiện với nhau
// && : tất cả điều kiện phải true nếu 1 điều kiện false -> cả biểu thức false
// || : chỉ cần 1 điều kiện đúng
// ! : phủ định

// 2. Câu lệnh điều kiện if...else
let x = 10;
let y = "10";
if (x === y) {
  console.log("juan");
} else {
  console.log("wrong");
}

// 3 . Toán tử 3 ngôi
// - Cú pháp : điều kiện ? giá trị trả về nếu điều kiện true : giá trị trả về nếu điều kiện false
// -> nên sử dụng khi gán giá trị trong 1 biến khi cần kiểm tra điều kiện trước khi gán
let z = x === y ? "juan" : "wrong";
console.log(z);

// vd : kiểm tra có bao nhiêu phần tử trong mảng
let arr = [1, 2, 2, 3];
let arrCheck = arr.length <= 4 ? "= 4 phần tử" : "> 4 phần tử";
console.log(arrCheck);
// vd : tính thêm tiền ship nếu số tiền đơn hàng > 5 lốp
let donHang = 600;
let phiShip = donHang >= 500 ? donHang / 10 : 0;
let tongTien = donHang + phiShip;
console.log("Số tiền phải trả : " + tongTien);

// 4. Giá trị Truthy và Falsy
// Giá trị Falsy là các giá trị kiểm tra sẽ trả về false
// số 0
let so = 0;
// chuỗi rỗng
let chuoi = "";
// giá trị null -> không được tham chiếu đến đâu
let so2 = null;
// giá trị của 1 biến khởi tạo chưa được gán giá trị -> chưa được định nghĩa
let so3 = undefined;
let so4 = NaN;

// Giá trị Truthy là các giá trị khi được kiểm tra sẽ trả về true
// -> ngoài các giá trị falsy trên tất cả giá trị còn lại trả về true
// - true , Số khác 0 , chuỗi không rỗng , 1 mảng , 1 object
// -> lúc này mảng và đối tượng không chứa giá trị bên trong nhưng vẫn trả về true và cá đối tượng này đang tồn tại
let mang = [];
let doiTuong = {};

//  vd : giá trị null
// biến user khai báo mang giá trị null
let user = null;
// 1 hàm login -> khi gọi hàm này biến user được gán bằng 1 đối tượng
function login() {
  user = {
    name: "moy",
    age: 18,
  };
}
// 1 hàm logout -> khi gọi hàm này biến user gán = null
function logout() {
  user = null;
}
// 1 hàm lấy thông tin của user -> khi chưa đăng nhập giá trị = null -> trả về chưa đăng nhập
// khi đăng nhập ròio -> trả về tên người dùng
function getInfo() {
  if (user === null) {
    return "chưa đăng nhập";
  } else {
    return user.name;
  }
}
login();
console.log(getInfo());
logout();
console.log(getInfo());
// giá trị null -> ý nghĩa là không có gì (cố ý)
// - do lập trình viên chủ động gán giá trị null cho 1 biến
// - sử dụng để gán cho 1 biến khi muốn reset hay xóa giá trị của biến đó
// -> biến mang giá trị null vẫn tồn tại trong vùng nhớ , vẫn truy cập được giá trị của biến đó và chiếm bộ nhớ
