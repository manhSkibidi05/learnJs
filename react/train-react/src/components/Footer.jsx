// Định nghĩa component Footer

    import styles from './Footer.module.css'

    function Footer(){
        return(
            <div className={styles.container}>
                <p>Được tạo bởi AI</p>
                <p>No copy right</p>
            </div>
        )
    }

    export default Footer