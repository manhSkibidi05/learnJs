// Bài 1 : tạo obj user gồm firstName , lastName và method getFullName -> return họ tên 

    export default {
        firstName : 'long',
        lastName : 'song',

        getFullName(){
            return this.lastName + this.firstName;
        },

        getYear(){
            return this.yearBorm;
        }
    }
