// Tạo component product list 

    // import 2 hàm của react để sử dụng 
    // useState cho phép tạo biến state component hiện thị hoàn toàn dựa vào state , state chỉ thay đổi qua hàm setState sẽ nhận giá trị mới và re-render component
    import {useState , useEffect} from 'react';
    // import đối tượng styles của module.css để sử dụng style thông qua class , gọi các class như thuộc tính của styles 
    import styles from './ProductList.module.css';

    function ProductList(){
        const [products , setProducts] = useState([]);
        const [productsFilter , setProductsFilter] = useState([]) 
        const [keyword , setKeyword] = useState('');
        const [loading , setLoading] = useState(true);
        const [error , setError] = useState(null);
        
        // chạy 1 lần để lấy dữ liệu
        useEffect(() => {
            async function fetchData(url){
                try{
                    setLoading(true);    
                    const res = await fetch(url);
                    if(!res.ok) throw new Error('Lỗi tải sản phẩm');
                    const data = await res.json();
                    setProducts(data);
                    setProductsFilter(data);
                }catch(err){
                    setError(err.message);
                }finally{
                    setLoading(false);
                }
            }

            fetchData('https://fakestoreapi.com/products');
        } , []);

        // chạy khi keyword thay đổi 
        useEffect(() => {
            let idTimeout = setTimeout(() => {
                if(!keyword.trim())  setProductsFilter(products);
                else{
                const filtered = products.filter(prd => 
                        prd.title.toLowerCase().includes(keyword.trim().toLowerCase())
                        || prd.category.toLowerCase().includes(keyword.trim().toLowerCase())
                        || prd.description.toLowerCase().includes(keyword.trim().toLowerCase())
                        
                    )
                setProductsFilter(filtered);
                }
            } , 500)
            
            return () => {
                if(idTimeout) clearTimeout(idTimeout);
            }

        } , [keyword , productsFilter])
        
        return(
            <>
            <div className={styles.searchBox}>
                <input type="text" id="searchInput" placeholder='Tìm kiếm sản phẩm...' onChange={(e) => setKeyword(e.target.value)}/>
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

    