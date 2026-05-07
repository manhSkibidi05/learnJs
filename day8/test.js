const p1 = new Promise((resolve , reject) => {
        setTimeout(() => {
            resolve(`OK1`)
        },1000)
    });
    
    const p2 = new Promise((resolve , reject) => {
        setTimeout(() => {
            resolve(`Error2`)
        },1000)
    }); 

    const p3 = new Promise((resolve , reject) => {
        setTimeout(() => {
            resolve(`OK3`)
        },1500)
    }); 

let arrP = [p1 , p2 , p3];
    // Promise.all(arrP).then(results => {
    //     results.forEach(result => console.log(result.status))
    // }).catch(error => console.log(error));

    function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        let results = [];
        let completed = 0;
        promises.forEach((promise, index) => {
            promise.then(value => {
                results[index] = value;
                completed++;
                if (completed === promises.length) resolve(results);
            }).catch(reject);
        });
    });
}

    promiseAll(arrP).then(results => {
        results.forEach(result => console.log(result))
    }).catch(error => console.log(error))