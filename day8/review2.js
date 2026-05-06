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
            // -> các phương thức này phù hợp cho việc xử lí nhiều Promise 1 lúc giúp tăng số lượng thao tác bất đồng bộ trong 1 lần gọi 

                // - Promise.all() : đầu vào nhận tham số là 1 mảng các Promise đang ở trạng thái pending -> đầu ra là 1 mảng các Promise reject/resolve sau khi mà then 
                // nhận đầu ra đó nếu tất cả Promise đều resolve chạy hàm callback then nếu chỉ 1 Promise reject -> chạy hàm callback của catch

                // - Promise.allSetlled() : đầu vào nhận tham số là 1 mảng các Promise ở trạng thái pending, đầu ra là 1 mảng các Promise reject/resolve then nhận 
                // kết quả trả về đó chạy tất cả các Promise có trong mảng kể cả resolve hay reject 

                // - Promise.race() : đầu vào nhận tham số là 1 mảng các Promise ở trạng thái pending , đầu ra là 1 Promise ở trạng thái fulfilled/rejected 
                // -> đây là Promise chạy nhanh nhất -> thời gian bất đồng bộ ít nhất 

                // - Promise.resolve() và Promise.reject() : đầu vào là 1 tham số với giá trị bất kì , đầu ra là 1 Promise ở trạng thái fulfilled/rejected 
                // -> tạo ngay 1 Promise mang sẵn giá trị 

        // Fetch API đối với Promise 
        // - Fetch(url) : là 1 hàm lấy dữ liệu từ 1 trang web thông qua đường dẫn url được truyền vào làm tham số của hàm -> kết quả trả về của hàm là 1 Promise của 1 đối
        // tượng response 

        // - Đối tượng response được khởi tạo khi lấy dữ liệu của trang web thông qua fetch -> là kết quả trả về thông qua hàm đó Promise của response

        // - then nhận kết quả trả về của fetch đó -> chính là 1 đối tượng response :
            // + lúc này response chỉ là phần header của trang web và chỉ mang trạng thái của trang web chưa chứa phần nội dụng
            // + muốn lấy phần nội dung của web phải thông qua các phương thức của response : json() , text() , blob() 
            // -> đây chính là thao tác bất đồng bộ vì phải tốn thời gian đọc trang web và chuyển đổi dữ liệu của nó sang dạng js có thể đọc được 
            // + sau khi mà chuyển hóa dữ liệu đọc được lấy then để in dữ liệu và catch để bắt lỗi nếu có 
                
        // hàm thử lại với Promise -> nếu qua số lần quy định sẽ lỗi
        // với 2 tham số truyền vào : url (đường dẫn kết nối của fetch) , maxRetries (số lần thử tối đa)
        function fetchWithRetry(url , maxRetries){
            // hàm sẽ trả về 1 Promise -> nhận resolve nếu thành công và reject nếu thất bại 
            return new Promise((resolve , reject) =>{
                // tạo biến count bên ngoài hàm đệ quy -> đếm số lần thử do biến này có thể giữ cho kết quả do các hàm khác thay đổi dựa vào đặc tính closure của hàm
                let count = 1;

                // hàm đệ quy -> có thể gọi lại hàm này nếu xảy ra lỗi
                function recursive(){
                    // base case : kiểm tra số lần thử đã vượt qua giới hạn chưa -> nếu rồi hàm trả về reject cho Promise kết thúc hàm 
                    if(count > maxRetries) return reject(`Lỗi do kết nối thất bại ${maxRetries} lần`);
                    // kết nối đường dẫn bằng fetch
                    fetch(url)
                        // kết nối trả về Promise của response : là 1 đối tượng đại diện cho trang web đã kết nối đến
                        .then(response => {
                            // ban đầu chỉ kết nối phần header -> kiểm tra kết nối nếu không thành công ném ra lỗi cho catch
                            if(!response.ok) throw new Error(`lỗi do ${response.status}`);
                            else{
                                // nếu thành công -> lấy dữ liệu phần thân của web bằng các phương thức đọc và parse dữ liệu tùy vào loại dữ liệu json() , text() , blob()
                                return response.json();
                            }
                        })
                        // nếu kết nỗi thành công -> then sẽ bắt và trả về resolve(giá trị vừa được lấy) kết thúc hàm 
                        .then(result => resolve(result))
                        .catch(error => {
                            // kết nối thất bại -> in ra số lần thử và lỗi của kết nối
                            console.log(`kết nối thất bại lần thứ ${count} và ${error.message}`);
                            // tăng biến đếm số lần thử
                            count++;
                            // setTimeout -> đưa hàm đệ quy thử lại , sau 1s hàm recursive sẽ được gọi lại nên 
                            // setTimeout có 2 tham số : địa chỉ của hàm và thời gian bất đồng bộ 
                            // lúc này setTimeout tham chiếu tới địa chỉ của hàm và sau thời gian quy định -> hàm sẽ chạy  
                            setTimeout(recursive , 1000);
                        })
                } 
                // gọi hàm lần đầu 
                recursive();
            })
        }
        
        // sau khi truyền dữ liệu vào tham số -> hàm trả về 1 Promise resolve/reject tùy thuộc vào dữ liệu truyền vào sẽ thay đổi kết quả 
        fetchWithRetry(`https://jsonplaceholder.typicode.com/users/12` , 3)
            .then(result => console.log(result))
            .catch(error => console.log(error))
                

        
