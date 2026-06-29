// Component ProductsLayout làm layout hiện thị danh sách danh mục và sản phẩm 

    import {useParams , Link , Outlet , useLocation } from 'react-router-dom';
    import {categories , products} from '../data/productsData';

    function ProductsLayout(){
        const location = useLocation();
        const {category , idProduct} = useParams();
        
        return (
            <div>
                <div style={{display : 'flex'}}>
                    <Link to='/products'><h2>Trang Sản phẩm</h2></Link>
                    {location.pathname === `/products/${category}` ?<Link to={`/products/${category}`}><h2>_{categories.find(val => val.id === category).name}</h2></Link>: ''}
                    {location.pathname === `/products/${category}/${idProduct}` ? <h2>_{products[category].find(val => val.id === idProduct).name}</h2> : ''} 
                </div>
                <Outlet context={{categories , products}}>
                </Outlet>
            </div>
        )
    }
    

    export default ProductsLayout;