// Ngày 3 : Rendering danh sách , Conditional rendering , CSS modules 

    // Chào bạn tới ngày 3 ! hôm nay chúng ta học cách hiện thị danh sách (dùng map) , điều kiện để render (if , ternary...) và cách quản lý css trong react
    // -> Đây là những kỹ thuật thường dùng khi xây dựng giao diện động 

    // - Mục tiêu 
        // + Biết cách render danh sách từ mảng với .map()
        // + Hiểu thuộc tính key -> tại sao cần và cách chọn key 
        // + Sử dụng conditional rendering : if , ternary operator , logical && 
        // + Làm quen với CSS modules (hoặc styled-components) để style component an toàn , tránh xung đột 

    // 1. Rendering danh sách
    // 1.1. Dùng map() để chuyển mảng thành JSX 
        // - Trong React bạn không thể viết vòng lặp trực tiếp trong JSX . Thay vào đó dùng map() trên mảng trả về dữ liệu , trả về mảng các phần tử JSX
        // -> khi ở vùng JSX không thể sử dụng vòng lặp của js chỉ sử dụng các biểu thức trả về 1 giá trị và biểu thức đó phải được đặt ở trong dấu {}
        // -> map() giúp tạo ra 1 mảng mới dựa trên phần tử trong mảng nên sử dụng map() giúp tạo ra mảng các phần tử JSX sau đó các phần tử trong mảng sẽ được in ra khi biên dịch

        // vd : 
        const names = ['linh','thảo','nhàn'];

        <ul>
            {
                names.map((name , index) => <li key={index}>{name}</li> )
            }
        </ul>

    // 1.2. Thuộc tính key - vô cùng quan trọng 
        // - React sử dụng key để xác định từng phần tử trong danh sách , giúp tối ưu hiệu năng khi thêm , xóa , sắp xếp . Key phải là duy nhất trong mảng 
        // - Quy tắc : 
            // + Nên dùng id (từ dữ liệu) làm key
            // + Chỉ dùng index khi danh sách tĩnh không thay đổi thứ tự hoặc không có id
            // + Không dùng index nếu danh sách có thể bị sắp xếp lại hoặc thêm/xóa ở đầu/cuối
        
    // 1.3. Fragment để tránh thẻ wrapper 
        // - Nếu component cha không muốn thêm thẻ div thừa , dùng fragment <></> hoặc <React.Fragment> 

    // 2. Conditional rendering (render có điều kiện)
        // - Hiện thị các phần tử JSX dựa trên giá trị của state hoặc props trả về 

    // 2.1. Dùng if...else ngoài vùng JSX 

        function Greeting({isLogged}){
            if(isLogged){
                return <h1>Chào mừng trở lại !</h1>;
            }else{
                return <h1>Vung lòng đăng nhập </h1>;
            }
        }
    // -> áp dụng khi điều kiện phức tạp với nhiều nhánh điều kiện

    // 2.2. Ternary operator ? : 
    // -> sử dụng bên trong vùng JSX phải đặt trong dấu {} vì đây là toán tử của js 
    
        function Status({isOnline}){
            return(
                <div>
                    {
                        isOnline ? (
                            <>
                                <span>Bạn</span>
                                <h1>Đang hoạt động</h1>
                            </>
                        ) : (
                            <>
                                <span>Bạn</span>
                                <h1>Đang không hoạt động</h1>
                            </>
                        )
                    }
                </div>
            );
        }
    // -> áp dụng với điều kiện đơn giản và không có nhiều nhánh điều kiện 

    // 2.3. Logical && (short-circuit)
    // -> sử dụng bên trong vùng JSX phải đặt trong dấu {}

        function Notification({message}){
            return(
                <div>
                    {message && <p>{message}</p>}
                </div>
            )
        }
    // a && b : nếu cả a và b truly thì in ra b -> in phần tử khi cả 2 phần tử true
    // a || b : a truly in a , a falsy in b -> in ra phần tử mặc định nếu phần tử a falsy

    // 2.4. Gán kết quả cho conditional cho biến 
    // -> sử dụng ngoài vùng JSX dựa trên điều kiện từ props hoặc state gán phần tử JSX cho kết quả 

        function ButtonPayment({isLoading}){
            let button = null;
            if(isLoading){
                button = <button disabled>Loading</button>
            }else{
                button = <button onClick={payment}>Pay</button>
            }
            return <div>{button}</div>
        }
    // -> 1 component luôn trả về 1 phần tử JSX cha duy nhất nếu muốn trả về nhiều phần tử bọc trong fragment hoặc div và nằm trong () giúp cho xuống nhiều dòng

    // 3. CSS modules - style an toàn , không xung đột 
    // 3.1. Vấn đề của CSS toàn cục 
        // - Trong dự án lớn , nhiều component có class trùng tên dễ gây đè style . CSS modules giúp local scope cho class name

    // 3.2. Cách dùng CSS modules 
        // - Tạo file componentName.module.css (bắt buộc phải có cụm .module.css)
        // - Import file đó vào component 
        // - Dùng class như thuộc tính của object import 

        // vd : file Button.module.css
        // .btn{
        //     background : blue;
        //     color: white;
        //     padding : 8xp 16px;
        // }
        // .primary{
        //     backgroud : green;
        // }

        import styles from './Button.module.css';

        function Button({variant}){
            return(
                <button className={`${styles.btn} ${variant === 'primary' ? styles.primary : ''}`}>
                    Click
                </button>
            )
        }
        // -> khi import file Button.module.css này trả về 1 đối tượng : đối tượng này có thể truy cập vào tên class trong file như thuộc tính 
        // -> nếu muốn gán tên class nào cho 1 phần tử jsx thì chỉ cần lấy đối tượng gọi đến class đó lúc này phần tử jsx sẽ mang class (React tự tạo className mang các style đó) 

        // - Lưu ý :
            // + Chỉ nên dùng css module cho các component không dùng cho style toàn cục (vd : reset CSS). Vẫn có thể dùng file .css thông thường import vào main.jsx
            // + Vite , Create React App đều hỗ trợ CSS modules mặc định 

    // 4. Thực hành 