import { useGetCommentQuery } from '@/services/hackerNewsApi';
import { useState } from 'react';
import styles from './styles.module.css';


interface Props {
    commentId: number;
}


const Comments = ({ commentId }: Props) => {
    const { data: comment, error, isLoading } = useGetCommentQuery(commentId);
    const [showReplies, setShowReplies] = useState(false);

    if (isLoading) return <div className={styles.loading}>Загрузка комментария...</div>;
    if (error) return <div className={styles.error}>Ошибка при загрузке комментария</div>;

    return (
        <>
            {comment && (
                <div className={styles.comment} >
                    <p className={styles.comment__author}><strong>{comment.by}</strong> - {new Date(comment.time * 1000).toLocaleString()}</p>
                    <div className={styles.comment__text} dangerouslySetInnerHTML={{ __html: comment.text }} />
                    {comment.kids && comment.kids.length > 0 && (
                        <>
                            <div style={{ textAlign: 'right' }}>
                                <button className={styles.toggle__replies} onClick={() => setShowReplies(!showReplies)}>
                                    {showReplies ? 'Скрыть ответы' : 'Показать ответы'}
                                </button>
                            </div>
                            {showReplies && (
                                <div className={styles.replies} >
                                    {
                                        comment.kids.map((replyId: number) => (
                                            <Comments key={replyId} commentId={replyId} />
                                        ))
                                    }
                                </div >
                            )}
                        </>
                    )
                    }
                </div >
            )}
        </>
    );
};

export default Comments;