// file storage.js -> cho phép export default 1 đối tượng 

    // export default không cần định nghĩa tên của biến lưu trữ các giá trị
    // -> Khi import nó sẽ được định nghĩa để lưu trữ các giá trị trả về từ export default
    export default {
        name : `tao` ,
        save(key , value){
            if(!key) return;
            if(!value) return;
            if(typeof value === 'object'){
                let valueShould = JSON.stringify(value);
                localStorage.setItem(key , valueShould);
                return;
            }
            localStorage.setItem(key , value);
        },

        getVal(key){
            return localStorage.getItem(key)
        },

        removeVal(key){
            if(!localStorage.getItem(key)) return null;
            localStorage.removeItem(key);
        }
    }