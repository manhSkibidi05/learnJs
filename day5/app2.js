// Phần 5 : Phương thức của Object
    // - Phương thức là các hàm được định nghĩa trong obj cho phép obj thực hiện các thao tác đối với dữ liệu của chính nó

    // - Các cách khai báo phương thức của obj :
        // + Cổ điển : 
        let dog1 = {
            bark : function(){
                console.log("gâu gâu");
            }
        }
        // -> giống với khai báo 1 thuộc tính tên thuộc tính : value  thì ->  tên phương thức : hàm

        // + hiện nay (thường sử dụng) :
        let dog2 = {
            pee(){
                console.log("xè xè");
            }
        }
        // -> rút gọn so với cách khai báo cũ -> chỉ cần định nghĩa ngay hàm 

        // + arrow function :
        let cat1 = {
            sing : ()=>{
                console.log("mew mew");
            }
        }

        // + khai báo phương thức sau khi khai báo 1 obj
        let cat2 ={};
        cat2.attack = function(){
            console.log("rasengan");
        }

// Phần 6 : Từ khóa this
    // - Từ khóa this được sử dụng trong 1 phương thức thuộc 1 đối tượng 
    // -> khi 1 phương thức gọi this lúc này phụ thuộc vào đối tượng đang gọi phương thức -> this sẽ tham chiếu đến đối tượng đó và thực hiện lệnh trong phương thức
    
    // các sử dụng this với phương thức thông dụng
    let caculator = {
        a : 10,
        b : 20,
        c : 15,

        plus(){
            return this.a + this.b + this.c;
        },

        average(){
            return this.plus()/3;
        }
    }
    console.log(`tổng 3 số : ${caculator.plus()}`);
    console.log(`trung bình cộng 3 số : ${caculator.average()}`);
    
    // arrow function : this được lấy từ scope bên ngoài 
    // funtion lồng nhau 
    let caculator2 = {
        a : 20,
        b : 30,

        sum(){
            this.a += 10;
            this.b += 10;
            console.log(`${this.a} và ${this.b}`);
            function plus(){
                console.log(`${this.a} và ${this.b}`);
            }
            plus();
        },

        sumFix(){
            let aFix = this.a;
            let bFix = this.b;
            console.log(`${aFix+=10} và ${bFix+=10}`);
            function plus(){
                console.log(`${aFix+=10} và ${bFix+=10}`);
            }
            plus();
        }
    }
    caculator2.sum();
    caculator2.sumFix();
    // Viêc sử dụng this lồng trong 1 hàm thì this không tham chiếu đươc với obj mà nó đang thực hiện
    // -> theo định nghĩa this trỏ đến đối tượng mà gọi đến phương thức đó nhưng với hàm bên trong 1 hàm lúc này obj không gọi hàm này mà do 1 hàm khác gọi 
    // -> các sử lí khai báo 1 biến mới tham chiếu đến vị trí của obj cần thao tác

    // Phương thức getter và setter 
    // 1. getter -> là phương thức tính toán rồi trả về dữ liệu của đối tượng nhưng lúc gọi chỉ cần gọi như 1 thuộc tính
    let dog ={
        name : "shiba",
        color : "red",
        get nameColor(){
            return `${this.name} và ${this.color}`;
        },

        set nameChage(a){
            this.name = a;
        }

    }
    console.log(dog.nameColor);
    // -> get sử dụng như 1 thuộc tính trả về các giá trị của obj
    // 2 . setter -> là phương thức sử dụng để thay đổi giá trị của các thuộc tính bên trong đối tượng
    dog.nameChage = "chó cỏ";
    console.log(dog.nameColor);

    // getter và setter cách sử dụng lấy ra dữ liệu và thay đổi dữ liệu của 1 đối tượng khác với ngôn ngữ khác khi gọi 2 phương thức này chỉ cần gọi tên như gọi thuộc tính

