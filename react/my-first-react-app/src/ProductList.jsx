// Tạo component product list 

    import {useState , useEffect} from 'react';
    import styles from './ProductList.module.css';

    function ProductList(){
        const [products , setProducts] = useState([]);
        const [keyword , setKeyword] = useState('');
        const [loading , setLoading] = useState(true);
        const [error , setError] = useState(null);
        
        async function fetchData(url){
            try{
                setLoading(true);    
                const res = await fetch(url);
                if(!res.ok) throw new Error('Lỗi tải sản phẩm');
                const data = await res.json();
                setProducts(data);
            }catch(err){
                setError(err.message);
            }finally{
                setLoading(false);
            }
        }

        useEffect(() => {
            fetchData('https://fakestoreapi.com/products');
        } , []);
        
        const productsFilter = keyword.trim() 
        ? products.filter(prd => prd.title.toLowerCase().includes(keyword.trim().toLowerCase())) 
        : products;

        if(loading) return <div>Đang tải sản phẩm...</div>;
        if(error) return <div>Lỗi : {error}</div>

        return(
            <>
            <div className={styles.searchBox}>
                <input type="text" id="searchInput" placeholder='Tìm kiếm sản phẩm...' onChange={(e) => setKeyword(e.target.value)}/>
            </div>
            <div className={styles.container}>
                {
                productsFilter.length === 0 ? 
                (<h2>Không có sản phẩm nào</h2>) :
                (productsFilter.map(
                    prd => 
                    <div className={styles.productCard} key={prd?.id ?? 0}>
                        <div className={styles.imageWrapper}>
                            <img className={styles.cardImage} src={prd?.image} alt="Sản phẩm đồng hồ thông minh"/>
                        </div>
                        <div className={styles.cardContent}>
                            <div className={styles.cardHeader}>
                                <span className={styles.productTitle}>{prd?.title ?? 'Sản phẩm A'}</span>
                                <span className={styles.productCategory}>{prd?.category ?? 'Danh mục'}</span>
                            </div>
                            <div className={styles.productPrice}>$ {prd?.price ?? 'Giá sản phẩm'}</div>
                            <div className={styles.productDescription}>
                                {prd?.description ?? 'Chi tiết sản phẩm'}
                            </div>
                            <div className={styles.cardAction}>
                                <button className={styles.btnBuy}>Xem chi tiết →</button>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>
            </>
        )
        
    }
    export default ProductList

    