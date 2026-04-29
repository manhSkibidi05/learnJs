// NGÀY 8 : PROMISE VÀ FETCH API - THOÁT KHỎI CALLBACK HELL

// * MỤC TIÊU NGÀY 8 :
    // 1. hiểu promise là gì tại sao cần nó ?
    // 2. biết tạo promise và xử lí thành công/thất bại 
    // 3. thành thạo chuỗi promise (.then().catch())
    // 4. sử dụng Promise.all , Promise.race , Promise.allSettled
    // 5. kết hợp với Fetch API để gọi dữ liệu từ server thật
    // 6. chuyển đổi callback sang Promise

// 1 . Promise là gì ? tại sao cần nó ?

    // 1.1. Vấn đề của callback (callback hell)
    // - callback khi có nhiều task lồng nhau task sau phụ thuộc vào task trước -> code trở nên lồng nhau sâu khó đọc và sửa lỗi 
    // vd :

    function task1(arr , callback){
        setTimeout(()=>{
            if(Array.isArray(arr)){
                arr = arr.filter((value)=> value.length === 6);
                callback(null , arr);
            }else{
                callback(`lỗi mảng` , null);
            }
        },1000)
    }

    function task2(arr , callback){
        setTimeout(()=>{
            if(Array.isArray(arr)){
                arr = arr.map((value)=> value.toUpperCase());
                callback(null , arr);
            }else{
                callback(`lỗi mảng` , null);
            }   
        },1000)
    }

    function tuanTu( tasks , arrInitial , finalCallback){
        let count = 0;
        let arrCurrent = arrInitial;

        function tuanTuDeQuy(){
            if(count === tasks.length - 1){
                finalCallback(null , arrCurrent);
                return;
            }

            let task = tasks[count];
            task(arrCurrent , (err , result)=>{
                if(err){
                    finalCallback(`lỗi mảng` , null);
                    return;
                }
                arrCurrent = result;
                count++;
                tuanTuDeQuy();
            })
        }

        tuanTuDeQuy();
    }

    let tasks = [task1 , task2];
    let arrFood = [`mango` , `bimbim` , `dragon` , `ace`];
    tuanTu(tasks , arrFood , (err , result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result)
        }
    } );

    // - lưu ý : + hàm callback được gọi trước khi được định nghĩa -> các hàm callback lúc gọi có thể nhận các tham số  
        // + sau khi hàm callback được gọi lại lúc này dựa trên các tham số truyền vào bắt đầu định nghĩa hàm callback xử lí các tham số đó 
        // + hàm callback sẽ trả về kết quả cuối cùng sau khi được tính toán nên với hàm bất đồng bộ sử dụng callback -> không sử dụng return 

    // -> promise ra đời để giải quyết vấn đề này bằng cách cho phép chuỗi các tác vụ một cách tuyến tính dễ đọc 

    // 1.2. Promise là gì ? 

    // - Promise là 1 đối tượng đại diện cho kết quả của 1 tác vụ bất đồng bộ -> kết quả chưa có ngay lúc khởi tạo nhưng sẽ có trong tương lai

    // - Promise có 3 trạng thái : 
        // + Pending (đang chờ) : chưa hoàn thành , cũng chưa thất bại
        // + Fulfilled (thành công) : tác vụ hoàn thành tốt đẹp , có kết quả 
        // + Rejected (thất bại) : tác vụ xảy ra lỗi 

