// Cấp độ 4 : Tổng hợp và nâng cao 

// Bài 9: Hàng đợi với Concurrency (Giới hạn số lượng request song song)
// Đề Bài : viết hàm fetchWithConcurrency(urls , concurrency) , + Nhận mảng các url và số lượng tối đa duyệt cùng lúc 
// + dùng async/await kết hợp sliding window (hoặc Promise.all + hàng đợi) + trả về kq JSON theo thứ tự urls 
// + nếu 1 url lỗi -> toàn bộ hàm reject (hoặc nâng cao : tiếp tục nhưng đánh dấu lỗi)

    // deepSeek - Cách 1 : 

    async function fetchWithConcurrency(urls, concurrency) {
        const results = new Array(urls.length); 

        // Hàm xử lý một URL
        async function processUrl(i) {
            try {
                const response = await fetch(urls[i]);
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const data = await response.json();
                results[i] = data;
            } catch (err) {
                // Nâng cao: có thể reject toàn bộ hoặc lưu lỗi
                throw new Error(`Lỗi tại ${urls[i]}: ${err.message}`);
            }
        }

        // Hàng đợi chạy concurrency promise cùng lúc
        const queue = [];
        for (let i = 0; i < urls.length; i++) {
            const promise = processUrl(i).finally(() => {
                const pos = queue.indexOf(promise);
                if (pos !== -1) queue.splice(pos, 1);
            });
            queue.push(promise);
            if (queue.length >= concurrency) {
                await Promise.race(queue);  
            }
        }

        // Đợi tất cả promise còn lại
        await Promise.all(queue);
        return results;
    }

    // Test
    const urls = [
        'https://jsonplaceholder.typicode.com/users/1',
        'https://jsonplaceholder.typicode.com/users/2',
        'https://jsonplaceholder.typicode.com/users/3',
        'https://jsonplaceholder.typicode.com/users/4',
        'https://jsonplaceholder.typicode.com/users/5'
        
    ];
    // fetchWithConcurrency(urls, 2)
    //     .then(results => console.log(results))
    //     .catch(err => console.error(err.message));

    // human - Cách 1 : 

    async function fetchWithConcurrency2(urls , concurrency){
        let results = Array(urls.length);

        async function fetchUrl(index){
            try{
                let response = await fetch(urls[index]);
                if(!response.ok) throw new Error(`Lỗi tại ${response.status}`);
                let value = await response.json();
                return results[index] = value;
            }catch(err){
                throw new Error(`Lỗi của đường dẫn ${urls[index]} : ${err.message}`)
            }
        }

        let queue = [];
        for(let i = 0 ; i < urls.length ; i++){
            let promise = fetchUrl(i).finally(() => {
                let pos = queue.indexOf(promise);
                queue.splice(pos , 1);
            })

            queue.push(promise);
            if(queue.length >= concurrency) await Promise.race(queue);
        }
        await Promise.all(queue);
        return results;
    }

    fetchWithConcurrency2(urls , 3)
        .then(results =>{
            for(let rs of results){
                console.log(rs[`name`]);
            }
        })
        .catch(err => console.log(err.message));

// Bài 10 : Auto-save với debounce + async/await
// Đề bài : Khi người dùng ngừng gõ sau 1s -> tự động lưu nội dung lên server 
// Viết hàm auto-save dùng async/await giả lập gửi request (sử dụng setTimeout 500ms) , kết hợp debounce để chỉ gọi khi người dùng ngừng gõ 
    

    function debounce(func , delay){
        let idSetTimeout;
        return function(...args){
            clearTimeout(idSetTimeout);
            idSetTimeout = setTimeout(() => {
                func.apply(this , args);
            },delay)
        }
    }
    
    async function saveToServer(content){
        console.log(`Đang chuẩn bị lưu dữ liệu`);
        await new Promise(resolve => setTimeout(resolve , 500));
        console.log(`Lưu thành công : ${content}`);
    }

    // Auto-save với debounce
    const autoSave = debounce(async (content) => {
        if (content.trim() === '') return;
        await saveToServer(content);
    }, 1000);

// Bài 11 : load ảnh lazy với async/await và giới hạn concurrency

    async function loadImgConcurrency(imgs , concurrency){
        let results = Array(imgs.length);

        async function loadImg(index){
            try{
                let res = await fetch(imgs[index]);
                if(!res.ok) throw new Error(`Lỗi ${res.status}`);
                let value = await res.json();
                return results[index] = value;
            }catch(err){
                throw new Error(`Lỗi tại đường dẫn ${imgs[index]} : ${err.message}`);
            }
        }

        let queue = [];
        for(let i = 0 ; i < imgs.length ; i++){
            let promise = loadImg(i).finally(() => {
                let pos = queue.indexOf(promise);
                if(pos !== -1) queue.splice(pos , 1);
            });
            queue.push(promise);
            if(queue.length >= concurrency) await Promise.race(queue);
        }
        await Promise.all(queue);
        return results;
    }

    loadImgConcurrency(urls , 3).then(rs => console.log(rs)).catch(err => console.log(err))
    