// Cách sử lí với bất đồng bộ cũ : sử dụng hàm callback 

    // - cách hoạt động : callback đóng vai trò như 1 kết quả trả về cuối cùng sau khi thao tác bất đồng bộ diễn ra xong
    // -> callback vừa có thể trả về kết quả và vừa có thể trả về lỗi 

    // vd : 
    // hàm sử lí bất đồng bộ = callback
    // hàm nhận tham số là dữ liệu đầu vào và 1 hàm callback
    function task1(intitialValue , callback){
        // thao tác bất đồng bộ -> diễn ra sau 1s
        setTimeout(()=>{
            // thay đổi dữ liệu
            intitialValue + 10;
            // kiểm tra lỗi 
            if(!intitialValue){
                // nếu lỗi truyền tham số là lỗi vào hàm callback -> callback dựa vào đó sẽ trả về lỗi 
                callback(`lỗi` , null)
            }else{
                // nếu không lỗi truyền kết quả vào hàm callback -> callback dựa vào đó trả về kq
                callback(null , intitialValue)
            }
        },1000)
    }

    // gọi hàm bất đồng bộ -> truyền dữ liệu vào hàm , định nghĩa hàm callback sau khi nhận dữ liệu sẽ trả về lỗi hoặc đáp án
    task1(0 , (err , result)=>{
        if(err) console.log(err);
        else console.log(result);
    })

// Cách sử lí với bất đồng bộ mới : sử dụng Promise

    // - Promise là 1 object đặc biệt sẽ khởi tạo dữ liệu nhưng dữ liệu chưa tồn tại và sẽ tồn tại trong tương lai và được trả về bởi các phương thức của Promise
    // - trạng thái của Promise : pending : đang chờ dữ liệu , Fulfilled : dữ liệu hoàn tất , Rejected : lỗi 
    
    // - khởi tạo 1 Promise :
    // -> với 1 Promise bắt buộc 2 tham số truyền vào là resolve và reject 
    // - có thể gọi 1 trong 2 hoặc cả 2 tham số này dưới dạng hàm và truyền vào dữ liệu sau khi sử lí bất đồng bộ xong

    let a = 10;
    let b = 110;
    const p = new Promise((resolve , reject)=>{
        // thao tác bất đồng bộ
        setTimeout(()=>{
            // kiểm tra dk
            if(a === b){
                // nếu đúng gọi hàm resolve -> trả về kết quả 
                resolve({name : `moy`});
            }else{
                // nếu sai gọi hàm reject -> trả về lỗi 
                reject({name : `nhàn`});
            }
        },1000)
    })

    // nếu gọi p luôn -> p ở trạng thái chờ dữ liệu 
    console.log(p);
    // sử dụng các phương thức của Promise để nhận dữ liệu trả về 
    // then() -> nhận dữ liệu của resolve kết quả đúng 
    // catch() -> nhận dữ liệu của reject lỗi 
    p.then(result => console.log(result)).catch(error => console.log(error));