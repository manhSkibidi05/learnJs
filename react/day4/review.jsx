// review ngày 4 : 

import { useEffect } from "react";

    // - side effect : hiệu ứng phụ trong react xảy ra khi có những tác động ra bên ngoài không phải tác động trực tiếp vào UI
    // -> những ảnh hưởng này không thay đổi về giao diện nhưng nó cần thiết vd : 
        // + lấy/ghi dữ liệu trong localstorage
        // + fetch api lấy dữ liệu 
        // + sử dụng hàm bất đồng bộ setTimeout , setInterval
        // + thao tác , sự kiện ảnh hưởng tới DOM thật   
    // -> khi đặt các lệnh này ngay trong thân component mỗi khi re-render sẽ gây ra lặp lại trong khi chỉ cần gọi khi cần thiết
    
    // - useEffect tạo ra nhằm giải quyết vấn đề này : là 1 hàm được cung cấp bởi react sử dụng bằng cách import từ react
    // - cú pháp : useEffect(() => {} , []) 
        // + gồm 2 tham số là hàm callback và mảng các dependency 
        // + useEffect sẽ được chạy sau khi mà component chạy xong -> chạy cuối cùng 
        // + trong thân hàm callback sẽ chứa các định nghĩa về side effect và gọi để sử dụng chúng 
        // + mảng các dependency chứa state , props hoặc 1 biến bất kì khi thay đổi giá trị chúng lúc này useEffect mới gọi lại
        
    // - các trường hợp sử dụng useEffect : 
        // + viết lệnh trong hàm callback và không truyền mảng vào tham số 2 trong useEffect
        // -> mỗi lần re-render sẽ gọi useEffect 1 lần 
        // -> chỉ sử dụng để debug 

        // + viết lệnh trong hàm callback và truyền vào mảng rỗng tham số thứ 2 trong useEffect
        // -> chỉ chạy đúng lần đầu tiên component chạy 
        // -> sử dụng phổ biến với các lệnh chỉ thực hiện 1 lần vd : fetch dữ liệu

        // + viết lệnh trong hàm callback và truyền vào props , state hoặc 1 biến vào mảng của tham số thứ 2
        // -> chỉ chạy đúng lần đầu tiên component chạy và sẽ chạy tiếp nếu giá trị nằm trong mảng thay đổi 
        // -> sử dụng với các hiệu ứng bên ngoài có ảnh hưởng nếu giá trị trong component thay đổi vd : ghi dữ liệu localStorage

        // + viết lệnh trong hàm callback và  return về hàm cleanup 

    // - Các khái niệm mới : 
        // 1. hàm pure : hàm thuần khiết do khoa học máy tính định nghĩa nếu 1 hàm là pure khi thỏa mãn 2 điều kiện 
            // 1. cùng đầu vào -> cùng đầu ra : với cùng bộ tham số luôn cho ra cùng 1 kết quả
            // 2. không có tác dụng phụ : không tác động đến bất cứ điều gì bên ngoài (không ghi database , không gọi api , không thao tác dom...)

        // -> trong component của react xây dựng hàm dựa trên pure function đối với props và state . cùng với 1 props và state render ra cùng 1 giao diện -> trả về cùng 1 jsx
        // -> tuy nhiên ứng dụng thực tế cần gọi api , lưu cache...(side effect) . React cung cấp useEffect tách riêng các side effect ra khỏi quá trình render và sử lí chúng an toàn

        // 2. component mount và unmount 
            // 1. mount (gắn vào) : là lần đầu component được render và gắn vào dom thực của web
                // + xảy ra khi component được thêm cây dom
                // + các useEffect với dependency [] sẽ chạy ngay sau lần đầu này
                // vd : mở web và xuất hiện thanh navbar

            // 2.unmount (gỡ bỏ) : là khi component bị gỡ khỏi dom thực của web
                // + xảy ra khi component không được render nữa 
                // + react chạy hàm cleanup để dọn dẹp nếu có trong useEffect 
                // vd : chuyển trang 1 sang trang 2 thì lúc này các component nằm trong trang 1 bị unmount

            function child(){
                useEffect(() => {
                    console.log('chạy khi component lần đầu được mount');

                    return () => {
                        console.log('chạy khi component bị unmount để dọn dẹpp các component này');
                    }
                }, [])

                return <h1>Hi chào cậu</h1>;
            }

        // 3. hàm cleanup trong useEffect
            // - hàm cleanup là : hàm được return trong callback của useEffect -> sẽ được react gọi ngay trước khi component unmount và gọi nó trước khi chạy lần effect kế tiếp nếu dependencies thay đổi
            // -> cần cleanup để ngăn chặn memory leak và lỗi cập nhật state khi component đã unmount

            // - Lưu ý : khi effect chạy lại do dependency thay đổi , cleanup của effect cũ sẽ chạy trước khi effect mới bắt đầu
            // -> đảm bảo bạn luôn dọn dẹp toàn bộ các listener cũ trước khi listener mới tránh trồng chéo sự kiện

        // 4. Dependency trong useEffect
            // - dependency (phụ thuộc) : là khái niệm quan trọng nhất của useEffect , quyết định khi nào effect được thực thi

            // 1. Dependency là gì ?
            // - là các mảng giá trị mà effect của bạn phụ thuộc vào 
                // + effect chạy lần đầu khi component mount 
                // + sau đó sẽ chạy lại mỗi khi bất kỳ giá trị nào trong mảng dependency thay đổi 

            // 2. Dependency có thể nhận loại dữ liệu nào ?
            // - bất kì giá trị nào được sử dụng bên trong effect và có thể thay đổi theo thời gian đều có thể là dependency 
                // + props , state , biến / hằng số được tính từ props và state
                // + hàm -> cẩn thận vì thường đc tạo lại mỗi lần render
                // + obj/arr -> cẩn thận vì obj/arr mới tạo có tham chiếu khác nhau

            // 3. Trường hợp thực tế cần Dependency 

            // a. mảng rỗng [] : chạy 1 lần khi mount
            // - Dùng khi effect chỉ cần chạy lần duy nhất khi component được render -> không phụ thuộc bất kì thay đổi nào của các giá trị trong component
                // + gọi api lấy ds ban đầu
                // + đăng kí sự kiện toàn cục (resize , scroll ...)
                // + đọc giá trị từ localStorage
                // + khởi tạo thư viện bên thứ 3 (chart , map)
                useEffect(() => {
                    const fetchProducts = async () => {
                        const res = await fetch('...');
                        const data = await res.json();
                        setProducts(data);
                    };
                    fetchProducts();
                } , [])

            // b. có dependency (props ,state) : chạy khi dependency thay đổi 
            // - dùng khi effect cần chạy lại mỗi khi giá trị thay đổi -> phụ thuộc vào sự thay đổi các giá trị trong component
                // + fetch dữ liệu chi tiết khi userId thay đổi -> hiện thị chi tiết thông tin 1 user 
                // + cập nhật document.title
                // + lọc danh sách sản phẩm 
                // + ghi vào localStorage 

                function UserDetail({userId}){
                    const [user , setUser] = useState(null);

                    useEffect(() => {
                        const fetchUser = async () => {
                            const res = await fetch(`/api/users/${userId}`);
                            const data = await res.json();
                            setUser(data)
                        };
                        fetchUser();
                    } , [userId]) // chạy lại effect mỗi khi userId thay đổi
                }
            
            // c. không có dependency (bỏ qua tham số thứ 2) : chạy mỗi lần render
            // - hiếm khi dùng thường chỉ dùng để debug 
                
            // 4. Lưu ý 
            // - Nếu bạn sử dụng biến bên trong effect mà biến đó được khai báo bên ngoài effect thì phải đưa biến đó vào dependency trừ khi chắc chắn biến đó không đổi
            
