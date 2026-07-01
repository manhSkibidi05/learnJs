// Định nghĩa component Cart giỏ hàng : nhận dữ liệu từ kho hàng nhưng không hề sử dụng

    import Customer from './Customer'

    function Cart({sanPham}){
        
        return <Customer sanPham={sanPham}></Customer>
    }

    export default Cart
