// Bắt đầu học những cốt lỗi của react 

// 1. Hiểu về Virtual DOM
// - Đây là xương sống tạo nên tốc độ hiệu quả và đáng kinh ngạc của React 

    // 1.1. DOM thật (Browser DOM)
    // - Thông thường trình duyệt xây dựng giao diện người dùng (UI) dựa trên một cấu trúc cây gọi là DOM (Document Object Model)
    // -> Khi bạn dùng JS để thay đổi giao diện như document.createElement , bạn đang tương tác trực tiếp với DOM này 

        // + Vấn đề : Việc thay đổi các phần tử đã có thì khá nhanh nhưng việc chèn các phần tử mới vào DOM lại cực kì chậm 
        // và tốn kém hiệu xuất

    // 1.2. Giải pháp của React : Virtual DOM 
    // - Thay vì bắt bạn tự tay quản lí các thay đổi phức tạp và chậm chạp trên DOM thật , React tạo ra bản sao bẳng JS gọi là Virtual DOM

        // + Định nghĩa : Virtual DOM là một bộ các chỉ dẫn (instruction) dưới dạng đối tượng JS mô tả giao diện sẽ trông như thế nào
    
        // + Cơ chế hoạt động : Khi dữ liệu thay đổi , React sẽ thay đổi các đối tượng JS này trước (việc này rất nhanh)
        // Sau đó React sẽ so sánh bản cũ với bản mới để tìm ra những thay đổi tối thiểu cần thiết 

    // 1.3. Cách React cập nhật lại giao diện 
    // - Thay vì xóa toàn bộ danh sách và xây dựng lại từ đầu (rất chậm) . React chỉ cập nhật những thay đổi dựa trên so sánh trước đó

        // + vd : Nếu bạn có danh sách 5 người và chỉ thay đổi cảm xúc 3 người từ 'vui' sang 'buồn' , React nhận diện được 
        // 3 sự thay đổi nàyy và chỉ cập nhật 3 phần tử đó trong DOM thật , giữ nguyên 2 phần tử còn lại 
        
        // + Lợi ích : Giảm thiểu tối đa việc can thiệp vào DOM thật và giúp ứng dụng chạy mượt mà ngay cả với dữ liệu lớn 

    // -------------- Mô tả cách dễ hiểu hơn ------------------
    
        // + DOM thật : Là cấu trúc cây được định nghĩa bằng HTML 
        // -> Việc sử dụng JS để tác động lên DOM thật là thao tác để thay đổi cấu trúc HTML và việc này rất tốn thời gian
        // -> DOM thật giống với bức tường xây kiên cố khi muốn thay đổi cần nhiều thao tác 

        // + DOM ảo : Là đối tượng được định nghĩa bởi JS dựa trên dữ liệu trả về của phần tử JSX 
        // -> Việc tạo ra 1 đối tượng này rất nhanh chỉ dựa trên phần tử JSX trả về mà tạo ra đối tượng này
        // -> DOM ảo giống với bản thiết kế xây tường nên tạo ra 1 bản thiết kế mới dựa trên các thay đổi là nhanh chóng 

        // + Luồng hoạt động : 
        // Tạo DOM ảo dựa trên file JSX trả về -> Tạo DOM thật lần đầu dựa trên DOM ảo -> khi 1 dữ liệu thay đổi(props, state...) 
        // ảnh hưởng đến file JSX -> Tạo DOM ảo dựa trên dữ liệu mới -> So sánh DOM ảo mới với DOM cũ tìm điểm khác biệt
        // -> Tạo ra bản báo cáo những phần tử thay đổi -> Thay đổi các phần tử đó trên DOM thật  

        // + Công việc của JS 
            // - Ở DOM thật JS cần phải thao tác trực tiếp thay đổi cấu trúc HTML -> chậm 
            // - Ở DOM ảo JS chỉ cần tạo object dựa trên JSX và lưu nó trong bộ nhớ heap -> nhanh
            // - Khi có sự thay đổi tạo DOM ảo mới (object mới) so sánh DOM ảo cũ -> nhanh 
            // - Tạo ra danh sách phần tử thay đổi rồi thao tác lên DOM thật -> có thể chậm 

    // -> Việc sử dụng React giúp tránh thao tác với DOM thật nhiều nhất có thể và chỉ thực hiện khi có bản danh sách các thứ cần thay đổi 

        // vd : object  được js tạo dựa trên JSX -> bộ chỉ dẫn

        // jsx
        <div className="container">
            <h1>Chào bạn</h1>
            <p>Số lượt: {count}</p>
        </div>

        // object được tạo : 
        // {
        //     type: 'div',
        //     props: {
        //         className: 'container',
        //         children: [
        //             { type: 'h1', props: { children: 'Chào bạn' } },
        //             { type: 'p', props: { children: 'Số lượt: 0' } }
        //         ]
        //     }
        // }

