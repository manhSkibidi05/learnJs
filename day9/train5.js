// Cấp độ 4 : Tổng hợp và nâng cao 

// Bài 9: Hàng đợi với Concurrency (Giới hạn số lượng request song song)
// Đề Bài : viết hàm fetchWithConcurrency(urls , concurrency) , + Nhận mảng các url và số lượng tối đa duyệt cùng lúc 
// + dùng async/await kết hợp sliding window (hoặc Promise.all + hàng đợi) + trả về kq JSON theo thứ tự urls 
// + nếu 1 url lỗi -> toàn bộ hàm reject (hoặc nâng cao : tiếp tục nhưng đánh dấu lỗi)

    // deepSeek 

    async function fetchWithConcurrency(urls, concurrency) {
        const results = new Array(urls.length);
        let index = 0;          
        let activePromises = 0; 

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

    