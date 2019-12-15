import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { animateScroll } from 'react-scroll';
import VisibilitySensor from 'react-visibility-sensor';

import styles from './detailsCard.scss';

const Products = ({ outfit }) => {
	let index = 1;
	const items = [];
	let product = outfit['product_type' + index];
	while (product) {
		items.push(<Product key={index} product={product} />);
		product = outfit['product_type' + (++index)];
	}
	return <div className={styles['card__icons']}>{items}</div>;
};

const Product = ({ product }) => (
	<div className={styles['card__icon-box']}>
		<div className={styles['card__icon-box__img']}>
			<img src={product.image_url}
				alt={product.description} />
		</div>
		<div className={styles['card__icons-text']}>{product.name}</div>
	</div>
);

const Card = ({ item, keyP, onVisible }) => {
	const onChange = (isVisible) => {
		if (isVisible) {
			onVisible(item.outfit.id);
		}
	};
	return (<VisibilitySensor key={keyP} onChange={onChange}>
		<div className={styles.card}>
			<div className={styles['card__img']}>
				<img src={item.outfit.image.image_url}
					alt={item.description}
				/>
			</div>
			<div className={styles['card__info']}>
				<Products outfit={item.outfit} />

				<div className={styles['card__text']}>
					{item.description}
				</div>
				<div className={styles['card__author']}>Photo by <a target="_blank"
					alt={item.outfit.image.source_name}
					href={item.outfit.image.source_url}>&#64;{item.outfit.image.source_name}</a>
				</div>
			</div>
		</div>
	</VisibilitySensor>);
}


const DetailsCard = ({ data, activeItem, singleResult, onClose }) => {

	const onVisible = (id) => {
		ReactGA.pageview('/' + id);
		ReactGA.event({
			category: 'outfit',
			action: 'view',
			value: id
		});
		history.replaceState('',
			document.title,
			window.location.pathname + window.location.search + '#' + id);
	}

	useEffect(() => {
		onVisible(activeItem.outfit.id);
		animateScroll.scrollToTop({
			delay:0,
			duration: 0
		});
	}, []);

	const close = () => {
		history.replaceState('', document.title, window.location.pathname + window.location.search);
		onClose();
	};

	const index = data.findIndex((item) => item.id == activeItem.id);
	const dataPart = data.slice(index);

	return (
		<>
			{singleResult ? <></> : <div className={styles['close-icon']} onClick={close}></div>}
			<div className={styles['card-container']}>
				{dataPart.map((item, key) => <Card item={item} keyP={key} onVisible={onVisible} />)}
			</div>
		</>
	);
};

export default DetailsCard;
