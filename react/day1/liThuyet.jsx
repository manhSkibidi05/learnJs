// Tuần 1 - Ngày 1 : Giới thiệu về React , JSX , Components 

// - Mục tiêu chi tiết : 
    // 1. Hiểu React dùng để làm gì , so sánh với html/css/js
    // 2. Cài đặt thành công môi trường node.js + vite và chạy ứng dụng react đầu tiên -> cài đặt dev server cho phép biến file .jsx dạng .js để trang web có thể đọc
    // 3. Nắm được cấu trúc thư mục của một dựa án Reat cơ bản 
    // 4. Biết JSX là gì , cách viết , và các quy tắc quan trọng 
    // 5. Tạo được function component và truyền dữ liệu vào component qua props 
    // 6. Sử dụng component nhiều lần với dữ liệu khác nhau 

// 1 . React là gì ? 
    // - Hãy tưởng tượng bạn xây ngôi nhà bằng gạch thủ công (html/css/js thuần) . Mỗi lần muốn thay đổi 1 căn phòng bạn phải xuống tay trát lại tường , đục đẽo .
    // Với react , bạn xây nhà bằng các khối lego (component) . Mỗi khối có thể tái sử dụng , ghép nối  , và khi bạn muốn thay đổi dữ liệu . React sẽ tự cập nhật
    // khối cần thay thế mà không ảnh hưởng đến toàn bộ . 
    
    // - Về mặt kĩ thuật : 
        // + html tĩnh -> khó cập nhật động 
        // + Js thuần (DOM manipulation) -> viết code dài dòng khó bảo trì với dự án lớn 
        // + React : Khai báo UI dựa trên state (state -> view) . Bạn chỉ cần mô tả giao diện ứng dụng với từng trạng thái dữ liệu , React lo việc cập nhật DOM hiệu quả
        // -> React dựa trên dữ liệu được cung cấp trên state mà sẽ hiện thị giao diện phù hợp với state đó và khi state thay đổi giao diện thay đổi động theo 

// 2. Cài môi trường 
    import React from 'react'
    import ReactDOM from 'react-dom/client'
    import App from './App.jsx'
    import './index.css'

    ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    );

// 3. JSX - cú pháp đặc biệt của react 
    // - JSX giống như việc viết html trong Js . Nhưng có một số điểm khác biệt quan trọng 

    // 3.1. Quy tắc cơ bản 
    // 1. Một thẻ duy nhất bao bọc : component trả về chỉ có một phần tử cha . Nếu muốn trả về nhiều phần tử mà không cần div phụ thì sử dụng fragment <>...</> hoặc <React.Fragment>

    // vd : trong 1 component 
    // sai
    // return (
    //     // <h1>Hello</h1>
    //     // <p>World</p>
    // )

    // đúng 
    return (
        <>
            <h1>Hello</h1>
            <p>World</p>
        </>
    )
    // -> vì 1 component chỉ trả về 1 phần tử cha duy nhất nên với trường hợp nhiều phần tử cần trả về nên bọc lại trong khối fragment <>...</> 

    // 2. Có thể nhúng biểu thức qua dấu {} : có thể gọi biến , gọi hàm ,định nghĩa biểu thức 
    const name = 'long';
    const getName = <h1>Xin chào {name} </h1>;
    const cal =  <p>Đáp án : {1+1}</p>;

    // 3. Các thuộc tính của thẻ html : Sử dụng camelCase thay vì dash-case -> Đặc biệt : 
        // + class -> className 
        // + for (label) -> htmlFor 
        // + tabindex -> tabIndex

    // 4. Style inline : Nhận obj , key là tên của style đó nhưng sử dụng camelCase thay vì dash-case , value là chuỗi giá trị style đó sẽ mang 

    <div style={{textAlign : 'center' , display:'flex' , justifyContent:'center'}}></div>;

    // 5. Tự đóng thẻ : Những thẻ không mang nội dung(img , br , input) cần đóng thẻ bằng dấu / ở cuối thẻ trước dấu >

    <img src="..." alt="" />;
    <br />;

    // 3.2. JSX là 'đường bột' thực chất là gì ? 
    // - JSX được babel (công cụ biên dịch) chuyển thành React.createElement 

    // JSX
    const element = <h1 className="greeting">Hello</h1>;
    // Biên dịch thành
    const element = React.createElement('h1', { className: 'greeting' }, 'Hello');

