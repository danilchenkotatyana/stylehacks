
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from './filters.scss';

const Filters = () => {


    const [showFilter, setShowFilter] = useState(false);
    const [activeItem, setActiveItem] = useState(false);

    const isShowFilters = () => {
        setShowFilter(true);
        if (showFilter) {
            setShowFilter(false);
        }

    }  
    const isactiveItem = () => {
        setActiveItem(true);
        if (activeItem) {
            setActiveItem(false);
        }

	}

	const row = styles['filters__row'];
	const active = styles['active'];

	return <>
		<div className={styles.filters}>
			<div className={styles['filters__title']}>
                <div onClick={isShowFilters} className={styles['filters__button']}>Filters</div>
			</div>
            {showFilter && <div className={styles['filters__container']}>
				<div className={styles['filters__table']}>
					<div className={styles['filters__column']}>
						<div className={styles['filters__column-title']}>
							Age
							<div className={styles['filters__column-reset']}>Reset</div>
						</div>
						<div className={classNames(row, {[`${active}`]: 1})}>
							<div className={styles['filters__row-value']}>&#60;&nbsp;20</div>
							<div className={styles['filters__row-reset']}>Delete</div>
						</div>
						<div className={styles['filters__row']}>
							<div className={styles['filters__row-value']}>21-32</div>
							<div className={styles['filters__row-reset']}>Delete</div>
						</div>
						<div className={styles['filters__row']}>
							<div className={styles['filters__row-value']}>33-43</div>
							<div className={styles['filters__row-reset']}>Delete</div>
						</div>
						<div className={styles['filters__row']}>
							<div className={styles['filters__row-value']}>44-53</div>
							<div className={styles['filters__row-reset']}>Delete</div>
						</div>
						<div className={styles['filters__row']}>
							<div className={styles['filters__row-value']}>54&nbsp;&#43;</div>
							<div className={styles['filters__row-reset']}>Delete</div>
						</div>
					</div>
					<div className={styles['filters__column']}>
						<div className={styles['filters__column-title']}>
							Body Type
							<div className={styles['filters__column-reset']}>Reset</div>
						</div>
						<div className={styles['filters__row']+[' active']}>
							<div className={styles['filters__row-value']}>Slim</div>
							<div className={styles['filters__row-reset']}>Delete</div>
						</div>
						<div className={styles['filters__row']}>
							<div className={styles['filters__row-value']}>Athletic</div>
							<div className={styles['filters__row-reset']}>Delete</div>
						</div>
						<div className={styles['filters__row']}>
							<div className={styles['filters__row-value']}>Curvy</div>
							<div className={styles['filters__row-reset']}>Delete</div>
						</div>
						<div className={styles['filters__row']}>
							<div className={styles['filters__row-value']}>Full Figured</div>
							<div className={styles['filters__row-reset']}>Delete</div>
						</div>
						<div className={styles['filters__row']}>
						</div>
					</div>
					<div className={styles['filters__column']}>
						<div className={styles['filters__column-title']}>
                         Clothing size
							<div className={styles['filters__column-reset']}>Reset</div>
						</div>
						<div className={styles['filters__row']+[' active']}>
							<div className={styles['filters__row-value']}>Small</div>
							<div className={styles['filters__row-reset']}>Delete</div>
						</div>
						<div className={styles['filters__row']}>
							<div className={styles['filters__row-value']}>Medium</div>
							<div className={styles['filters__row-reset']}>Delete</div>
						</div>
						<div className={styles['filters__row']}>
							<div className={styles['filters__row-value']}>Large</div>
							<div className={styles['filters__row-reset']}>Delete</div>
						</div>
						<div className={styles['filters__row']}>
							<div className={styles['filters__row-value']}>Plus Size</div>
							<div className={styles['filters__row-reset']}>Delete</div>
						</div>
						<div className={styles['filters__row']}>
						</div>
					</div>
					<div className={styles['filters__column']}>
						<div className={styles['filters__column-title']}>
                         Color
							<div className={styles['filters__color-indicator']}>black</div>
							<div className={styles['filters__column-reset']}>Reset</div>
						</div>
						<div className={styles['filters__row']}>
							<div className={styles['filters__row-round']}>black</div>
						</div>
					</div>
				</div>
				<div onClick={isShowFilters} className={styles['filters__close']}>
					Hide filters
				</div>
			</div> }
		</div>
	</>
};

export default Filters;
