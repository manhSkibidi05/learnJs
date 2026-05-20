// Cấp độ 3 : Nâng cao 

// Bài 11 : Kết hợp rest và spread để loại bỏ thuộc tính 
// Đề bài : viết hàm omit(obj , ...keys) nhận obj và ds key cần loại bỏ -> trả về obj mới không có key đó (không dùng delete)

    function omit(obj , ...keys){
        return Object.keys(obj).reduce((results , key) => {
            if(!keys.includes(key)){
                results[key] = obj[key]
            }
            return results
        },{})

    }
    let objNum = {a : 1 , b : 2 , c : 3 , d : 4 , e : 5 };
    console.log(omit(objNum , `b` , `e`));

// Bài 12 : Chuyển đổi mảng các cặp thành object 
// Đề bài : Cho mảng các cặp [['name', 'Alice'], ['age', 25], ['city', 'Paris']] -> chuyển thành obj với các thuộc tính tương ứng 

    let arrTwo = [['name', 'Alice'], ['age', 25], ['city', 'Paris']];
    
    function changeObj(arr){
        return arr.reduce((results , arrCon) => {
            results[arrCon[0]] = arrCon[1];
            return results
        },{})
    }
    console.log(changeObj(arrTwo));

// Bài 14 : Rest parameter với generic transformation
// Đề bài : viết hàm transformArray(transformFn , ...items) nhận 1 hàm biến đổi và danh sách các phần tử -> hàm trả về 1 mảng với các phần tử áp dụng
// transformFn

    function transformArray(transformFn , ...items){
        return items.map(value => transformFn(value))
    }
    console.log(transformArray(x => x * 3 , 3,4,5,6,7,6));

// Bài 15 : Tự viết hàm mergeObjects 
// Đề bài : Viết hàm mergeObjects(...objs) gộp nhiều obj lại với nhau , các obj sau ghi đè lên obj trước -> trả về obj cuối không dùng spread 

    function mergeObjects(...objects){
        return objects.reduce((results , obj) => {
            let pros = Object.keys(obj);
            for(let pro of pros){
                results[pro] = obj[pro];
            }
            return results;
        },{})
    }
    
    let users = [
        {name : `long` , age : 19 , food : `bunbohue`},
        {name : `lang` , age : 192 , food : `bunbohue` , game : `tft`},
        {name : `lang2` , age : 129 , food : `bunbohue`},
        {name : `lang4` , age : 1921 , food : `bunbohue ngon`}
    ]
    console.log(mergeObjects({name : `long` , age : 19 , food : `bunbohue`},{name : `lang` , age : 192 , food : `bunbohue` , game : `tft`},
        {name : `lang4` , age : 1921 , food : `bunbohue ngon`}
    ))
    
    