import React from 'react';

const CustomPin = ({ avatar, viewState }) => {
	return (
		<img
			src={avatar}
			style={{
				height: `${5 * viewState.zoom}`,
				width: `${5 * viewState.zoom}`,
			}}
			alt='custom marker'
		/>
	);
};

export default CustomPin;
