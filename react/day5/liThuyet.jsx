// Ngày  5 : Custom Hooks - Tái sử dụng logic trong React 

    // - Hôm nay chúng ta học một trong những tính năng mạnh mẽ nhất của React : Customs Hooks
    // -> Đây là cách bạn 'trích xuất' logic state và side effect ra khỏi component , giúp code sạch hơn , dễ tái sử dụng và kiểm thử

    // - Mục tiêu : 
        // + Hiểu Custom Hook là gì và tại sao cần dùng 
        // + Biết cách tạo ra một Custom Hook (quy tắc đặt tên , cấu trúc)
        // + Tách các logic fetch API , localStorage , form handing vào Custom Hook
        // + Sử dụng Custom Hook trong nhiều component khác nhau
        // + Phân biệt Custom Hook với hàm thông thường 

    // 1. Custom Hook là gì ? 
        // - Custom Hook là 1 hàm js bắt đầu bằng từ khóa use (vd : useFetch , useToggle...)
        // -> Bên trong nó bạn có thể sử dụng các Hook khác của React như useState , useEffect...

        // - Trích xuất logic dùng chung (state + side effect) ra khỏi component , giúp : 
            // + Tái sử dụng logic giữa nhiều component 
            // + Component trở nên gọn gàng , tập trung render UI
            // + Dễ dàng kiểm thử logic riêng biệt 

        // - Quy tắc quan trọng : 
            // + Tên Custom Hook phải bắt đầu bằng use -> React dùng quy ước này để kiểm tra vi phạm quy tắc hook
            // + Chỉ gọi các hook khác (useState , useEffect...) ở top level của Custom Hook -> không đặt trong điều kiện hoặc vòng lặp

    // 2. Vd đơn giản : useToggle -> quản lý boolean state và toggle nó

        // hooks/useToggle.js
        import {useState} from 'react';

        function useToggle(initialVal = false){
            const [value , setValue] = useState(initialVal);
            const toggle = () => setValue(prev => !prev);
            return [value , toggle]
        }

        export default useToggle;

        // sử dụng trong component 
        import {useToggle} from './hooks/useToggle.js';

        function switchTheme(){
            const [theme , setTheme] = useToggle(false);
            return(
                <button onClick={setTheme}>
                    {theme ? 'Chế độ tối' : 'Chế độ sáng'}
                </button>
            )
        }

    // 3. Lưu ý khi viết Custom Hook
        // + khi gọi hook không gọi khi có điều kiện hoặc đặt trong vòng lặp  -> luôn đặt ở top level (trên cùng)
        // + Hàm trả về giá trị có ý nghĩa -> thường là array (giống useState) hoặc 1 obj
        // + Đặt tên rõ ràng -> useFetch , useToggle , useLocalStorage... dễ hiểu mục đích của hook 
        // + Có thể kết hợp nhiều hook -> trong 1 Custom Hook bạn có thể gọi nhiều useState , useEffect thậm trí dùng hook khác

    // 4. Đào sâu lí thuyết 
        
        // 1. Hook là gì ? Tại sao cần Custom Hook ? 
        // - Hook là những hàm đặc biệt trong React cho phép bạn móc nối vào các tính năng của React (state , vòng đời , context)
        // ngay trong function component. -> các hook do react cung cấp : useState , useEffect , useContext , useRef...

        // - Cần Custom Hook : mặc dù react cung cấp các 'mảnh ghép' cơ bản nhưng trong thực tế logic nghiệp vụ thường lặp lại
        // ở nhiều component :
            // + lấy dữ liệu api , đọc ghi localStorage , xử lí logic ...

        // -> Custom Hook giúp đóng gói những logic  có state này vào 1 hàm duy nhất giúp :
            // + Tái sử dụng giữa nhiều component
            // + Tách biệt mối quan tâm : component tập trung giao diện (UI) , logic dữ liệu chuyển sang hook
            // + Dễ dàng kiểm thử 
        
        // 2. Sử dùng các Hook do React định nghĩa bên trong Custom Hook có làm thay đổi ý nghĩa của nó không ? 
        // - Không , ý nghĩa và cơ chế vẫn giữ nguyên 

        // - Khi bạn dùng useState hay useEffect... bên trong custom hook chúng vẫn hoạt động giống như khi dùng trực tiếp trong component
            // + useState vẫn tạo state cục bộ
            // -> khi gọi setState component sử dụng custom hook vẫn re-render
            
            // + useEffect vẫn dựa trên dependencies và cleanup hoạt động 
        // -> Custom hook chỉ là lớp bọc nhóm các hook cơ bản lại không thay đổi bản chất hay luông hoạt động

        function useCounter(initial = 0){
            const [count , setCount] = useState(initial); // vẫn là state của component

            const increment = () => {setCount(prev => prev + 1)} // khi click gọi đến hàm này và hàm này gọi hàm setCount() -> vẫn re-render component

            return [count , increment];
        }

        function MyComp(){
            const [count , setCount] = useCounter(0);

            console.log('Render lại khi count thay đổi');

            return <button onClick={setCount}>Tăng đếm</button>
        }



