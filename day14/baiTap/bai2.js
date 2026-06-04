// Bài 2 : Tạo obj counter với count = 0 , các method tăng , giảm , reset count -> in ra count mỗi lần gọi method

    export default {
        count : 0, 

        increment(){
            return ++this.count;
        },

        decrement(){
            return --this.count;
        },

        reset(){
            return this.count = 0;
        }


    }