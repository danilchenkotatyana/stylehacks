import React from 'react';

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

export default Author;