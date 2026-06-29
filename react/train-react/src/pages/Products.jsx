// Component Products chứa danh mục các sản phẩm , catalog cho biết được đang ở trang nào và có thể hiện thị chi tiết sản phẩm 

    import {useLocation , useNavigate , useParams , Link , NavLink, Outlet } from 'react-router-dom';
    import {categories , products} from '../data/productsData';

    function Products(){
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();
        const detailProducts = params?.id;
        
        return (
            <div>
                <div style={{display : 'flex'}}>
                    <Link to='/products'><h2>Trang Sản phẩm</h2></Link>
                    {location.pathname === `/products/${params.category}` ?<Link to={`/products/${params.category}`}><h2>_{categories.find(val => val.id === params.category).name}</h2></Link>: ''}
                    {location.pathname === `/products/${params.category}/${params.id}` ? <h2>_{products.phone.find(val => val.id === params.id).name}</h2> : ''} 
                </div>
                <Outlet context={{categories , products}}>
                </Outlet>
            </div>
        )
    }
    

    export default Products