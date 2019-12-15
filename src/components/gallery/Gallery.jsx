import React, { useState } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import Masonry from 'react-masonry-component';
import styles from './gallery.scss';
// Components
import Loader from '../../components/loader/Loader.jsx';
import DetailsCard from '../../components/detailsCard/DetailsCard.jsx';
import DataItems from '../../components/dataItems/DataItems.jsx';

const masonryOptions = {
	fitWidth: true
};

const Gallery = ({ data, outfitsLoader, loading, singleResult }) => {

	let v = singleResult && data && data.length ? data[0] : null;
	const [activeItem, setActiveItem] = useState(v);

	const onClose = () => {
		v = null;
		setActiveItem(null);
	}
	
	return (
		<>
			{
				!!v || !!activeItem
					? (
						<InfiniteScroll
							initialLoad={false}
							className={styles.details}
							loadMore={outfitsLoader}
							hasMore={!singleResult}
							loader={<Loader active={loading} />}
						>
							<DetailsCard 
								data={data} 
								activeItem={activeItem || v} 
								singleResult={singleResult} 
								onClose={onClose}/>
						</InfiniteScroll>
					) : (
						<InfiniteScroll
							initialLoad={false}
							loadMore={outfitsLoader}
							hasMore={!singleResult}
							loader={<Loader active={loading} />}

						>
							<Masonry
								key="outfits"
								className={styles.gallery}
								options={masonryOptions}
							>
								<DataItems data={data} onClick={setActiveItem} />
							</Masonry>
						</InfiniteScroll>
					)
			}
		</>
	)
};


export default Gallery;
