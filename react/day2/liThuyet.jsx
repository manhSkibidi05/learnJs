// Tuần 1 - Ngày 2 : State , Sự kiện và Form cơ bản 

    // - Ngày 1 đã học về component , JSX , props . Hôm nay học về state - thứ làm cho component trở nên "sống động"
    // -> Bạn biết cách tạo nút bấm , form nhập liệu và phản hồi lại hành động của ngừi dùng 

    // - Mục tiêu : 
        // - Hiểu state là gì , phân biệt với props 
        // - Biết sử dụng hook useState để khai báo state trong function component 
        // - Thay đổi state bằng setter function (cập nhật và gây re-render)
        // - Xử lí sự kiện (click , change , submit) trong React
        // - Tạo controlled component (input , textarea , select) với state
        // - Xây dựng ứng dụng đếm (counter) và form đơn giản 

// 1. State là gì ? Tại sao cần state ? 

    // 1.1. Props và state 
    // - Props : Dữ liệu truyền từ cha xuống con (read-only) . Không thể thay đổi bên trong component
    // - State : Dữ liệu nội bộ của component , có thể thay đổi được , mỗi khi thay đổi -> component re-render (cập nhật giao diện)

    // 1.2. useState hook
    // - Hook là những hàm đặc biệt do React cung cấp , cho phép function component 'móc nối' vào các tính năng như state lifecycle
    // -> useState là hook đầu tiên mà bạn học 

    // - cú pháp : 
    import {useState} from 'react';

    function Mycomponent(){
        const [state , setState] = useState(initialValue);
        // state giá trị hiện tại 
        // setState : hàm cập nhật , gọi setState(newVal) -> component re-render 
        return
    }

    // - vd cụ thể : 
    function counter(){
        const [count , setCount] = useState(0);

        return(
            <>
                <h1>Số lượng : {count}</h1>
                <button onClick={() => setCount(count => count + 1)}>Tăng</button>
            </>
        )
    }
    // - Lưu ý quan trọng : 
        // + Không gọi setState trực tiếp ngoài component (chỉ trong event handler , useEffect , hoặc callback)
        // + Cập nhật state bất đồng bộ . Nếu muốn dùng giá trị state giá trị cũ để tính giá trị mới hãy dùng dạng func
    
    // - Tóm tắt kiến thức : 
    // + props : dữ liệu truyền vào component (giống tham số hàm) . Không thể thay đổi bên trong component 
    // + state : dữ liệu nôi bộ component , do component tự quản lí . Thay đổi bằng setter , khi setter được gọi , component re-render

// 2. Xử lí sự kiện trong React 
    
    // 2.1. Các sự kiện phổ biến 
        // - onClick , onChange , onSubmit , onMouseEnter ...
        // -> tên sự kiện viết theo camelCase
        // -> giá trị sự kiện nhận là 1 tham chiếu hàm (tên hàm function declaration hoặc arrow function)

    function handlerClick(){
        console.log('clicked');
    }
    <button onClick={handlerClick}>Click me</button>;

    // 2.2. Truyền tham số cho event handler 
    // -> xảy ra khi 1 hàm xảy ra trong sự kiện cần truyền tham số : sử dụng arrow func

    <button onClick={() => handlerClick(a , b)}>Dont click me</button>;

    // 2.3. Đối tượng event 
    // -> truyền vào event( hoặc e) là đối tượng của sự kiện cung cấp thuộc tính và phương thức mô tả chi tiết về sự kiện đó

    <button type='submit' onClick={(e) => console.log(e.target.value)}>submit</button>;

// 3. Controlled component (form với state)

    // - controlled component : dữ liệu của input được điều khiển hoàn toàn bởi state React 
    // -> Giá trị input luôn lấy từ state , mỗi lần gõ gọi onChange để cập nhật state 

    // 3.1. input text 
    function NameForm(){
        const [name , setName] = useState('');
        return(
            <div>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                <p>Xin chào , {name}</p>
            </div>
        );
    }

    // 3.2. checkbox 
    function CheckboxForm(){
        const [isChecked , setChecked] = useState(false);
        return(
            <div>
                <input type="checkbox" checked={isChecked} onChange={(e) => setChecked(e.target.value)} />
                <p>Trạng thái : {`${isChecked ? 'hoàn thành' : 'chưa xong'}`}</p>
            </div>
        )
    }

    // 3.3. select dropdown 
    function SelectForm(){
        const [value , setValue] = useState('default');
        return(
            <select value={value} onChange={(e) => setValue(e.target.value)}>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="default">default</option>
            </select>
        )
    }

    // 3.4. form submit 
    function FormSubmit(){
        const [name , setName] = useState('');
        const [password , setPass] = useState('');

        return(
            <form onSubmit={ (e) => {e.preventDefault(); console.log({name , password})} }>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="password" value={password} onChange={(e) => setPass(e.target.value)} />
                <button type="submit">Gửi form</button>
            </form>
        )
    }

    // - Tự kiểm tra kiến thức ngày 2 : 
    // 1. State và props khác nhau như thế nào ? 
        // - State là biến cục bộ sử dụng trong function component và có thể thay đổi giá trị dựa trên hàm setState 
        // - props là tham số được truyền vào function component chỉ có thể lấy các giá trị của props ra sử dụng chứ không thay đổi các giá trị đó 

    // 2. Tại sao không thể gán trực tiếp state = newValue mà phải dùng setState ?
        // - Nếu gán trực tiếp state = newValue nhưng trên trình duyệt lại không cập nhật lại giao diện dựa trên giá trị của state
        // -> việc dùng setState vì để đảm bảo khi state thay đổi giá trị sẽ gọi lại chính component function này để render lại giao diện dựa trên state mới 
    
    // 3. Controlled component là gì ? lợi ích ? 
        // - là một thành phần form (input , textarea , select) mà giá trị hiện thị được điều khiển hoàn toàn bởi state của react
            // + Giá trị input được lấy từ state -> từ giá trị state cập nhật lại về value của input hoặc checked
            // + Mỗi khi người dùng thay đổi input -> kích hoạt sự kiện onChange rồi gọi hàm setState để cập nhật state rồi re-render function component
            // + React là nguồn sự thật duy nhất 
        
        // - Lợi ích : 
            // + Đồng bộ dữ liệu : Giá trị hiển thị trên web luôn đồng bộ với state 
            // + validation realtime : Kiểm tra lỗi ngay khi ngừi dùng đang nhập
            // + Dễ reset hoặc set giá trị mặc định : Khi rơi vào các trường hợp cần reset chỉ cần gọi setState
            // + Dễ chuyển đổi hoặc format dữ liệu : viết hoa chữ cái đầu , định dạng sdt
            // + Tương thích với các  logic khác : kết hợp useEffect , validation library...

