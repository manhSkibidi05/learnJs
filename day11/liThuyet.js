// Ngày 11 : Template Literals (Backticks) - Nắm vững trước khi học React 

// - Mục tiêu 
    // + Hiểu cú pháp ${variable} để nội suy biểu thức 
    // + Tạo chuỗi nhiều dòng dễ đọc 
    // + Ứng dụng tạo class name , style inline , HTML template động 
    // + Làm quen với các kỹ thuật nâng cao (tagged template)

// 1. Template Literals là gì ? 

    // - template literals : là chuỗi được bao bởi dấu backtick `` thay vì dấu nháy đơn hay nháy kép . Cho phép chúng ta :
    // + nội suy biểu thức ${num}
    // + chuỗi nhiều dòng : không cần dùng \n hay nối chuỗi 
    // + chứa cả biểu thức phức tạp : gọi hàm , toán tử , ternary 

// 2. Nội suy biểu thức (interpolation) 

    // - bên trong ${} bạn có thể đặt bất kì biểu thức Js nào hợp lệ

    let a = 10;
    let b = 26;
    console.log(`Tổng : ${a + b}`);
    console.log(`Lớn nhất : ${Math.max(a , b)}`);

    let isDarkMode = true;
    console.log(`Trạng thái hiện tại ${isDarkMode ? 'tối' : 'sáng'}`);

    const muti = (x , y) => x * y;
    console.log(`Phép nhân : ${muti(a , b)}`);

    // -> Các biểu thức phải trả về 1 giá trị bất kì 

// 3. Chuỗi nhiều dòng (muti-line strings)

    // - cách nối chuỗi cần xuống dòng cũ : 
    let html = '<div> \n'+
                ' <h1>hi</h1> \n'+
                '</div>';

    // - cách nối sau es6
    let html = `<div class="total mt-5">
            <ul class="flex justify-between bg-gray-100 p-2 rounded-md">
                <li class="total-list">Tổng : 0</li>
                <li class="total-list-done">Hoàn thành : 0</li>
                <li class="total-list-wait">Chưa làm : 0</li>
            </ul>
        </div>`;

    // -> sử dụng dấu backtick giúp đoạn chuỗi trở nên linh hoạt hơn tùy ý xuống dòng 

// 4 . Ứng dụng trong react (Quan trọng)
    // 4.1. Tạo className động 

    const isDarkMode = true;
    const className = `btn ${isDarkMode ? 'btn-dark' : 'btn-light'}`;
    // -> tùy vào trạng thái của web sẽ thay đổi class của các phần tử 

    // 4.2. Tạo style inline động

    const primaryColor = '#007bff';
    const buttonStyle = `
        background-color: ${primaryColor};
        color: white;
        padding: 10px;
    `;
    // Có thể dùng trong React: <button style={{...}}> nhưng style object thì dùng spread

    // 4.3. Tạo html template từ dữ liệu 

    const products = [
        {id : '1' , name : 'come' },
        {id : '2' , name : 'my' },
        {id : '3' , name : 'way' },
    ]

    const listMusic = `
        <ul>
            ${products.map(prd => `<li>${prd['name']}</li>`).join('')}
        </ul>`
    ;
    // -> sử dụng hàm map() của arr để tạo ra 1 mảng mới dựa trên giá trị mảng cũ , thay đổi thành mỗi giá trị trong mảng mới là 1 thẻ li với content là 
    // tên của prd . sau đó dùng hàm join() chuyển các phần tử trong mảng thành chuỗi 

    // 4.4 Tagged template (nâng cao)

    function highlight(strings, ...values) {
        let result = '';
        strings.forEach((str, i) => {
            result += str + (values[i] ? `<strong>${values[i]}</strong>` : '');
        });
        return result;
    }
    const name = 'An';
    const message = highlight`Xin chào, ${name}!`;
    console.log(message); // Xin chào, <strong>An</strong>!

    // Bài tập thực hành 