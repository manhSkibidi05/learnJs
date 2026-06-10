// Review kiến thức đã học ngày 2 

    // - state : là biến cục bộ được function component quản lý , có thể thay đổi giá trị bằng hàm setState hàm này sau khi thay đổi state sẽ re-render
    // - cú pháp : 
    import {useState} from 'react';
    const [state , setState] = useState(initialValue);

        // - import hàm useState từ thư viện react 
        // -> gọi hàm useState(val) với tham số là giá trị ban đầu của state 
        // -> hàm useState trả về mảng chứa state và hàm setState nên sử dụng destructring để lấy luôn dữ liệu hàm đó trả về rồi gán vào biến

    // - sự khác nhau giữa props và state sử dụng trong function component 
        // + props là 1 đối tượng được truyền làm tham số của function component 
        // -> tác dụng là lấy dữ liệu dược truyền vào hàm để sử dụng chứ không thể thay đổi 

        // + state giá trị được khai báo bên trong function component 
        // -> tác dụng giá trị này đóng vai trò hiện thị lên giao diện người dùng
        // -> khi có sự kiện thay đổi giá trị thông qua hàm setState() dựa trên giá trị state thay đổi thì sẽ re-render lại giao diện của function component

    // - controlled component là : kiểu component sẽ hiện thị dữ liệu hoàn toàn dựa trên state 1  cách real-time thông qua các thẻ form : input , textarea , select 
    // -> khi các thẻ form diễn ra sự kiện như onChange xảy ra sự kiện sẽ thay đổi state cập nhật lại bằng setState và re-render luôn
    // -> giúp việc cập nhật dữ liệu trực tiếp , đồng bộ dữ liệu giữa state và giao diện

// - Kiến thức bổ sung ngày 2 : 

    // - Props Kiểu dữ liệu và tính bất biến 
        // + Props có thể là bất kì kiểu dữ liệu nào props(properties) là cách component cha truyền dữ liệu xuống component con
        // -> bạn có thể truyền bất cứ thứ gì qua props : kiểu nguyên thủy , kiểu tham chiếu , component khác
        // vd  : 
        function Parent(){
            return(
                <Child
                    name='an'
                    age={18}
                    isActive={true}
                    address={{city : 'hà nội'}}
                    hobby={['play football' , 'play chess']}
                    header={<Header />} // component khác
                />
            )
        }

        function child(props){
            // props chứa tất cả thuộc tính trên
            return <button className={props.name}>click</button>
        }

        // + Props là read-only không thể sửa giá trị trong component con vì :
            // - react áp dụng luồng dữ liệu 1 chiều (từ cha xuống con) giúp dễ dự đoán và debug
            // - nêu component có thể sửa props sẽ gây ra hiệu ứng phụ khó kiểm soát
            
    // - useState được import từ đâu và trả về gì ? 
        // + useState là hàm được import từ thư viện react nhờ cơ chế named export
        // + useState trả về 1 mảng có đúng 2 phần tử 
        // -> phần tử thứ 0 : giá trị hiện tại state (đọc được giá trị , không gán trực tiếp)
        // -> phần tử thứ 1 : hàm setter dùng để cập nhật state và kích hoạt re-render 

        // + mỗi lần gọi useState(val) React sẽ cung cấp ô nhớ cho state này và gán giá trị ban đầu là val
        // -> khi mà gọi hàm setState(newVal) React cập nhật lại ô nhớ và gửi thông báo cho component để render lại giao diện
        
        // + 1 function component có thể gọi nhiều state mỗi lần gọi cung cấp cho state ô nhớ khác nhau 

    // - controlled component : re-render và cơ chế giữ focus 
        // + Cơ chế hoạt động của React khi re-render : 
        // 1. Virtual DOM diffing : Khi state thay đổi react tạo virtual DOM mới , nó so sánh với virtual DOM cũ và tìm ra những điểm khác biệt
        // 2. Chỉ cập nhật những gì thay đổi : với 1 thẻ input với value={text} là state , khi state thay đổi thì giá trị value của thẻ input thay đổi
        // nhưng vẫn cùng là thẻ input chỉ thay đổi value (không bị hủy và tạo mới)
        // 3. Trình duyệt giữ focus : vì DOM element đó vẫn tồn tại và không bị thay thế, focus không bị mất 
        
        // -> khi re-render lại component không làm thay đổi DOM element nó chỉ thay đổi những giá trị do state được đọc 
        
        