// 2. Làm quen với React Elements 

    // 1 . React Element là gì ? 
        // - Trong trình duyệt , giao diện được tạo ra từ các phần tử HTML , trong React giao diện được mô tả bởi các React Element
            // + Một React Element thực chất là một đối tượng JS đơn giản đóng vai trò bản hướng dẫn để tạo ra phần tử HTML tương ứng để tạo giao diện
            // + Nó nhẹ hơn nhiều so với phần tử DOM thật vì không trực tiếp thao tác hiện thị phức tạp 
            
    //2. Hàm React.createElement 
        React.createElement(type , props , children);

        // - type : Loại phần tử bạn muốn tạo (h1 , p , input...)
        // - props : Các thuộc tính của phần tử (id , className...)
        // - children : Nội dung nằm giữa thẻ mở và đóng , nó có thể là chuỗi văn bản hoặc React Element khác được lồng vào 
    
    // 3. Cây thành phần 
        // - Khi các React element lồng nhau , chúng tạo thành cấu trúc cây 
    
    // 4. Hiện thị lên trình duyệt 
        // - Để đưa các React element lên trình duyệt , bạn cần thư viện ReactDOM hàm render()
        // -> Nhận React element của bạn và chèn nó vào phần tử HTML thật trên web (thường là thẻ div có id='react-container') 

    // -> React element thực chất là object (đối tượng) do JS tạo nên dựa trên 2 cách : 
        // + Cú pháp JSX giống với cú pháp HTML (các thẻ)
        // + Sử dụng hàm nền tảng : React.createElement(type , prop , children)
    // -> sau khi chạy React element sẽ biến từ các cú pháp JSX hay hàm nền tảng thành đối tượng (DOM ảo) rồi render DOM thật lần đầu

    const title = React.createElement(
        "h1" ,
        { className : 'title'},
        "Thực đơn coffe"
    )

    const list = React.createElement(
        "ul",
        null,
        React.createElement("li" , null , 'capuchino'),
        React.createElement("li" , null , 'expresso')
    )
    
    // - Props là : một đối tượng (object) chứa tất cả các thuộc tính bạn truyền vào React Element 
        // + thông thường props là các thuộc tính bạn cố ý truyền vào react element để cấu hình phần tử đó như (id , className...)
        // + thuộc tính children không phải do bạn truyền vào mà là nội dung bên trong thẻ mở và đóng 
        // -> React tự động nhận nó và thêm vào thuộc tính children cho props có thể truy cập khi viết component 

    // - Chidren có thể là number , string , array , react element khác hay null/undefined sẽ không render ra gì 

// 3. JSX và component 
    // 1. JSX là gì và tại sao cần ? 
        // - JSX là cú pháp giống HTML được tạo ra nhằm giải quyết vấn đề tạo React Element bằng hàm nền tảng ban đầu dài dòng và khó bảo trì

    // 2. Quy tắc vàng khi viết JSX 
        // + Thẻ tự đóng : với các phần tử không có nội dung con bắt buộc phải có dấu /> ở cuối (<img />)
        // + Biểu thức JS : đây là sức mạnh của JSX bất kì giá trị JS nào (biến , mảng , hàm) đều phải truyền qua dấu {}
        // + Cấu trúc phân cấp : Bạn có thể lồng các component vào nhau như các thẻ HTML thông thường 

    // 3. Component là gì ? 
        // - Trong react mọi giao diện người dùng đều được chiaa nhỏ thành các component 
        // -> coi component là 1 hàm js chỉ nhận dữ liệu từ props và trả về 1 phần tử JSX  
        // -> ưu điểm : không có đối tượng this , mã nguồn ngắn dễ kiểm thử 

    function Title(){
        return <h1 className='title'>Thực đơn coffe</h1>
    }

    function List(){
        return(
            <ul>
                <li>Capuchino</li>
                <li>Expresso</li>
            </ul>
        )
    }

    // * Vấn đề props drilling : 
    // vd : 

    function App(){
        const user1 = {id : 1 , name : 'long'}
        return <Parent user={user1}></Parent>
    }

    function Parent({user}){
        return <Child user={user}></Child>
    }

    function Child({user}){
        return <UserName user={user}></UserName>
    }

    function UserName({user}){
        return <h1>{user.name}</h1>
    }

    // -> lúc này dữ liệu user được truyền qua 3 component con nhưng chỉ 1 component sâu nhất  cần 
    // đến dữ liệu này , App -> Parent -> Child -> UserName 
    // -> Đây chính là prop drilling 

    // + Định nghĩa component quyết định cách nhận props 
        // - Khi bạn định nghĩa component , bạn cần khai báo nhận props (sử dụng destucturing) . 
        // -> Lúc này thì component con mới có thể nhận dữ liệu từ cha được truyền qua props ngày cả khi không dùng đến

        function NhaBep(){
            const food = 'bún bò huế';
            return <PhucVu food={food}></PhucVu>
        }

        // khai báo nhận props food truyền từ NhaBep
        function PhucVu({food}){
            return <Khach food={food}></Khach>
        }

        function Khach({food}){
            return <h1>Ăn {food}</h1>
        }
        // -> truyền dữ liệu đồ ăn từ nhà bếp bắt buộc phải qua phục vụ 

    // + Truyền props là cách duy nhất để dữ liệu đi từ cha xuống con 
        // - Trong react dữ liệu chỉ đi 1 chiều từ trên xuống dưới (top -> down) thông qua props .
        // -> vì vậy nếu 1 component ở sâu cần dữ liệu tử component ở trên cùng thì mọi component
        // trung gian giữa 2 component này cần nhận props và truyền dữ liệu xuốn 

    // + Vấn đề của prop drilling : Khó bảo trì , code dài dòng , Khó tái sử dụng 

    // + Cách khắc phục : 
        // 1. Context API : Cho phép chia sẻ dữ liệu trực tiếp từ 1 provider xuống bất kì consumer nào trong cây mà không cần truyền qua trung gian.
        // 2. Composition : Thay vì truyền nhiều cấp bạn có thể truyền JSX , component được render từ bên ngoài vào
        // 3.  State manament (redux , zustand...) : Quản lí dữ liệu toàn cụ , cá component có thể truy cập
        // trực tiếp mà không cần qua props 
