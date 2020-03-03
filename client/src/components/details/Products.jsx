import React from 'react';

import styles from './detailsCard.scss';

import Product from './Product.jsx';

const MAX_PRODUCTS = 10;

const Products = ({ outfit, onProductTypeSelected }) => {
	let index = 1;
	const items = [];
	for (let index = 1; index <= MAX_PRODUCTS; index++) {
		const product = outfit['product_type' + index];
		const key = outfit.id + '.' + index;
		if (product) {
			items.push(<Product
				key={key}
				product={product}
				onProductTypeSelected={onProductTypeSelected} />);
		}
	}
	return <div className={styles['card__icons']}>{items}</div>;
};

export default Products;