// - Review (tiếp) : 

    // - useEffect là gì ? sử dụng đề giải quyết vấn đề nào của react ? và sử dụng trong các trường hợp nào ? 
        
        // - useEffect là gì : là một hàm đã được định nghĩa của react , sử dụng thông qua import trong thư viện react
            // + cú pháp : 
            import {useEffect} from 'react';
            function MyCom(){
                useEffect(() => {
                    // định nghĩa code chạy trong hàm callback
                    return () =>{
                        // định nghĩa code chạy trong hàm cleanup
                    }
                } , [])// định nghĩa các phần tử nằm trong mảng dependencies
            } 

        // - useEffect giải quyết vấn đề nào của react : vấn đề xảy ra khi định nghĩa component theo dạng hàm pure (thuần khiết) lúc này
        // hàm chỉ trả về kết quả dựa trên props và state không bị ảnh hưởng bởi side effect nhưng trong thực tế khi định nghĩa 1 component
        // cần phải giao tiếp với bên ngoài vd : gọi api , ghi/đọc localStorage... nên cần phải có 1 hàm giải quyết việc giao tiếp này với bên ngoài.
            
            // + tại sao lại không viết trực tiếp side effect trong thân component mà phải viết trong hàm useEffect 
            // -> vì các side effect này chỉ cần chạy 1 lần hoặc chạy khi có các giá trị trong component nó phụ thuộc thay đổi thì mới chạy lại
            // nên khi đặt side effect trực tiếp trong component mỗi lần re-render thì đều chạy lại gây lãng phí tài nguyên.

            // + side effect là : những ảnh hưởng không gây tác động tới UI (giao diện hiện thị cho người dùng) gây ảnh hưởng tới bên ngoài component
            // -> ảnh hưởng bên ngoài : đọc ghi localStorage , tạo api kết nối vs server , các hàm bất đồng bộ setTimeout setInterval , sự kiện trực tiếp với DOM 

        // - useEffect sử dụng trong các trường hợp nào 
        // -> luồng hoạt động của useEffect là chạy sau khi component render xong 

            // 1. side effect chỉ chạy 1 lần đầu tiên không phụ thuộc vào giá trị trong component 
            // - Để dependency là 1 mảng rỗng , side effect định nghĩa trong hàm callback sau đó gọi nó luôn , có thể định nghĩa hàm cleanup trong vài trường hợp cần dọn dẹp
            // -> sau khi component được mount (gắn vào DOM) useEffect sẽ chạy và khi bị unmount (gỡ khỏi DOM) cleanup sẽ chạy

            // 2. side effect có thể chạy nhiều lần phụ thuộc vào giá trị thêm vào dependency
            // - Thêm các giá trị mà side effect phụ thuộc vào mảng dependency có thể bất kì giá trị nào nằm trong pham vi component , có thể định nghĩa cleanup
            // -> chạy lần đầu khi component mount và chạy lần sau khi 1 trong các giá trị phụ thuộc thay đổi , trước khi chạy các lần mới hàm cleanup sẽ được gọi để dọn dẹp lần cũ nếu có

            // 3. side effect chạy mỗi lần re-render chỉ dùng đề debug
            // -> không thêm tham số t2 là mảng dependency 

        