// 2 . tạo và sử dụng Promise cơ bản 
    // 2.1. tạo Promise

    const myPromise = new Promise((resolve , reject)=>{
        // logic bất đồng bộ ...
    })

    console.log(myPromise instanceof Promise) // true

    // vd : 

    const p1 = new Promise((resolve , reject)=>{
        resolve(`done`);
        // khi thành công gọi tham số resolve
    })

    const p2 = new Promise((resolve , reject)=>{
        reject(`fail`);
        // khi thất bại gọi tham số reject
    })

    const p3 = new Promise((resolve , reject)=>{
        // không gọi gì -> p3 sẽ ở trạng thái pending chờ dữ liệu 
    })

    const p4 = new Promise(()=>{});
    // thiếu tham số sẽ gây lỗi
    
    // -> bắt buộc có 2 tham số trong hàm executor của Promise nhưng việc gọi 2 tham số đó là không bắt buộc
    // -> thông thường gọi resolve(value) khi thành công và reject(reason) khi thất bại 

    // 2.2. Các phương thức của Promise .then() .catch() .finally()

    // - Các phương thức này trả về một Promise mới , cho phép bạn xâu chuỗi (chain) . Chúng đăng ký các callback để xử lý khi Promise gốc thay đổi trạng thái  

        // .then( onFulfilled , onRejected)
        // - then nhận 2 callback (tùy chọn) :
            // + onFulfilled được gọi khi Promise thành công (resolve) -> nhận giá trị kết quả
            // + onRejected được gọi khi Promise thất bại (reject) -> nhận lý do lỗi 
        // -> nếu bạn chỉ quan tâm đến thành công chỉ truyền callback đầu , nếu chỉ quan tâm đến  lỗi bạn có thể truyền null hoặc dùng .catch()
        
        p1.then(
            value => console.log(`thành công : ${value}`),
            error => console.log(`thất bại : ${error}`)
        )

        // - Điều quan trọng : .then() trả về 1 Promise mới , giá trị resolve của Promise mới là giá trị trả về từ callback (nếu callback trả về giá trị không phải 
        // Promise , nó sẽ được bọc thành Promise.resolve) . Nếu callback trả về 1 Promise , Promise đó sẽ chờ và kết quả của nó quyết định Promise mới 

        p2.resolve(2).then(x => x * 2 ).then(x => console.log(x)) // x = 4 

        // .catch(onRejected) 
            // + là cú pháp ngắn gọn của .then(null , onRejected)
            // + chỉ sử lý trường hợp Promise bị reject 
            // + nên đặt .catch() ở cuối chuỗi để bắt lỗi từ bất kỳ bước nào trong chuỗi 

        fetchUser(1)
            .then(user => getUserPosts(user.id))
            .then(posts => console.log(posts))
            .catch(error => console.error("Có lỗi xảy ra:", error));

        // .finally(onFinally)
            // + luôn được thực thi khi Promise kết thúc dù thành công hay thất bại 
            // + không nhận tham số -> không biết kết quả hay lỗi 
            // + dùng để dọn dẹp : tắt loading , đóng kết nối , log hành động 
            // + .finally() trả về một Promise mới thường là Promise gốc (kh thay đổi giá trị) , nhưng nếu callback onFinally trả về 1 Promise 
            // nó sẽ chờ Promise đó trước khi chuyển tiếp kết quả 

            let loading = true;
            fetchData()
                .then(data => render(data))
                .catch(err => showError(err))
                .finally(() => {
                    loading = false;
                    console.log("Hoàn thành (dù thành công hay thất bại)");
                });

        // 4 . quy trình hoạt động

        const p = new Promise((resolve , reject)=>{
            console.log(`1 . excutor chạy ngay`);
            setTimeout(()=>{
                console.log(`2 . sau 1 giây , resolve`);
                resolve(`giá trị`);
            },1000);
        });

        console.log(`3 . promise vừa tạo ${p}`);

        p.then(value => {
            console.log(`4 . nhận được ${value}`);
            return `giá trị mới`;
        }).then(newVal => console.log(`5. chuỗi then ${newVal}`));

        // 5. tổng hợp kiến thức 

        // + Promise : là một đối tượng đại diện cho kết quả sẽ có trong tương lai 
        // + pending , fufilled , rejected : trạng thái của Promise lần lượt đang chờ kết quả , kết quả hoàn tất , kết quả lỗi 
        // + resolve , reject : 2 tham số băt buộc truyền vào hàm excutor của Promise -> sau khi sử lí bất đồng bộ resolve() trả về kết quả , reject() trả về lỗi
        // + then() : nhận kết quả của resolve và trả về 1 Promise mới với resolve là kết quả trả về của callback thực thi trong then
        // + catch() : nhận kết quả của reject() trả về 1 Promise 
        // + finally() :  không nhận kêt quả trả về 1 Promise -> sử dụng dọn dẹp kể cả kết quả là lỗi hay không lỗi 