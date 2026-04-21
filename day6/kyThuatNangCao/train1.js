// bài tập thực hành 

// Bài 1 : currying 

// đề bài : Viết hàm curry chuyển đổi hàm bất kỳ thành currying. Sau đó tạo hàm tính diện tích hình chữ nhật currying

    function sHcn(a , b){
        return a * b;
    }

    const sHcnCurrying = a => b => a * b;
    console.log(sHcnCurrying(3)(4));

// Bài 2 : function pipeline 

// đề bài : Viết hàm pipeline nhận một mảng các hàm và thực thi tuần tự. Áp dụng để xử lý chuỗi: viết hoa → thêm dấu ! → đảo ngược.

    const pipeline = (...fns) => (initialValue) => fns.reduce((value , func)=> func(value),initialValue);

    const upper = string => string.toUpperCase();
    const add = string => string + `!`;
    const reverse = string => string.split(``).reverse().join(``);

    const result = pipeline(upper , add ,reverse);
    console.log(result(`fuck idiot`));

// Bài 6 : compose và pipe

// đề bài : Viết compose và pipe. Sử dụng pipe để xử lý mảng: lọc số chẵn, nhân đôi, tính tổng.

    const compose = (...fns) => (initialValue) => fns.reduceRight((value , func) => func(value) , initialValue);

    const locSoChan = numbers => numbers.filter((value)=> value % 2 === 0);
    const nhanDoi = numbers => numbers.map((value) => value * 2);
    const tinhTong = numbers => numbers.reduce((sum , currentValue )=> sum += currentValue , 0);

    const ketQua = compose(tinhTong , nhanDoi , locSoChan);
    console.log(ketQua([3,5,1,2,6,8,10,4,22]))
