// Review ngày 5 : Custom hook

    // - hook là : hook là các hàm *đặc biệt được định nghĩa sẵn bởi react có tác dụng *móc nối vào các tính 
    // năng của react như state , lifecycle , context trong function component -> chúng không hoạt động bên ngoài component và class component
        
        //  + state : là dữ liệu thay đổi theo thời gian và ảnh hưởng đến giao diện của component
        // -> sử dụng state khi dữ liệu thay đổi theo tương tác của người dùng (input , checkbox...) hoặc dữ liệu tạm thời cho component đó và component con trực tiếp

        // + lifecycle : là vòng đời của component trải qua 3 giai đoạn chính : mounting , updating , unmounting
            // - mounting : gọi api , đăng ký sự kiện , đọc localStorage
            // - updating : re-fetch khi props tthay đổi , cập nhật DOM dựa trên state 
            // - unmounting : xóa interval , hủy subscription , abort fetch 
        // -> hiểu rõ vòng đời giúp bạn thực hiện các tác vụ như gọi API , đăng kí sự kiện , dọn dẹp tài nguyên 

        // + context : là chia sẻ dữ liệu xuyên suốt cây component , cho phép truyền dữ liệu component cha xuống bất
        // kì component con bào trong cây mà không cần truyền qua props từng tầng (prop drilling)
        // -> sử dụng context khi cần dùng dữ liệu ở nhiều component ở cấp độ khác nhau (theme , auth...) và khi prop drilling trở nên cồng kềnh khó bảo trì

    // -> mỗi quan hệ state , life cycle và content : 
        // + state quản lí dữ liệu cục bộ của component
        // + lifecycle (thông qua useEffect) cho phép bạn đồng bộ state với các nguồn dữ liệu bên ngoài (api...) và dọn dẹp khi cần
        // + context cung cấp dữ liệu toàn cục đến các conponent con mà không cần qua props

    // - các hook hay sử dụng : 
        // + useState : Giúp tạo và lưu giá trị cục bộ cho component , hàm này trả về 1 mảng
        // gồm state và setState , state giúp lưu trữ giá trị bất kì và chỉ thay đổi qua hàm 
        // setState và sẽ làm re-render lại component dựa trên giá trị state mới
    
        // + useEffect : Giúp xử lí các side effect khi định nghĩa component , các side 
        // effect này không làm ảnh hưởng tới giao diện mà ảnh hưởng đến bên ngoài component,
        // useEffect có 2 tham số cần truyền tham số 1 hàm callback tham số 2 là mảng dependencies,
        // hàm callback phải trả về hàm cleanup hoặc không trả về gì nên đặt side effect bên trong hàm
        // callback và cần return trả về cleanup khi cần dọn dẹp khi component unmount hoặc khi callback
        // được gọi lại ,mảng dependencies chứa các giá trị side effect phụ thuộc khi khi thay đổi 
        // các giá trị bên trong mảng này thì callback gọi lại , nên trường hợp nếu muốn useEffect chạy
        // 1 lần thì để trống mảng dependencies 

    // - custom hook : là 1 hàm js sử dụng để tự định nghĩa 1 hook để sử dụng trong jsx 
    // -> custom hook kết hợp và sử dụng các hook có sẵn của react định nghĩa sau đó có thể tái sử dụng ở nhiều component khác nhau

        // + Tên custom hook phải bắt đầu bằng use (quy ước bắt buộc để react kiểm tra lỗi )
        // + Custom hook không tạo ra loại hook mới mà là cách đóng gói logic sử dụng các hook có sẵn
        // + Logic bên trong custom hook được tái sử dụng nhưng  state và effect vẫn thuộc component gọi nó

        // -> việc đóng gói logic và hook có sẵn trong custom hook khi được gọi ra ở 1 component các logic đó
        // sẽ được gọi và sử dụng lại và các hook được sử dụng trong custom hook sẽ được khởi tạo mới 
        // hoàn toàn và thuộc về component gọi nó 

