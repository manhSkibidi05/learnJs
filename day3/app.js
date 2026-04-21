// vòng lặp : dùng để thực thi khối lệnh code nhiều lần
// vòng lặp for -> dùng khi biến trước số lần cần thực hiện lặp
for (let i = 1; i < 3; i++) {
    console.log(i);
}
// vòng lặp while -> dùng khi chưa biết trước số lần thực hiện lặp
let a = null;
let b = 8;
while (!a && b) {
    console.log("sai");
    b /= 2;
    if (b === 1) {
        b = 0;
    }
}
// vòng lặp do while -> thực hiện lệnh trước khi kiểm tra điều kiện
let chao = "hello";
let cuts = "";
do{
    console.log(chao)
}while(cuts);

// bài tập 1 : tìm ước số của 1 số nguyên dương
console.log("-----BÀI 1-----");
let soNguyen = 15;
for(let i = 1 ; i <= soNguyen ; i++){
    if(soNguyen % i === 0){
        console.log(i);
    }
}

// bài tập 2 : kiểm tra số nguyên tố -> số nguyên tố là số chỉ chia hết cho 1 và chính nó
console.log("-----BÀI 2-----");
let soNguyenTo = 17;
let check = true;
for(let i = 2 ; i < soNguyenTo ; i++){
    if(soNguyenTo % i === 0){
        check = false;
        console.log(`${soNguyenTo} không là số nguyên tố`);
        break;
    }
}
if(check){
    console.log(`${soNguyenTo} là số nguyên tố`);
}

// bài tập 3 : vẽ hình chữ nhật với kích thước cho trước 
console.log("-----BÀI 3-----");
let chieuDai = 10;
let chieuRong = 5;
function inChieuDai(chieuDai){
    let dauSao = "*";
    for(let i = 1 ; i < chieuDai ;i++){
        dauSao += "*";
    }
    return dauSao;
}


inChieuDai(chieuDai);
for(let i = 1 ; i <= chieuRong ; i++){
    console.log(`${inChieuDai(chieuDai)}`);
}
inChieuDai(chieuDai);