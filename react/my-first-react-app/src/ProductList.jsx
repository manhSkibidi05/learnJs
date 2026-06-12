// Tạo component product list 

    import {useState} from 'react';
    import styles from './ProductList.module.css';

    function ProductList(){
        const [products , setProducts] = useState([
            {}
        ]);
        const [keyword , setKeyword] = useState('');
        const [check , setCheck] = useState(false);

        const productsFilter = keyword.trim() !== '' ? products.filter(prd => prd.title.toLowerCase().includes(keyword.trim().toLowerCase())) : [...products]
        
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

        function onceFunc(func , url){
            if(check) return;
            func(url);
            setCheck(true);
        }
        onceFunc(fetchData , 'https://fakestoreapi.com/products');

        return(
            <>
            <div className={styles.searchBox}>
                <input type="text" id="searchInput" onChange={(e) => setKeyword(e.target.value)}/>
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

    