// Sơ đồ hoạt động custom hook và cách nó gọi các hook khác khi được sử dụng trong component :

    // Bước 1 : Component gọi custom hook 

    function UserList(){
        const {data , loading , error} = useFetch('https://api.example.com/users');

        //...
    }
    // - component UserList đang render và gọi hàm useFetch

    // Bước 2 : Custom hook thực thi (trong phạm  vi của component gọi custom hook)

    import {useState , useEffect} from 'react';

    function useFetch(){
        const [data , setData] = useState(null);  // gọi các useState
        const [loading , setLoading] = useState(true);
        const [error , setError] = useState(true);

        useEffect(() => {  // gọi useEffect
            fetch(url)
                .then(res => res.json())
                .then(data => setData(data))
                .catch(err => setError(err.message))
                .finally(() => setLoading(false));
        } , [url]) // dependency : url

        return {data , loading , error} // trả về dữ liệu 
    }
    // - React chạy các hook bên trong useFetch trong ngữ cảnh component UserList -> useFetch gọi ra trong component UserList
    // -> useState tạo state cho component của UserList
    // -> useEffect đăng kí side effect cho component UserList 

    // Bước 3 : React liên kết hook với component 

    // - React duy trì 1 hàng đợi cho các hook của từng component -> khi UserList render nó biết rằng các hook khai báo trong custom hook nó thuộc về component gọi nó
    // - state và effect được lưu trong bộ nhớ của component UserList

    // Bước 4 : Custom hook trả về dữ liệu cho component 

    // - useFetch trả về obj {data , loading , error}
    // - component UserList nhận obj này và sử dụng render UI 

    // Bước 5 : Khi state bên trong custom hook thay đổi 

    // -> khi gọi custom hook bên trong 1 component thì state của custom hook thực chất là của component và khi thay đổi giá trị state đó sẽ re-render lại component này

// Review ngày 5 (tiếp) : 

    // + custom hook : là hàm js  do người dùng tự định nghĩa , có thể sử dụng các hook đã được định nghĩa sẵn 
    // bởi react để định nghĩa custom hook 

    // + Quy tắc : bắt buộc phải có use đặt trước tên hàm và trả về giá trị 1 mảng hoặc 1 đối tượng 

    // + Sử dụng custom hook khi : Có thể tái sử dụng lại logic được định nghĩa bên trong custom hook ở nhiều component khác
    // -> custom hook đóng gói lại logic để có thể mang đi dễ dàng và sử dụng ở nhiều nơi
    // -> Khi component gọi custom hook thì các hook được gọi ra bên trong custom hook sẽ thuộc về component gọi nó và khi xảy ra sự thay đổi vẫn re-render component

// - Tự kiểm tra 

    // 1. Tại sao custom hook phải bắt đầu bằng use ? 
    // -> vì theo quy tắc của react mọi hook đều phải bắt đầu bằng use 
    // -> nếu bạn đặt tên hook không bắt đầu bằng use react không kiểm tra lỗi và các lỗi về hook có thể không được báo -> khó debug

    // 2. Custom hook có thể gọi hook khác không ? 
    // -> có thể gọi được hook khác 
    // -> tất cả cả hook cả custom hook đều phải tuân theo quy tắc hook : chỉ gọi ở top level của component hoặc custom hook , không gọi
    // trong vòng lặp , điều kiện, hàm lồng nhau 

    // 3. Khi nào nên trích xuất logic thành Custom hook ? 
    // -> khi logic có thể tái sử dụng được ở nhiều các component khác nhau 
    // -> khi logic quá phức tạp làm component khó đọc 
    // -> có state và side effect (fetch api , localStorage...) mà bạn muốn tách biệt 

    // 4. Làm thế nào để Custom hook nhận tham số và trả về giá trị linh hoạt ? 
    // -> Custom hook định nghĩa bằng cách sử dụng 1 hàm js cho phép nhận tham số và trả về bất kì giá trị nào 
    // -> thông thường custom hook sẽ trả về 1 mảng hoặc 1 obj chứa các giá trị và hàm để component sử dụng 

    // 5. Viết một custom hook đơn giản useCounter

    // định nghĩa custom hook useCounter 
    
        import {useState} from 'react';
    
        function useCounter(initialVal = 0 , initialStep = 1){
            const [count , setCount] = useState(initialVal);
            const [step , setStep] = useState(initialStep);
    
            const increment = () => {
                setCount(prev => prev + step)
            }
    
            const decrement = () => {
                setCount(prev => prev - step)
            }
    
            const upStep = () => {
                setStep(prev => prev + 1)
            }
    
            const downStep = () => {
                setStep(prev => prev - 1)
            }
    
            const resetCount = () => {
                setCount(0);
            }
    
            return [count , step , increment, decrement , upStep , downStep , resetCount]
        }
    
        export default useCounter;