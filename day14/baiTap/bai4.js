// Bài 4 : Tạo obj timer có seconds = 0 , cácc method gồm start() , stop() , reset() 
// - Trong start() dùng setInterval mỗi giây tăng this.seconds và in ra 
// -> lưu ý trong setInterval this sẽ mất trỏ đến window : dùng arrow function để giữ this

    export default {
        seconds : 0,
        idInterval : null,

        start(){
            this.idInterval = setInterval(() => {
                this.seconds++;
                console.log(this.seconds)
                if(this.seconds === 10) this.stop(); 
            },200)
        },

        stop(){
            clearInterval(this.idInterval);
            this.idInterval = null;
            console.log(`Dừng lại ở giây thứ ${this.seconds}`);
        },

        reset(){
            clearInterval(this.idInterval);
            this.idInterval = null;
            this.seconds = 0;
            console.log(this.seconds);
        }
    }