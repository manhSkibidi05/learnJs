let urls = [`https://jsonplaceholder.typicode.com/users/1`,`https://jsonplaceholder.typicode.com/users/21` , `https://jsonplaceholder.typicode.com/users/6` ,
        `https://jsonplaceholder.typicode.com/users/5`, `https://jsonplaceholder.typicode.com/users/52`
    ];

    // function fetchUrl(url){
    //     return new Promise((resolve , reject) => {
    //         fetch(url)
    //             .then(res => {
    //                 if(!res.ok) throw new Error(`lỗi`);
    //                 return res.json();
    //             })
    //             .then(val => resolve(val))
    //             .catch(err => reject(err));
    //     })
    // }

    function fetchUrl(url) {
        return fetch(url)
            .then(res => {
                if (!res.ok) throw new Error(`lỗi`);
                return res.json();
            });
    }

    async function filterUrl(arr){
        let arrFetch = arr.map(url => fetchUrl(url))
        let results = await Promise.allSettled(arrFetch);
        let urlSuccess = [];
        let urlFailed = [];
        results.forEach((result , index) => {
            if(result.status === `fulfilled`) urlSuccess.push(arr[index]);
            else urlFailed.push(arr[index]);
            
        })
        console.log(urlSuccess);
        console.log(urlFailed);
    }
    filterUrl(urls);