// các kĩ thuật nâng cao khi sử dụng hàm :

    // - currying : là kĩ thuật chia nhỏ hàm lớn thành các hàm nhỏ mỗi hàm chỉ nhận 1 tham số rồi trả về hàm nhận tham số tiếp theo cho tới khi hết tham số truyền vào
    // của hàm lớn ban đầu
        // - sử dụng khi cần : + chia nhỏ hàm lớn với nhiều tham số
            // + cố định vài tham số khi cần thiết 
            // + phù hợp với function composition (compose và pipe) -> kết hợp các hàm con với 1 tham số truyền vào lại với nhau

            const tamKa = a => b=> c => a * b + c;
            console.log(tamKa(10)(3)(6));

    // - partial application : là kĩ thuật giúp cố định nhiều tham số của 1 hàm khác với currying làm thay đổi cấu trúc 1 hàm thì partial không làm thay đổi cấu trúc hàm
    // và giúp cố định tham số cho hàm đó
        // - sử dụng khi cần : + cố định nhiều tham số của 1 hàm 
            // + tránh lặp lại hàm 
        
            const music = (name , artirst , emoji) => `${name} of ${artirst} ${emoji}`;
            const song = music.bind(null,`em của ngày hôm qua`);
            console.log(song(`sơn tùng`,`$$$`));
            console.log(song(`J97`,`$$$`));

    // - function composition : là kĩ thuật giúp kết hợp các hàm con lại với nhau xử lí 1 dữ liệu ban đầu thông qua 1 quy trình chạy tất cả các hàm con được truyền vào
    // dữ liệu sẽ được tích lũy thông qua tất cả các hàm con đó
        // - sử dụng khi cần : + 1 hàm chỉ làm 1 việc sử dụng kĩ thuật này làm hàm có thể giúp dữ liệu được giữ lại khi đi qua nhiều hàm con
            // + mỗi hàm cũng chỉ nhận 1 tham số -> kết hợp tốt với currying

        // - có 2 kĩ thuật dùng chủ yếu với kĩ thuật này :
        // - pipe : duyệt các hàm con từ trái sang phải -> dữ liệu được tích lũy từ trái qua phải 

            const nhan3 = x => x * 3;
            const congY = y => x => x + y;
            const tru3 = x => x - 3; 

            const pipe = (...fns) => (initialValue) => fns.reduce((value , fnc) => fnc(value) , initialValue);
            const result = pipe(nhan3 , congY(9) , tru3);
            console.log(result(10));

        // - compose : duyệt các hàm con từ phải sang trái -> ngược lại với pipe 

            const compose = (...fns) => (initialValue) => fns.reduceRight((value , fnc) => fnc(value) , initialValue);
            const result2 = compose(nhan3 , congY(9) , tru3);
            console.log(result2(10));

        // -> 2 kĩ thuật pipe và compose cho ra 2 kết quả khác nhau dù có giá trị đầu vào giống nhau 

    // - memoization : là kĩ thuật giúp tối ưu hiệu năng khi sử dụng hàm , lúc này với 1 hàm cùng tham số truyền vào trả về giá trị sẽ được lưu lại đến khi hàm này gọi
    // lại với tham số truyền vào như thế thay vì tốn thời gian chạy hàm đó thì trả về luôn kết quả đã được lưu vào bộ nhớ cache (bộ nhớ đệm)
        // - sử dụng khi cần : + sử dụng nhiều với đệ quy khi lặp lại hàm nhiều lần với tham số giữ nguyên
            