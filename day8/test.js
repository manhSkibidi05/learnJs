let p1 = new Promise((resolve , reject)=>{
        setTimeout(()=>{
            resolve(10);
        },2000);
    });

    let p2 = new Promise((resolve , reject)=>{
        setTimeout(()=>{
            resolve(20);
        },1200);
    });
    
    let p3 = new Promise((resolve , reject)=>{
        setTimeout(()=>{
            // resolve(30);
            reject(`error 404`);
        },1000);
    });

    Promise.all([p1 , p2 , p3])
        .then(([num1 , num2 , num3])=>{
            console.log(num1);
            console.log(num2);
            console.log(num3);
        })
        .catch(error=> console.log(error));

    Promise.allSettled([p1 , p2 , p3])
        .then(results => {
            results.forEach((value , index)=>{
                if(value.status === `fulfilled`){
                    console.log(`Promise ở vị trí ${index} có thành công = ${value.value}`);
                }else{
                    console.log(`Promise ở vị trí ${index} thất bại = ${value.reason}`);
                }
            })
        })

    Promise.race([p1 , p2 , p3])
        .then(result => {
            console.log(`thắng cuộc ${result}`);
        })
        .catch(error => console.log(error));

    Promise.resolve(36).then(value => console.log(value));

    Promise.reject(`adu vip 123`).catch(error => console.log(error));