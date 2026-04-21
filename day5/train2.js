// Bài 3 :
console.log(`________BÀI 3_________`)
let words = ["apple", "banana","mango" ,"apple", "orange", "banana", "apple","watermelon","mango"];
// Kết quả mong đợi: { apple: 3, banana: 2, orange: 1 }

function changeObj(arr){
    let obj = {};
    for(fruit of arr){
        if(obj.hasOwnProperty(fruit)){
            obj[fruit]++;
        }else{
            obj[fruit] = 1;
        }   
    }
    return obj;
}
console.log(changeObj(words));

// Bài 4 :
console.log(`________BÀI 4_________`);
let students = [
    { id: 1, name: "An" },
    { id: 2, name: "Bình" },
    { id: 3, name: "Châu" }
];
// Kết quả mong đợi: { 1: "An", 2: "Bình", 3: "Châu" }


function changeObj2(arr){
    let obj = {};
    for(student of arr){
        obj[student.id] = student.name;
    }
    return obj;
}
// changeObj2(students);
console.log(changeObj2(students));

// Bài 5 :
console.log(`________BÀI 5_________`);
let obj1 = { a: 1, b: 2, c: 3, d: 4 };
let obj2 = { b: 2, c: 3, e: 5, f: 6 };
// Kết quả mong đợi: { b: 2, c: 3 }

function compare(obj1 , obj2){
    let obj = {};
    for(key in obj1){
        if(obj2.hasOwnProperty(key)){
            obj[key] = obj1[key];
        }
    }
    return obj;
}
console.log(compare(obj1 , obj2));

// Bài 6 :
console.log(`________BÀI 6_________`);

// khởi tạo đối tượng thư viện
let library={
    // thuộc tính books kiểu dữ liệu là 1 mảng lưu trữ sách 
    books : [],

    // phương thức thêm 1 sách mới vào thuộc tính books
    // có các tham số cho 1 đối tượng sách , tham số mặc định là isAvailable = true -> khi không truyền giá trị cho tham số này/hoặc giá trị truyền vào là undefined
    //  sẽ mặc định là true
    addBook(id , title , author , year , isAvailable = true){
        // kiểm tra dữ liệu do người dùng nhập có đầy đủ không
        // ! của 1 tham số -> tham số truyền vào các giá trị là falsy : 0 , "" , undefined , NaN , null -> thì trả về false phủ định lại là true sẽ rơi vào trường hợp này -> return hàm
        if(!id || !title || !author || !year){
            return `Không đủ dữ liệu để thêm sách`;
        };

        // sử dùng hàm find() trong mảng để tìm 1 phần tử trong mảng đã tồn tại id này chưa -> hàm find() trả về phần tử đầu tiên trong arr nếu nó phù hợp với điều kiện 
        // nếu tìm ra sẽ trả về phần tử đó -> là 1 obj là truthy -> trả về true -> return kết thúc hàm vì đã tồn tại 1 đối tượng có cùng id trong mảng
        // nếu không tìm thấy phần tử phù hợp trong mảng -> trả về undefined -> falsy -> false -> chạy tiếp chương trình
        if(this.books.find(function(value){
            return value.id === id
        })){
            return `đã tồn tại sách có id ${id} này`;
        };

        // kiểm tra năm phát hành sách phù hợp 
        if(year < 1500 || year > new Date().getFullYear()){
            return `năm phát hành sách không hợp lệ`;
        };

        // khởi tạo đối tượng sách mới mang các thuộc tính đã được validation 
        const newBook = {
            id : id,
            title : title,
            author : author,
            year : year,
            isAvailable : isAvailable
        };
        // thêm đối tượng mới vào mảng 
        this.books.push(newBook);
        return `thêm sách thành công`;
    },

    // phương thức mượn sách dựa trên id 
    borrowBook(id){
        // kiểm tra tham số truyền vào hợp lệ hay không
        if(!id){
            return false;
        };
        // khởi tạo 1 biến được tham chiếu đến mảng sử dụng hàm find() -> tìm ra phần tử đầu tiên trong mảng có id = id truyền vào và isAvailable = true 
        const findIdBook = this.books.find(function(value){
            return value.id === id && value.isAvailable === true
        });
        // lúc này khi tồn tại phần tử đó trong mảng
        if(findIdBook){
            // truyển trạng thái sang false -> đã mượn được sách
            findIdBook.isAvailable = false;
            // trả về true -> 1 hàm trả về cùng 1 kiểu dữ liệu 
            return true;
        };
        return false;
    },

    returnBook(id){
        if(!id){
            return false;
        };
        const findIdBook = this.books.find(function(value){
            return value.id === id && value.isAvailable === false
        });
        if(findIdBook){
            findIdBook.isAvailable = true;
            return true;
        };
        return false;
    },

    // tìm sách theo tên
    searchByTitle(title){
        // kiểm tra tên truyền vào có hợp lệ hay không 
        if(!title){
            // trả về null -> hàm này trả về 1 sách -> là 1 obj nên khi không tồn tại trả về null cùng 1 kiểu dữ liệu là obj
            return null;
        };
        // sử dụng hàm find() tìm giá trị đầu tiên trong mảng 
        const findTitleBook = this.books.find(function(value){
            return value.title.toLowerCase() === title.toLowerCase(); 
        });
        if(findTitleBook){
            return findTitleBook;
        };
        return null;
    },

    // danh sách sách đang hoạt động
    listAvailableBooks(){
        // sử dụng hàm filter() -> trả về 1 mảng mới lưu các giá trị phù hợp với điều kiện từ mảng cũ sang mảng mới 
        let arrAvailableBooks = this.books.filter(function(value){
            // điều kiện khi chuyển sang là còn hoạt động 
            return value.isAvailable === true;
        });
        return arrAvailableBooks;
    },

    listBorrowedBooks(){
        let arrBorrowedBooks = this.books.filter(function(value){
            return value.isAvailable === false;
        })
        return arrBorrowedBooks;
    }
}

