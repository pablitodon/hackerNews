import { homeImage } from '@/assets';
import styles from './styles.module.css'


const Header = () => {
    return (
        <header className={styles.header}>
            <button className={styles.button} >
                <img src={homeImage.home} alt="" />
            </button>
            <div>
                <h1>HackerNews </h1>
            </div>
        </header >
    );
};

export default Header;