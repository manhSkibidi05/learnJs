// Component ProductInCate render các sản phẩm dựa vào danh mục 

    import {Link , useOutletContext , useParams} from 'react-router-dom';
    
    function ProductsInCate(){
        const {products , categories} = useOutletContext();
        const {category} = useParams();
        const productsRender = products[category]

        return(
            <div>
                <h2>Danh sách các sản phẩm : </h2>
                {
                    productsRender.map(value => 
                        <div key={value.id}>
                            <h3>Tên : {value.name}</h3>
                            <h4>Giá : {value.price}</h4>
                            <Link to={`/products/${category}/${value.id}`}><p>Xem chi tiết sản phẩm</p></Link>
                        </div>
                    )
                }
            </div>
        )
    }

    export default ProductsInCate