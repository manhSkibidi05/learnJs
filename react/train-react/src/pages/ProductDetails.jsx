// Component ProductDetails sử dụng để render chi tiết 1 sảm phẩm dựa trên idProduct

    import {useParams , Link , useOutletContext} from 'react-router-dom';

    function ProductDetails(){
        const {products , categories} = useOutletContext();
        const {category , idProduct} = useParams();

        const categoryValid = categories.find(val => val.id === category);
        let productRender;
        if(categoryValid){
            productRender = products[categoryValid.id].find(val => val.id === idProduct);
        }
        
        if(!productRender){
            return <h2>Không có sản phẩm nào tồn tại !!</h2>
        }

        return(
            <div>
                <h2>Chi tiết sản phẩm : </h2>
                <div>
                    <h3>Tên sản phẩm : {productRender.name}</h3>
                    <p>Giá sản phẩm : {productRender.price}</p>
                    <p>Mô tả sản phẩm : {productRender.description}</p>
                </div>
            </div>
        )
    }

    export default ProductDetails;