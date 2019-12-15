import React from "react";
import styles from '../../components/gallery/gallery.scss';

const DataItems = ({ data, onClick }) => {
	return (
		data.map((item, key) => (
			<div className={styles.images} key={key} onClick={() => onClick(item)}>
				<img alt={item.description_style} src={item.outfit.image_url} />
			</div>
		))
	);

};
export default DataItems;