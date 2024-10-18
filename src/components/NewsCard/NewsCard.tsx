import { useGetNewsQuery } from "@/services/hackerNewsApi";
import styles from './styles.module.css';
import { useNavigate } from "react-router-dom";

interface Props {
    id: number;
}
const NewsCard = ({ id }: Props) => {
    const { data: news, error, isLoading } = useGetNewsQuery(id);
    const navigate = useNavigate();

    const goToNewsPage = (id: number) => {
        navigate(`/${id}`);
    };

    if (isLoading) return (<li>Loading...</li>);
    if (error || !news) return (<li>Error loading news</li>);
    const publicationDate = new Date(news.time * 1000).toLocaleString();
    return (
        <li onClick={() => goToNewsPage(id)} className={styles.news__card}>
            <h3>{news.title}</h3>
            <p>
                <strong>Рейтинг:</strong> {news.score} <br />
                <strong>Автор:</strong> {news.by} <br />
                <strong>Опубликовано:</strong> {publicationDate}
            </p>
        </li>
    );
};

export default NewsCard;