// component Customer nhận dữ liệu được truyền từ Kho đến giỏ hàng rồi đến khách hàng mới sử dụng dữ liệu này

    function Customer({sanPham}){
        return(
            <div>
                <h2>Khách hàng sử dụng các loại sản phẩm sau : </h2>
                {
                    sanPham.map(value => 
                        <ul>
                            <li>Mã sản phẩm : {value.id}</li>
                            <li>Sản phẩm : {value.name}</li>
                            <li>Giá cả : {value.price} Đô La</li>
                            <li>Còn sử dụng được : {value.isActive ? 'vẫn sử dụng được' : 'đã bị hỏng'}</li>
                        </ul>
                    )
                }
            </div>
        )
    }

    export default Customer;
    