    function fetchUrl(url){
        return fetch(url)
            .then(response => {
                if(!response.ok) throw new Error(`Lỗi mạng`);
                return response.json();
            })
    }

    async function fetchWithRetry2(url , maxRetries , delayMs){
        let count = 1;
        let result = null;
        while(count < maxRetries){
            try{
                result = await fetchUrl(url);
                break;
            }catch(err){
                console.log(`Lỗi lần ${count} do : ${err.message}`);
                count++;
                console.log(`Đợi sau ${delayMs} ms để thử lại`);
                await new Promise((resolve , reject) => {setTimeout(() => console.log(`?`) , delayMs)});
            }
        }
        if(result) console.log(result);
        else console.log(`Hêt lần thử`)
    }

    fetchWithRetry2(`https://jsonplaceholder.typicode.com/users/12` , 3 , 1000);