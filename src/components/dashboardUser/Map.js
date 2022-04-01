import _, { divide } from 'lodash';
import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import useLocation from '../hooks/useLocation';
import pin from '../../images/pin.png';
import crack from '../../images/crack.png';
import { useEarthquakes } from '../../context/EarthquakeContextProvider';
import Card from './Card';
import DisasterForm from './DisasterForm';

const Map = () => {
	const location = useLocation();
	const { state: earthquakeContext } = useEarthquakes();
	const [showPopup, setShowPopup] = useState(false);
	const [viewState, setViewState] = useState({
		zoom: 11,
		latitude: 37.8,
		longitude: -122.4,
	});
	const [status, setStatus] = useState('');
	const [popupPosition, setPopupPosition] = useState(null);
	const [userPosition, setUserPosition] = useState({});

	useEffect(() => {
		if (location) {
			setViewState((vp) => ({
				...vp,
				...location,
				zoom: 8,
			}));

			setUserPosition(location);
		}
	}, [location, setViewState]);

	const getPopUpPosition = (event) => {
		const { lat: latitude, lng: longitude } = event.lngLat;

		setPopupPosition({ latitude, longitude });
	};

	const closePopup = () => {
		setPopupPosition(null);
		setStatus('');
	};

	const createDisaster = () => {
		setStatus('create-disaster');
	};

	const createLocation = () => {
		setStatus('create-location');
	};

	return (
		<ReactMapGL
			{...viewState}
			width={window.innerWidth}
			onMove={(evt) => setViewState(evt.viewState)}
			style={{ width: 'fit', height: window.innerHeight - 80 }}
			mapStyle='mapbox://styles/mapbox/dark-v9'
			mapboxAccessToken='pk.eyJ1IjoibXltdWZmaW4yMCIsImEiOiJjbDFmZjl2NGQwNDg3M2ttajkycGN0cmI0In0.leihkx6W4v53tMPRMy-FBw'
			onDblClick={(e) => getPopUpPosition(e)}
		>
			{!_.isEmpty(userPosition) && (
				<Marker
					latitude={userPosition.latitude}
					longitude={userPosition.longitude}
					anchor='center'
				>
					<img
						src={pin}
						alt=''
						style={{ width: 60, height: 60 }}
						className='cursor-pointer'
					/>
				</Marker>
			)}

			{earthquakeContext.earthquakes &&
				earthquakeContext.earthquakes.map((earthquake) => (
					<Marker
						longitude={earthquake.latitude}
						latitude={earthquake.longitude}
						anchor='center'
						key={earthquake.id}
					>
						<img
							src='https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/60/000000/external-earthquake-landscape-vitaliy-gorbachev-lineal-color-vitaly-gorbachev.png'
							style={{ width: 35, height: 35 }}
							alt='earthquake avatar'
							className='cursor-pointer'
						/>
					</Marker>
				))}

			{popupPosition && (
				<Popup
					longitude={popupPosition.longitude}
					latitude={popupPosition.latitude}
					anchor='left'
					onClose={closePopup}
				>
					<Card>
						{status === '' ? (
							<div className='flex flex-col'>
								<button
									className='popup-button'
									onClick={createDisaster}
								>
									Report a disaster.
								</button>
								<button
									className='popup-button'
									onClick={createLocation}
								>
									Save a location.
								</button>
							</div>
						) : status == 'create-disaster' ? (
							<DisasterForm />
						) : (
							<span>hello</span>
						)}
					</Card>
				</Popup>
			)}
		</ReactMapGL>
	);
};

export default Map;