console.log(library.addBook(1,"chào","moy",2026));
console.log(library.addBook(1,"chào em","moy2",2026));
console.log(library.addBook(0,"","",2021));
console.log(library.addBook(3,"Đất nước","moy2",2021));

console.log(library.books);

if(library.borrowBook(1)){
    console.log(`Mượn sách thành công`);
}else{
    console.log(`Mượn sách thất bại`);
};
if(library.borrowBook(1)){
    console.log(`Mượn sách thành công`);
}else{
    console.log(`Mượn sách thất bại`);
};

if(library.returnBook(1)){
    console.log(`Trả sách thành công`);
}else{
    console.log(`Trả sách thất bại`);
};
if(library.returnBook(1)){
    console.log(`Trả sách thành công`);
}else{
    console.log(`Trả sách thất bại`);
};

console.log(library.searchByTitle("abc"));
console.log(library.searchByTitle("ĐẤT NƯỚC"));

console.log(library.listAvailableBooks());

if(library.listBorrowedBooks().length === 0){
    console.log(`không có cuốn sách nào được mượn`)
}else{
    console.log(library.listBorrowedBooks());
}
// Các điều cần nhớ :
// - validation :  kiểm tra dữ liệu được truyền vào của người dùng xem có hợp lệ hay không
// - 1 hàm/phương thức : khi return trả về  giá trị phải cùng 1 kiểu dữ liệu 
// - sử dụng các functional có sẵn của mảng thay vì dùng vòng lặp :
    // find(function(value,index,arr){return điều kiện }); hàm này trả về giá trị đầu tiên trong mảng phù hợp với điều kiện
        // -> không duyệt toàn bộ kết thúc luôn khi tìm thấy giá trị tmdk -> nếu không có giá trị tmdk -> trả về undefined
        // -> dùng hàm để tìm giá trị trong mảng nhanh nhất
    // filter(function(value,index,arr){return điều kiện}); hàm này trả về 1 mảng mới lưu các giá trị thỏa mãn điều kiện của mảng sử dụng phương thức này 
        // -> duyệt toàn bộ mảng tìm tất cả các giá trị tmdk -> nếu không có giá trị tmdk -> trả về mảng rỗng  
        // -> dùng hàm để lọc các giá trị tương ứng 