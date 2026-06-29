// Component Categories render danh sách các danh mục 

    import {Link , useOutletContext} from 'react-router-dom';
    
    function Categories(){
        const {categories , products} = useOutletContext()
        
        return(
            <div>
                <h2>Danh sách các danh mục : </h2>
                {
                    categories.map(category =>
                        <div key={category.id}>
                            <h3>Danh mục : {category.name}</h3>
                            <Link to={`/products/${category.id}`}><p>Xem các sản phẩm</p></Link>
                        </div>
                    )
                }
            </div>
        )
    }

    export default Categories