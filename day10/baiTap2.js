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
    
    
    // - Destructuring : là kĩ thuật sử dụng trong js để gán nhiều các giá trị của 1 arr/obj cho nhiều biến độc lập ngoài ra còn được sử dụng để hoán đảo
    // giá trị của 2 biến  -> kĩ thuật sử dụng bên trái dấu bằng 

    // - Spread operator : là toán tử sử dụng trong js để phân rã các giá trị nằm trong của 1 iterator (arr , obj , string ...) các giá trị nằm bên trong 
    // nó sẽ được phân rã thành các giá trị độc lập , được sử dụng sao chép nông 1 arr/obj mới không gây ảnh hưởng tới dữ liệu ban đầu
    // -> sử dụng dấu ...+tên iterator nằm bên phải dấu bằng 

    // - rest parameter : là 1 tham số đặc biệt khi định nghĩa hàm  của js , lúc này nó sẽ gom lại các đối số truyền vào thành 1 mảng rồi hàm đó 
    // sẽ xử lí toàn bộ dữ liệu được truyền vào đó , được sử dụng đối với các hàm chưa biết trược số đối số sẽ truyền vào sẽ sử dụng tham số rest này
    // -> sử dụng dấu ...+ tên tham số đặt ở cuối các tham số lúc định nghĩa 1 hàm 
    
    // - Tham số (parameter) : là các tham số được truyền vào hàm lúc định nghĩa 1 hàm 
    // - Đối số (argument) : là các đối số được truyền vào lúc gọi hàm -> Đối số có thể là 1 biến , 1 hằng , 1 biểu thức trả về giá trị bất kì 