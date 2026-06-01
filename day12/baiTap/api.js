// file api.js -> cho phép export dữ liệu lấy từ trang web

    export async function fetchUsers(url){
        try{
            let response = await fetch(url);
            if(!response.ok) throw new Error(`Lỗi mạng`);
            let users = await response.json();
            return users;
        }catch(err){
            console.log(err.message);
        }
    }

    export async function checkVal(value){
        let valid = await new Promise(resolve => setTimeout(() => {
            if(value === 0) resolve(0);
            else resolve(1)
        },1000))
        if(valid === 0) throw new Error(`nó = 0`);
        return `nó khác 0`
    }