// 4. Component và Props 
    // 4.1. Tạo component (function component)
    // - Component là 1 hàm (hoặc class) trả về JSX 
    // - Tên component bắt đầu bằng chữ in hoa (quy ước bắt buộc)

    // vd : tạo component trong 1 file khác
    function Welcome({name}){
        return <h2>Chào , {name}</h2>;
    }
    export default Welcome;

    // 4.2. Props - truyền dữ liệu từ cha xuống con 
    // - Props giống như tham số của hàm 
    // - Có thể truyền bất kỳ giá trị nào : String , number , boolean , array , object , function 

    // vd : sử dụng component Welcome đã tạo ở 1 file khác
    import Welcome from './file';

    function App(){
        return(
            <div>
                <Welcome name = 'An' />
                <Welcome name = 'Long' />
            </div>
        );
    }
    // -> Cách sử dụng component (1 hàm trả về JSX) : sử dụng như 1 thẻ tự đóng với tên component là tên thẻ và tham số là thuộc tính của thẻ đó 
    // -> Giá trị truyền vào cho thuộc tính này có thể bất kì kiểu giá trị nào , với giá trị này thì bên trong hàm định nghĩa tham số sẽ mang giá trị đó 

    // 4.3. Children prop 
    // - Khi component được mở đóng thẻ , nội dung bên trong sẽ được truyền qua props.children 

    function Card({children}){
        return <div className='card'>{children}</div>
    }

    // sử dụng 
    <Card>
        <h3>Tiêu đề</h3>
        <p>Nội dung</p>
    </Card>
    // -> Cách sử dụng component (1 hàm trả về JSX) : sử dụng như 1 thẻ có bao gồm đóng và mở thì lúc này phần nội dung bên trong thẻ với tên component đó 
    // sẽ được truyền vào làm tham số của hàm đó và hiện thị dựa trên định nghĩa hàm 

// 5. Thực hành chi tiết 

// 36. LƯU Ý 

    // 1. return của 1 component trong trường hợp có nhiều giá trị cần xuống dòng phải dùng dấu ()
    // -> return khi không dùng dấu () chỉ trong trường hợp giá trị nằm trên 1 dòng 

    // 2. thuộc tính của 1 thẻ trong .jsx tên bắt buộc theo quy tắc camelCase (className , tabIndex...)
    // - các giá trị của thuộc tính có thể là String , boolean , number , arr , obj , func 
    // -> với giá trị String có thể viết trực tiếp thông qua các dấu '' "" `` , còn tất cả các giá trị còn lại phải đặt trong dấu {} để báo hiệu cho JSX nhúng biểu thức JS

    // 3. với hàm được định nghĩa trong component tham số truyền vào là 1 đối tượng props 
    // -> khi truyền vào các tham số nằm trong {name , age} thì lúc này đang desturing các thuộc tính của obj props ra sử dụng
    // -> với việc gọi component gồm thẻ đóng mở các phần tử con bên trong lúc này là thuộc tính children của obj props 
    // -> có thể gọi thẻ đóng mở mà không cần định nghĩa các phần tử bên trong lúc này children không mang giá trị và không được render

    // 4. với các sự kiện được gán trực tiếp vào thẻ thì các giá trị nằm trong dấu ngoặc {}
    // -> lúc định nghĩa 1 component cần gán địa chỉ của hàm sẽ chạy sau khi diễn ra sự kiện onClick = {funcActive}
    // -> khi gọi 1 component cần truyền vào hàm sẽ xảy ra onClick = {() => console.log(a)}
    






