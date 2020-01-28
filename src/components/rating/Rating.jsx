import React from "react";
import styles from './rating.scss';

const Rating = ({ item, onLike, onDislike }) => {
    const like = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onLike(item.outfit.id);
    }
    const dislike = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onDislike(item.outfit.id);
    }
	return (
        <div className={styles.rating}>
            <div className={styles.rating_icon} onClick={dislike}>&#10006;</div>
            <div className={styles.rating_icon} onClick={like}>&#10084;</div>
        </div>
	);

};
export default Rating;