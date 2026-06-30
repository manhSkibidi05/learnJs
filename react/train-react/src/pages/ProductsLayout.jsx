// Component ProductsLayout làm layout hiện thị danh sách danh mục và sản phẩm 

    import {useParams , Link , Outlet } from 'react-router-dom';
    import {categories , products} from '../data/productsData';

    function ProductsLayout(){
        const {category , idProduct} = useParams();
        const categoryValid = categories.find(val => val.id === category);
        let idProductValid;
        if(categoryValid) idProductValid = products[categoryValid.id].find(val => val.id === idProduct)
        
        return (
            <div>
                <div style={{display : 'flex'}}>
                    <Link to='/products'><h2>Trang Sản phẩm</h2></Link>
                    {categoryValid  && <Link to={`/products/${category}`}><h2>_{categoryValid.name}</h2></Link>}
                    {idProductValid && <h2>_{idProductValid.name}</h2> } 
                </div>
                <Outlet context={{categories , products}}>
                </Outlet>
            </div>
        )
    }
    

    export default ProductsLayout;