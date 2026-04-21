// Bài tập phần 4 : Các thao tác quan trọng với object

// Cấp 1 : Cơ Bản (Basic)
// Bài 1.1 :
console.log(`________BÀI 1.1_________`);
let student ={
    id : "2321050070",
    name : "moy",
    age : 18,
    grade :"Công nghê thông tin"
};
console.log(`tên sinh viên : ${student.name}`);
console.log(`tuổi sinh viên : ${student.age}`);
let arrStudent = Object.entries(student);
arrStudent.forEach(function([key , value]){
    console.log(`${key} : ${value}`);
});

// Bài 1.2 : 
console.log(`________BÀI 1.2_________`);
student["email"] = "uchihaok@icloud.com";
student["phone"] = "0345446102";
student.grade = "Cộng nghệ mỏ";
console.log(student);
// Bài 1.3 :
console.log(`________BÀI 1.3_________`);
delete student.email;
delete student.phone;
if(student.hasOwnProperty("phone")){
    console.log(`thuộc tính điện thoại còn tồn tại`);
}else{
    console.log(`thuộc tính điện thoại không tồn tại`);
}
console.log(student);
// Bài 1.4 :
console.log(`________BÀI 1.4_________`);
const book ={
    title : "Js cơ bản",
    autor : "Tao",
    year : 2025,
    publisher : "NXB kim đồng",
    hentai : "sevit"
};
console.log(book.hasOwnProperty("title")? "title tồn tại" : "title không tồn tại");
console.log(book.hasOwnProperty("price")? "price tồn tại" : "price không tồn tại");
console.log(book.hasOwnProperty("toString")? "toString tồn tại" : "toString không tồn tại");
// Bài 1.5 :
console.log(`________BÀI 1.5_________`);
function countProperty(obj){
    let count = 0;
    Object.keys(obj).forEach(function(value){
        count++;
    });
    return count;
};
console.log(`số thuộc tính trong obj book là : ${countProperty(book)}`);
console.log(`số thuộc tính trong obj student là : ${countProperty(student)}`);

// Cấp 2 : trung cấp 
// Bài 2.1 :
console.log(`________BÀI 2.1_________`);
const original ={
    name : "an",
    age : 25,
    address:{
        city: "Hà nội",
        district: "Cầu giấy"
    },
    hobbies :["đọc sách" ,"lọ vương"]
};
let copy1 = {...original};
let copy2 = Object.assign({},original);
copy1.name = "moy";
copy1.address.city ="trung quốc";
copy1.hobbies.push("hentai");
console.log(original);
// Bài 2.2 :
console.log(`________BÀI 2.2_________`);
function deepClone(obj){
    if(obj === null || typeof obj !== "object"){
        return obj;
    }

    if(Array.isArray(obj)){
        let newArr = [];
        for(let i = 0 ; i < obj.length ; i++){
            newArr[i] = deepClone(obj[i]);
        }
        return newArr;
    }

    let newObj = {};
    for(key in obj){
        if(obj.hasOwnProperty(key)){
            newObj[key] = deepClone(obj[key]);
        }
    }
    return newObj;
}

const deepCopy1 =  deepClone(original);
deepCopy1.name = "chất";
deepCopy1.address.city = "Nhà tao";
deepCopy1.hobbies.push("Khô gà");
console.log(original);
console.log(deepCopy1);
// Bài 2.3 :
console.log(`________BÀI 2.3_________`);
const defaults = {
    theme: "light",
    fontSize: 14,
    showSidebar: true,
    language: "en"
};

const userPrefs = {
    theme: "dark",
    fontSize: 16,
    language: "vi"
};

const devicePrefs = {
    fontSize: 18,
    showSidebar: false
};

const settings = {...defaults,...userPrefs,...devicePrefs};
console.log(settings);
// Bài 2.4 :
console.log(`___________BÀI 2.4________`)

