import React, { useEffect, useState } from "react";
import classNames from 'classnames';
import styles from './rating.scss';

export const UNDEFINED = 0;
export const YES = 1;
export const NO = 2;

const Rating = ({ item, onLike, onDislike, onUnlike }) => {

    const [liked, setLiked] = useState(item.liked || UNDEFINED);

    const dislikeClass = styles['dislike_icon'];
    const likeClass = styles['like_icon'];
    const activeClass = styles['active'];
    const hiddenClass = styles['hidden'];
    
    const like = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.target.classList.contains(activeClass)) {
            onUnlike(item);
            setLiked(UNDEFINED);
            return;
        }
        onLike(item);
        setLiked(YES);
    }
    const dislike = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.target.classList.contains(activeClass)) {
            onUnlike(item);
            setLiked(UNDEFINED);
            return;
        }
        onDislike(item);
        setLiked(NO);
    }

    const dislikeIcon = classNames(dislikeClass, {[`${activeClass}`]: liked == NO}, {[`${hiddenClass}`]: liked == YES});
    const likeIcon = classNames(likeClass, {[`${activeClass}`]: liked == YES}, {[`${hiddenClass}`]: liked == NO});

	return (
        <div className={classNames(styles.rating, {[`${activeClass}`]: liked != UNDEFINED})}>
            <div 
                className={dislikeIcon}
                onClick={dislike}
            ></div>
            <div 
                className={likeIcon}
                onClick={like}
            ></div>
        </div>
	);
};
export default Rating;