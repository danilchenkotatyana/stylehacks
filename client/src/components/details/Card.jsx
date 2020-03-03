import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';

import styles from './detailsCard.scss';

import Rating from '../../components/rating/Rating.jsx';
import Products from './Products.jsx';
import Author from './Author.jsx';
import Product from './Product.jsx';

const Card = ({ item, onVisible, onLike, onDislike, onUnlike, onProductTypeSelected }) => {
	const onChange = (isVisible) => {
		if (isVisible) {
			onVisible(item.outfit.id, item.id);
		}
	};
	return (<VisibilitySensor key={item.id} onChange={onChange} >
		<div className={styles.card}>
			<div className={styles['card__img']}>
				<img src={item.outfit.image_url}
					alt={item.description}
				/>
				<Rating
					item={item}
					onLike={onLike}
					onDislike={onDislike}
					onUnlike={onUnlike} />
			</div>
			<div className={styles['card__info']}>
				<Products
					outfit={item.outfit}
					onProductTypeSelected={onProductTypeSelected} />

				<div className={styles['card__text']}>
					{item.description}
				</div>
				<div className={styles['card__author']}>Photo by&nbsp;
				<Author outfit={item.outfit} />
				</div>
			</div>
		</div>
	</VisibilitySensor>);
}

export default Card;