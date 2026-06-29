// Component ProductsListLayout render làm layout để render danh sách sản phẩm và chi tiết 1 sản phẩm 

    import {Link , useOutletContext ,  Outlet} from 'react-router-dom';
    
    function ProductsListLayout(){
        const {products , categories} = useOutletContext();
        
        return(
            <Outlet context={{products , categories}}></Outlet>
        )
    }

    export default ProductsListLayout