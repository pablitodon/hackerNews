import { useGetNewsIdsQuery } from "@/services/hackerNewsApi";
import styles from './styles.module.css'
import NewsCard from "../NewsCard/NewsCard";
import { refreshImage } from "@/assets";

const HomePage = () => {
    const { data: newStories, error, isLoading, refetch } = useGetNewsIdsQuery();
    const refreshNews = () => {
        refetch();
    }

    if (isLoading) return <div>Loading...</div>;
    if (error) {
        const errorMessage =
            'status' in error
                ? `Error: ${error.status}`
                : `Error: ${error.message || 'An unknown error occurred'}`;

        return <div>{errorMessage}</div>;
    }
    const lastNewsListId = newStories?.slice(0, 100) || []
    return (

        <div>
            <button className={styles.update__button} onClick={refreshNews}>
                <img src={refreshImage.refresh} alt="refresh" />
            </button>
            <ul className={styles.news__grid}>
                {
                    lastNewsListId.map(id =>
                        <NewsCard id={id} key={id} />
                    )
                }
            </ul>
        </div>
    )
};

export default HomePage;