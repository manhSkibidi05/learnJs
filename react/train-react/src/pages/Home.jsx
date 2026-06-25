// Định nghĩa component Home -> render giao diện Home (chính) của web 

    import {Link} from 'react-router-dom';
    import blogPost from '../data/blogPosts';
    import styles from './Home.module.css';

    function Home(){
        return(
            <div>
                <h1>Danh sách bài viết mới nhất</h1>
                <div>
                    {blogPost.map(post => 
                        <div key={post.id} className={styles.card}>
                            <h2>Tiêu đề : {post.title}</h2>
                            <p>Nội dung : {post.excerpt}</p>
                            <p>Tác giả : {post.author}</p>
                            <Link to={`/blog/${post.id}`}>Xem thêm</Link>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    export default Home;