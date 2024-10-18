import { useNavigate, useParams } from 'react-router-dom';
import styles from './styles.module.css';
import { useGetNewsQuery } from '@/services/hackerNewsApi';
import Comments from '../Comments/Comments';
import { useEffect } from 'react';

const NewsPage = () => {


    useEffect(() => {
        const timer = setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }, 300);
        return () => clearTimeout(timer);
    }, []);


    const { id } = useParams<{ id: string | undefined }>();
    const { data: news, error: errorNews, isLoading: isLoadingNews } = useGetNewsQuery(Number(id));

    const navigate = useNavigate();
    const handleBackMainPage = () => {
        navigate('/');
    }

    if (isLoadingNews) return <div>Loading...</div>;
    if (errorNews) {
        const errorMessage =
            'status' in errorNews
                ? `Error: ${errorNews.status}`
                : `Error: ${errorNews.message || 'An unknown error occurred'}`;
        return <div>{errorMessage}</div>;
    }

    return (
        <div className={styles.container}>
            <button className={styles.back__button} onClick={handleBackMainPage}>К Новостям</button>
            {news && (
                <div className={styles.content}>
                    <h1 className={styles.title}>{news.title}</h1>
                    <p className={styles.author}>Автор: {news.by}</p>
                    <p className={styles.date}>Опубликовано: {new Date(news.time * 1000).toLocaleString()}</p>
                    <p className={styles.comments__count}><strong>Комментарии: </strong>{news.descendants || 0}</p>
                    <a className={styles.link} href={news.url} target="_blank" rel="noopener noreferrer">Страница новости</a>
                    <div className={styles.comments__section}>
                        <h2>Комментарии:</h2>
                        {news.kids && news.kids.length > 0 ? (
                            news.kids.map((commentId: number) => (
                                <Comments key={commentId} commentId={commentId} />
                            ))
                        ) : (
                            <div className={styles.no__comments}>Комментариев нет.</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsPage;