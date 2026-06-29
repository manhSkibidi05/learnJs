// Component ProductDetails sử dụng để render chi tiết 1 sảm phẩm dựa trên idProduct

    import {useParams , Link , useOutletContext} from 'react-router-dom';

    function ProductDetails(){
        const {products , categories} = useOutletContext();
        const {category , idProduct} = useParams();
        const productRender = products[category].find(val => val.id === idProduct);

        return(
            <div>
                <h2>Chi tiết sản phẩm : </h2>
                <div>
                    <h3>Tên sản phẩm : {productRender.name}</h3>
                    <p>Giá : {productRender.price}</p>
                    <p>Mô tả : {productRender.description}</p>
                </div>
            </div>
        )
    }

    export default ProductDetails;