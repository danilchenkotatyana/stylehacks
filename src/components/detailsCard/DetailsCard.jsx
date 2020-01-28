import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { animateScroll } from 'react-scroll';
import VisibilitySensor from 'react-visibility-sensor';

import styles from './detailsCard.scss';
import Loader from '../../components/loader/Loader.jsx';
import Rating from '../../components/rating/Rating.jsx';

const MAX_PRODUCTS = 10;

const Products = ({ outfit }) => {
	let index = 1;
	const items = [];
	for (let index = 1; index <= MAX_PRODUCTS; index++) {
		const product = outfit['product_type' + index];
		if (product) {
			items.push(<Product key={index} product={product} />);
		}
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

const Author = ({ outfit }) => {
	if (outfit.is_source_alive) {
		return (
			<a target="_blank"
				alt={outfit.source_name}
				href={["https://www.instagram.com/"] + [outfit.source_name]}>
				&#64;{outfit.source_name}
			</a>
		);
	}
	return (
		<>{outfit.source_name}</>
	)
}

const Card = ({ item, onVisible, onLike, onDislike }) => {
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
				<Rating item={item} onLike={onLike} onDislike={onDislike} />
			</div>
			<div className={styles['card__info']}>
				<Products outfit={item.outfit} />

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


const DetailsCard = ({ data,
	activeItem,
	onClose,
	onLike,
	onDislike,
	loading,
	outfitsLoader,
	singleResult }) => {
	let visibleSuggestionId = activeItem.id;

	const onVisible = (outfitId, suggestionId) => {
		visibleSuggestionId = suggestionId;
		ReactGA.pageview('/' + outfitId);
		ReactGA.event({
			category: 'outfit',
			action: 'view',
			value: outfitId
		});
		history.replaceState('',
			document.title,
			window.location.pathname + window.location.search + '#' + outfitId);
	}

	useEffect(() => {
		onVisible(activeItem.outfit.id, activeItem.id);
		animateScroll.scrollToTop({
			delay: 0,
			duration: 0
		});
	}, []);

	const close = () => {
		history.replaceState('', document.title, window.location.pathname + window.location.search);
		onClose(visibleSuggestionId);
	};

	const index = data.findIndex((item) => item.id == activeItem.id);
	const dataPart = data.slice(index);

	return (
		<div className={styles['details']}>
			<div className={styles['close-icon']} onClick={close}></div>
			<div className={styles['card-container']}>
				{dataPart.map((item, key) => <Card
					item={item}
					onVisible={onVisible}
					onLike={onLike}
					onDislike={onDislike} />)}
			</div>
			{!singleResult && <Loader active={loading} outfitsLoader={outfitsLoader} />}
		</div>
	);
};

export default DetailsCard;
