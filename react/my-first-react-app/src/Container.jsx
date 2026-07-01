// Địa nghĩa component KhoHang : nơi chứa dữ liệu chính 
    
    import Cart from './Cart';

    function KhoHang(){
        const products = [
            {id : 1 , name : 'iphone 11' , isActive : true , price : 100},
            {id : 2 , name : 'cleaner' , isActive : true , price : 150},
            {id : 3 , name : 'over clock' , isActive : false , price : 200},
            {id : 4 , name : 'decumar pro max' , isActive : true , price : 400},
        ]
        return <Cart sanPham={products}></Cart>
    }

    export default KhoHang;