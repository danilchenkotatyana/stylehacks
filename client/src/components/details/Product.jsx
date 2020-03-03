import React from 'react';
import classNames from 'classnames';

import styles from './detailsCard.scss';

const ClothesTypeClass = styles['card__icon-box'];
const ActiveClass = styles['active'];

const Product = ({ product, onProductTypeSelected }) => {
	const click = (e) => {
		e.stopPropagation();
		e.preventDefault();
		onProductTypeSelected(product);
	}

	return (<div
		className={styles['card__icon-box']}
		onClick={click} >
		<div className={styles['card__icon-box__img']}>
			<img src={product.image_url}
				alt={product.description} />
		</div>
		<div className={styles['card__icons-text']}>{product.name}</div>
	</div >);
};

export default Product;