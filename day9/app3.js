// 5. Kết hợp Async/Await với Promise - Tuần tự , Song song & Kỹ thuật nâng cao 

    // - Async/Await không thay thế Promise mà cách viết Promise đẹp hơn . Do đó bạn vẫn cần dùng các phương thức tĩnh của Promise như Promise.all , Promise.race 
    // Promise.allSetlled để quản lý nhiều tác vụ bất đồng bộ 1 cách hiệu quả 

    // 5.1. Bản chất của async/await là Promise 
    // - Hàm async luồn trả về Promise , await chờ kết quả trả về từ Promise resolve/reject

    async function getNum(){
        return 10;
    }
    getNum().then(value => console.log(value));

        // const num = await getNum();
        // console.log(num);
    
    // 5.2. Chạy tuần tự (Senquential) với await
    // - Khi tác vụ phụ thuộc lẫn nhau (tác vụ sau phụ thuộc kết quả tác vụ trước) -> chỉ cần viết tuần tự bên trong hàm async và đặt await trước các Promise đề có thể bắt lỗi và nhận kq

    async function sequential(id){
        try{
            const res1 = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const user = await res1.json();
            const idUser = user[`id`];
            const res2 = await fetch(`https://jsonplaceholder.typicode.com/posts/${idUser}`);
            const post = await res2.json();
            const postBody = post[`body`];
            console.log(postBody);
        }catch(err){
            console.log(err);
        }
    }
    sequential(5);
    // -> await tạm dừng phần code phía sau nó trước khi nó hoàn thành việc nhận dữ liệu từ Promise vậy nó sẽ từng bước 1 chạy tuần tự code từ trên xuống dưới 

    // 5.3. Chạy song song (Parallel) với Promise.all + await
    // - Khi các tác vụ độc lập (không phụ thuộc vào nhau ) , bạn nên chạy đồng thời tiết kiệm thời gian 

    async function parallel(){
        try{
            const p1 = new Promise((resolve,reject) => {setTimeout(() => {resolve(`1. con vịt`)},1000)});
            const p2 = new Promise((resolve,reject) => {setTimeout(() => {resolve(`2. con vịt`)},1000)});
            const p3 = new Promise((resolve,reject) => {setTimeout(() => {reject(`3. con cak`)},1000)});

            const results = await Promise.all([p1,p2,p3]);
            console.log(results);
        }catch(err){
            console.log(err);
        }
    }
    parallel();
    // -> các Promise được gán vào biến đều đang ở trạng thái pending sau đó sử dụng Promise.all gom các Promise thành 1 mảng và sử dụng await chờ kết quả của tất cả 
    // Promise trả về nếu tất cả resolve chạy tiếp câu lệnh sau nó , nếu 1 Promise reject -> chạy xuống phần catch 

    // 5.4. Các kỹ thuật nâng cao 
    // - Promise.race : Lấy kết quả nhanh nhất 
    // -> dùng khi bạn cần phản hồi từ tác vụ đầu tiên hoàn thành 

    async function raceExample(){
        const p1 = new Promise((resolve,reject) => {setTimeout(() => {resolve(`1. con vịt`)},1600)});
        const p2 = new Promise((resolve,reject) => {setTimeout(() => {resolve(`2. con vịt`)},1500)});
        const result = await Promise.race([p1 , p2]);
        console.log(`tao có flash : ${result}`)
    }
    raceExample();

    // - Promise.allSettled : Bất chấp thành công hay thất bại 
    // -> khi bạn muốn chờ tất cả các Promise hoàn thành kể cả thành công hay thất bại

    async function allSettledExample(){
        let promises = [
            new Promise((resolve,reject) => {setTimeout(() => {resolve(`1. con vịt`)},1600)}),
            new Promise((resolve,reject) => {setTimeout(() => {resolve(`2. con vịt`)},1500)}),
            new Promise((resolve,reject) => {setTimeout(() => {reject(`3. con cak`)},1000)})
        ]
        const results = await Promise.allSettled(promises);
        results.forEach((val , index ) => {
            if(val.status === `fulfilled`) console.log(`Lời hứa được thực hiện : ${val.value}`);
            else console.log(`Lời hứa thất bại : ${val.reason}`)
        })
    }
    allSettledExample();
    // -> sử dụng phương thức này với await nó sẽ đợi tất  cả các Promise trả về rồi sẽ trả về 1 mảng dựa vào vị trí ban đầu mảng truyền vào bất
    // kể Promise resolve hay reject 

    // - Xử lý lỗi chi tiết khi kết hợp 
    // - Giới hạn concurrency (chạy tối đa N tác vụ cùng lúc)
    