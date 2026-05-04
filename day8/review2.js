//  Xử lý đồng bộ và xử lý bất đồng bộ trong js

    // - Xử lý đồng bộ :
        // + là các câu lệnh sẽ lần lượt từ trên xuống dưới được thêm vào call stack để được chạy , sau khi chạy xong lệnh trước thì lệnh sau mới được chạy
        // -> vì js là ngôn ngữ xử lý dữ liệu 1 trên luồng duy nhất 

    // - Xử lý bất đồng bộ : 
        // + là các câu lệnh không được thêm vào call stack để chạy , các lệnh này sẽ được chuyển sang luồng web api để chạy thường các dữ liệu này sẽ gây mất thời
        // gian mới có thể chạy xong -> sau khi thời gian chạy xong sẽ được gửi vào 1 hàng đợi khác lúc này  sẽ phải đợi call stack rảnh thì mới gửi về call stack
        // và chạy lệnh đó được.
        // -> các thao tác bất đồng bộ thường là các thao tác gây mất thời gian để có thể xử lí xong -> nên js gửi các thao tác này sang luồng dữ liệu khác để chạy
        // nó sau khi chạy hết thời gian cần thiết xong gửi lại sang luồng chính đợi call stack không còn lệnh nào chạy thì chạy đến lệnh này 

    // - Các cách xử lý bất đồng bộ : 

    // + sử dụng hàm callback : hàm callback là cơ chế của hàm cho phép gọi lại hàm trong 1 hàm khác trước khi mà định nghĩa hàm đó
        // -> việc sử dụng hàm callback rất hợp lý với các thao tác bất đồng bộ vì sẽ tốn 1 khoảng thời gian mới chạy lệnh của bất đồng bộ nên các hàm chưa cần định nghĩa
        // trước mà sẽ được gọi lại sau 1 khoảng thời gian 
        
        function task1(value , callback){
            console.log(`đang đợi xử lý bất đồng bộ`);
            setTimeout(()=>{
                if(value){
                    callback(null , value);
                }else{
                    callback(`lỗi` , null);
                }
            },1000)
        }

        task1(10 , (err , result)=>{
            if(err) console.log(err);
            else{
                result = result * 10;
                console.log(`xử lý bất đồng bộ thành công...`);
                console.log(result);
            }
        })

        // - hàm callback gọi trong thao tác bất đồng bộ sẽ chưa chạy vì hàm đó chưa được định nghĩa và đợi xong thao tác bất đồng bộ hàm này sẽ được gọi lại khi mà gọi
        // hàm chính định nghĩa hàm callback đó -> hàm callback là hàm sử dụng như 1 tham số trong hàm lớn và được gọi lại sau khi định nghĩa hàm đó và truyền vào hàm lớn 

        // - Ưu điểm dùng hàm callback với bất đồng bộ : 
            // + dễ đọc , dễ hiều code
            // + xử lí khi với ít các thao tác tuần tự nhau 
        // - Nhược điểm dùng hàm callback với bất đồng bộ :
            // + với nhiều các thao tác tuần tự nhau -> gây ra callback hell lùi dòng khiến code khó đọc 
            // + phải tự định nghĩa các thao tác được sử dụng trong bất đồng bộ như all() , race() ..

    // +  Sử dụng Promise() : là 1 đối tượng đặc biệt đại diện cho 1 giá trị sẽ có trong tương lai 
        // - Các trạng thái của 1 đối tượng Promise() : đợi dữ liệu (pending) , dữ liệu hoàn tất (fulfilled) , dữ liệu trả về là 1 lỗi (rejected) 
        // - Định nghĩa 1 Promise() :
        
        let a = 5;
        let b = 6;
        const p = new Promise((resolve , reject)=>{
            setTimeout(()=>{
                if(a + b === 10){
                    resolve(a + b);
                }else{
                    reject(`error 404`);
                }
            },1000);
        });

        // - Khi khởi tạo 1 đối tượng Promise bắt buộc định nghĩa hàm excutor với 2 tham số bắt buộc là resolve và reject
        // -> 2 tham số này là 1 hàm lấy dữ liệu để trả về , với resolve hàm được gọi khi xử lí không gây ra lỗi nhận tham số là kết quả cuối cùng và trả về kết quả đó
        // với reject hàm được gọi khi có lỗi xảy ra nhận tham số là lỗi và trả về lỗi đó 

        console.log(p);

        // -> việc gọi dữ liệu chưa có được định nghĩa bởi Promise này thì sẽ luôn trả về trạng thái pending (đang chờ dữ liệu) : vì lúc này thao tác bất đồng bộ trong
        // Promise chưa chạy xong nên biến p chưa nhận được dữ liệu trả về bởi 2 hàm resolve và reject

        p.then(result => result+10).then(result => console.log(result)).catch(err => console.log(err));

        // - đề nhận dữ liệu được trả về bởi Promise lúc này ta sử dụng 2 phương thức then() và catch() 
            // + then() : phương thức có thể nhận 2 hàm callback với hàm đầu tiên là nhận kết quả từ resolve và hàm thứ 2 nhận kết quả từ reject
            // + catch() : phương thức được xây dựng dựa trên hàm thứ 2 của then() với 1 hàm callback nhận kết quả từ reject 

        // - khi then() và catch() được gọi thì nó đại diện như 1 Promise mới -> các hàm có thể nối tiếp nhau thông qua dấu . thao tác gọi phương thức của 1 đối tượng 
        // -> hàm callback trong then sẽ có thể trả về 1 Promise mới thì lúc này then() phía sau sẽ phải đợi dữ liệu từ Promise do then trước trả về rồi mới chạy 
        // -> catch() sẽ chỉ được chạy khi reject() xảy ra và trả về lỗi trong toàn bộ chuỗi gọi phương thức và thường catch nằm cuối chuỗi đó 

        // - Ưu điểm sử dụng Promise để xử lí bất đồng bộ :
            // + gọi các Promise liên tục tạo thành chuỗi thông qua then() và catch() -> tránh callback hell
            // + xử lí nhiều thao tác tuần tự dễ đọc code 
            // + có các phương thức tĩnh sẵn để sử dụng 

                // Promise.all([]) : tham số là 1 mảng các Promise -> khi then() nhận kết quả là 1 mảng các Promise nếu tất cả là resolve thì chạy hàm callback của then
                // nếu 1 Promise trong mảng là reject -> chạy callback trong catch() trả về cùng 1 lỗi 

                // Promise.allSettled([]) : tham số là 1 mảng các Promise -> chạy tất cả các Promise trong then kể cả là resolve hay reject 

                // Promise.race([]) : tham số là 1 mảng các Promise -> then chỉ nhận 1 Promise duy nhất chạy nhanh nhất resolve trả về sớm nhất nếu là reject cần catch
                
                // Promise.reject() và Promise.resolve() : 2 phương thức có tham số là 1 giá trị bất kì -> tạo ra luôn 1 Promise mang sẵn giá trị lấy ra bằng cách sử dụng
                // then/catch

        // - Fetch API : dữ liệu được lấy về sẽ được trả về là 1 Promise -> có thể xử lí dữ liệu đó then và catch
                
                

        
