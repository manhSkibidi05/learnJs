// khởi tạo component UserCard

    import styles from './UserCard.module.css';
    function UserCard({avt , name , email , role}){
        return (
            <div className={styles.test}>
                <img style={{width : '100px' , height : '100px'}} src={avt} alt='ảnh linh tinh' />
                <h2 style={{fontSize : '24px' , color : 'red'}}>Tên là : {name}</h2>
                <p>Email là : {email}</p>
                <p>Role là : {role}</p>
            </div>
        )
    }

    export default UserCard;