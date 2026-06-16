// Ngày 4 : Side Effects với useEffect 

    // - Hôm nay chúng ta học useEffect - hook quan trọng để thực hiện các tác vụ side Effect (gọi API , đọc localStorage , đăng ký sự kiện , setInterval..)
    // -> Đây là nơi kết nối react với thế giới bên ngoài 

    // - Mục tiêu :
        // + Hiểu side effect là gì và tại sao không viết trực tiếp trong thân component
        // + Biết cú pháp useEffect(callback , dependencies)
        // + Phân biệt các kiểu chạy : mỗi lần render , một lần khi mount và khi dependency thay đổi
        // + Sử dụng cleanup function để dọn dẹp (clearInterval , unsubscribe , abort request)
        // + Gọi API với fetch trong useEffect
        // + Xử lí trạng thái loading và error 

    // 1. Side Effect là gì ? 
        // 1.1. Khái niệm 
        // - Side effect(hiệu ứng phụ) là bất kỳ thao tác nào mà React không thể tự động quản lý được bên trong quá trình render
        // -> vì nó tác động ra bên ngoài phạm vi của component , các thao tác này thường không liên quan đến việc render giao diện 

        // - Các ví dụ điển hình : 
            // + Gọi API(fetch , axios) lấy dữ liệu từ server
            // + Đọc/ghi localStorage hoặc sessionStorage
            // + Thiết lập các timer (setInterval , setTimeout)
            // + Thao tác trực tiếp với DOM (focus input , thay đổi title trang)
            // + Đăng ký sự kiện toàn cục (window.addEventListener)
            // + Ghi log (console.log cũng là side effect nhẹ)

        // 1.2. Tại sao không thể đặt side effect trực tiếp trong thân component ?
        // - Thân component (phần render) phải là pure function (hàm thuần) :
            // + Chỉ dựa vào props và state để tính toán JSX
            // + Không gây tác dụng phụ nào 
            // + Mỗi lần gọi cùng đầu vào phải cho ra cùng kết quả 

        // - Nếu đặt fetch hoặc setInterval trực tiếp trong thân component :
            // + mỗi lần component re-render (do state hoặc props thay đổi) các side effect chạy lại -> rất nhiều req không cần thiết 
        
        // 1.3. useEffect giải quyết vấn đề này thế nào ?
        // - useEffect là 1 hook cho phép bạn tách biệt side effect ra khỏi quá trình render . Nó đảm bảo : 
            // + side effect chỉ chạy sau khi render hoàn tất 
            // + bạn có thể dọn dẹp trước khi component bị hủy hoặc  trước khi effect chạy lại
    
    // 2. Cú pháp useEffect 

    import {useEffect , useState} from 'react';

    function myComponent(){
        useEffect(() => {
            // code side effect -> chạy sau khi render xong

            return() => {
                // cleanup function  -> chạy khi component unmount hoặc trước khi effect chạy lại  
            };
        } , [dependencies] ); // mảng phụ thuộc 

    }

    // - Tham số đầu : hàm callback chứa side effect
    // - Tham số 2 : Mảng các dependency (biến , props , state) . Effect sẽ chạy lại nếu bất kì dependency nào thay đổi

    // 3. Các kiểu sử dụng useEffect 
        // 3.1. Chạy mỗi lần render (không có mảng denpendencies)

        useEffect(() => {
            console.log('effect chạy mỗi lần khi render lại')
        });

        // -> ít dùng do gây ảnh hưởng đến hiệu năng , chỉ dùng đề debug

        // 3.2. Chạy một lần khi component mount (mảng rỗng [])

        useEffect(() => {
            console.log('effect chạy một lần khi component mount');
            //gọi API , setInterval ...
        } , [])

        // -> pattern phổ biến nhất để fetch dữ liệu ban đầu 

        // 3.3. Chạy khi dependency thay đổi 

        const [userId , setUserId] = useState(1);

        useEffect(() => {
            console.log('fetch user ' , userId);
            // gọi api theo userId

        } , [userId]) // chạy lại mỗi khi useId thay đổi 

        // 3.4. Cleanup function 
        // - khi bạn đăng ký 1 tài nguyên (interval , subscription , event listener) , bạn cần dọn dẹp tránh memory leak

        useEffect(() => {
            const timer = setInterval(() => {
                console.log('tick tok')
            }, 1000);

            return () => {
                clearInterval(timer)
                // dọn dẹp khi unmount hoặc trước khi effect chạy lại
            }
        } , [])

        // 4. Fetch API trong useEffect 
        const [loading , setLoad] = useState(true);
        const [error , setErr] = useState(null);

        useEffect(() => {
            async function fetchData(url){
                try{
                    const res = await fetch(url);
                    if(!res.ok) throw new Error('Lỗi khi tải sản phẩm');
                    const data = await res.json();
                    setUser(data);
                }catch(err){
                    setErr(err.message);
                }finally{
                    setLoad(false);
                }
            }
            fetchData('https://jsonplaceholder.typicode.com/users')
        } , []);

        // - React sẽ cố gắng gom các lệnh setState lại để giảm thiểu số lần re-render nhằm tối ưu hiệu năng 
        // -> Với React 18 nhờ automatic batching việc gom này xảy ra ở hầu hết mọi ngữ cảnh kể cả đồng bộ và bất đồng bộ
        // -> Ngoại lệ : Việc sử dụng await giữa các lệnh setState sẽ chia nhỏ quá trình batching 

        // vd : với ngữ cảnh có thể batching 
        async function fetchData(url){
            try{
                const res = await fetch(url);
                if(!res.ok) throw new Error('Lỗi khi tải sản phẩm');
                const data = await res.json();
                setUser(data);
            }catch(err){
                setErr(err.message);
            }finally{
                setLoad(false);
            }
        }// gom setUser(data) và setLoad(false) 1 lần re-render với các state mới 

        // vd : với ngữ cảnh ngoại lệ không thể batching 
        // Code này có thể gây ra 2 lần re-render
        async function handleClick() {
            setName('Alice');        // Batch 1
            await fetchSomeData();   // Ngắt ngữ cảnh
            setAge(25);              // Batch 2
        } // mỗi lần gọi setState() sẽ là 2 lần re-render khác nhau 

        // 5. Lưu ý quan trọng 
            // 1. Không gọi setState trực tiếp trong effect mà không có điều kiện -> gây ra vòng lặp vô hạn 
            // 2. Dependency phải chính xác -> nếu thiếu dependency , effect có thể chạy với giá trị cũ
            // 3. Không khai báo async trực tiếp trong useEffect -> useEffect  không nhận func trả về Promise 
            // (vì clean up phải là func) -> nên định nghĩa async function ngay bên trong useEffect sau đó gọi hàm đó để chạy
            // 4. Luôn thêm cleanup cho interval , subscription , event listener , fetch nếu cần hủy 

    // 