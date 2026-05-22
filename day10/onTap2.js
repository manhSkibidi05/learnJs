// Ôn tập mục 2 : DOM Manipulation (Tạo , xóa , cập nhật phần tử và sự kiện )

    // - DOM (document object model) là giao diện cho phép JS tương tác với HTML . Bạn có thể thay đổi cấu trúc , nội dung , kiểu dáng của 
    // trang web 1 cách động 

    // 1. Chọn phần tử (Selecting elements)
    // - Trước khi thao tác bạn cần lấy các phần tử HTML cần xử lý 

    document.getElementById(`id`); // -> lấy phần tử dựa trên id 

    document.querySelector(`.class`); // -> lấy phần tử đầu tiên dựa trên css selector (.class , #id ...) cách gọi phần tử trong css
    
    document.querySelectorAll(`.class`); // -> lấy tất cả phần tử trả về 1 mảng dựa trên css selector 

    // 2. Tạo phần tử mới (Creating elements)
    // - Sử dụng để tạo phần tử HTML mới sau đó sẽ thêm thuộc tính và nội dung 

    document.createElement(`a`); // -> tạo ra 1 thẻ bất kì của HTML trong js

    parent.appendChild(`a`); // -> thêm 1 phần tử bất kì vào trong khối parent được định nghĩa trước đó
    
    parent.append(`a`); // -> thêm 1 phần tử bất kì vào cuối chuỗi parent 

    // 3. Xóa phần tử (Removing elements)

    element.remove(); // -> xóa trực tiếp phần tử đang sử dụng phương thức 

    parent.removeChild(`child`); // -> xóa 1 phần tử con nằm trong khối parent rồi trả về nó 

    // 4. Cập nhật phần tử (Updating elements)
    // 4.1. Thay đổi nội dung

    element.textContent = `new text`; // -> chỉ tác động đến nội dung của 1 phần tử html

    element.innerHTML = ``; //-> tác động toàn bộ thẻ html trong của element 

    element.innerText = ``; // -> gần giống textContent có tác động lên css

    // 4.2. Thay đổi thuộc tính 
    // - Cú pháp tổng quan : tên-phần-tử.tên-thuộc-tính = `giá trị mới của thuộc tính`;

    element.getAttribute(`tên thuộc tính`) // -> lấy giá trị 1 thuộc tính của phần tử
    element.setAttribute(`tên thuộc tính` , `giá trị thuộc tính`); // -> phương thức này giúp tác động lên thuộc tính bất kì của 1 phần tử 

    // 5.Sự kiện (Events)
    // - Sự kiện cho phép phản ứng khi người dùng tương tác (click , nhập , di chuột...)

    button.addEventListener(`click` , (e) => {

    })
    // -> phương thức này giúp thêm sự kiện cho 1 phần tử bao gồm 2 đối số cần truyền vào : hành động của phần tử , hàm thực thi khi sự kiện diễn ra 
    
    // - Đối tượng event -> là đối số truyền vào khi định nghĩa hàm thực thi sự kiện 
    button.addEventListener(`scroll` , (e) => {
        e.preventDefault() // ngăn chặn hành vi mặc định của 1 phần tử khi diễn ra sự kiện 
        e.stopPropagation() // ngăn chặn sự kiện nổi bọt lên phần tử cha 
    })
    
    // - DOM manipulation là cácc thao câu lệnh trong js thao tác tới các phần tử của html (lấy , xóa , cập nhật và sự kiện )
    // + lấy phần tử : Thông qua các phương thức của DOM có thể lấy phần tử của html . vd : querySelector(`css selector`)
    // + tạo phần tử : Có thể tạo các phần tử HTML thông qua js bằng phương thức createElement(`thẻ`) -> sau đó thêm các thuộc tính và nội dung vd: className = `tên class`
    // + xóa phần tử : sử dụng phương thức remove() tự xóa phần tử 
    // + cập nhật : có thể cập nhật về thuộc tính , dữ liệu hiển thị cho 1 phần tử thông qua js.
        // -> cập nhật thuộc tính sử dụng dấu chấm .+thuộc tính = `nội dung sửa` , chỉnh sửa dữ liệu hiện thị = textContent() , innerHTML() 
    // + sự kiện : sử dụng addEventListener() để gán sự kiện cho 1 phần tử -> hàm đó cần truyền vào 2 đối số là hành động vd : click , mouseout .. , hàm callback sẽ 
    // được gọi lại khi hành động diễn ra. Hàm callback có thể truyền vào đối số e (event) để sử dụng các thuộc tính và phương thức có sẵn của đối tượng event

