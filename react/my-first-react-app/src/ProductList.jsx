// Tạo component product list 

    // import 2 hàm của react để sử dụng 
    // useState cho phép tạo biến state component hiện thị hoàn toàn dựa vào state , state chỉ thay đổi qua hàm setState sẽ nhận giá trị mới và re-render component
    import {useState , useEffect} from 'react';
    import useFetch from './hooks/useFetch.js'
    import styles from './ProductList.module.css';

    function ProductList(){
        const [keyword , setKeyword] = useState('');
        const [debounceKeyword , setDebounceKey] = useState('');
        const {data , loading , error} = useFetch('https://fakestoreapi.com/products');
        
        const productsFilter = debounceKeyword.trim() !== '' ? 
            data.filter(prd => 
            prd.title.toLowerCase().includes(debounceKeyword.trim().toLowerCase())
            || prd.category.toLowerCase().includes(debounceKeyword.trim().toLowerCase())
            || prd.description.toLowerCase().includes(debounceKeyword.trim().toLowerCase())
            )  : data || [];

        // chạy khi keyword thay đổi 
        useEffect(() => {
            let idTimeout = setTimeout(() => {
                setDebounceKey(keyword);
            } , 500)
            
            return () => {
                if(idTimeout) clearTimeout(idTimeout);
            }
        } , [keyword])
        
        return(
            <>
            <div className={styles.searchBox}>
                <input type="text" id="searchInput" placeholder='Tìm kiếm sản phẩm...' onChange={(e) => setKeyword(e.target.value) }/>
            </div>

            {loading && <div className={styles.dots}>
                            <span className={styles.dot}></span>
                            <span className={styles.dot}></span>
                            <span className={styles.dot}></span>
                        </div>}
            {error && <p style={{ color: 'red' }}>❌ Lỗi: {error}</p>}

            <div className={styles.container}>
                {productsFilter.length === 0 && !loading && !error && <h2>Không có sản phẩm nào</h2>}
                {
                productsFilter.map(
                    prd => 
                    <div className={styles.productCard} key={prd?.id}>
                        <div className={styles.imageWrapper}>
                            <img className={styles.cardImage} src={prd?.image} alt={prd?.title}/>
                        </div>
                        <div className={styles.cardContent}>
                            <div className={styles.cardHeader}>
                                <span className={styles.productTitle}>{prd?.title}</span>
                                <span className={styles.productCategory}>{prd?.category}</span>
                            </div>
                            <div className={styles.productPrice}>$ {prd?.price}</div>
                            <div className={styles.productDescription}>
                                {prd?.description}
                            </div>
                            <div className={styles.cardAction}>
                                <button className={styles.btnBuy}>Xem chi tiết → </button>
                            </div>
                        </div>
                    </div>
                )
                }
                
            </div>
            </>
        )
        
    }
    export default ProductList

    