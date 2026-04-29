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