// Tạo component product list 

    import {useState} from 'react';

    function ProductList(){
        const [products , setProducts] = useState([
            {}
        ]);

        async function fetchData(url){
            try{    
                const res = await fetch(url);
                if(!res.ok) throw new Error('Lỗi đường dẫn');
                const value = await res.json();
                setProducts(value);
            }catch(err){
                console.log(err.message);
            }
        }
        fetchData('https://fakestoreapi.com/products')

        return(
            <div className='container'>
                {
                products.map(
                    prd => <div className="product-card" key={prd?.id ?? 0}>
                    <div className="image-wrapper">
                        <img className="card-image" src={prd?.image} alt="Sản phẩm đồng hồ thông minh"/>
                    </div>
                    <div className="card-content">
                        <div className="card-header">
                            <span className="product-title">{prd?.title ?? 'Sản phẩm A'}</span>
                            <span className="product-category">{prd?.category ?? 'Danh mục'}</span>
                        </div>
                        <div className="product-price">$ {prd?.price ?? 'Giá sản phẩm'}</div>
                        <div className="product-description">
                            {prd?.description ?? 'Chi tiết sản phẩm'}
                        </div>
                        <div className="card-action">
                            <button className="btn-buy">Xem chi tiết →</button>
                        </div>
                    </div>
                </div>
                )}
            </div>
        )
        
    }
    export default ProductList