import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import useLocation from '../hooks/useLocation';
import pin from '../../images/pin.png';

import { useEarthquakes } from '../../context/EarthquakeContextProvider';
import Card from './Card';
import DisasterForm from './DisasterForm';
import EarthquakeData from './EarthquakeData';
import { useDisasterReports } from '../../context/DisasterReportContextProvider';
import CustomPin from './CustomPin';

const Map = ({ earthquakeCheck, pendingReportsCheck }) => {
	const location = useLocation();
	const { state: earthquakeContext } = useEarthquakes();
	const { state: disasterReports } = useDisasterReports();
	const [showCurrentLocationPopup, setShowCurrentLocationPopup] =
		useState(false);
	const [viewState, setViewState] = useState({
		zoom: 11,
		latitude: 37.8,
		longitude: -122.4,
	});
	const [status, setStatus] = useState('');
	const [popupPosition, setPopupPosition] = useState(null);
	const [userPosition, setUserPosition] = useState({});

	const [showEarthquakes, setShowEarthquakes] = useState({});

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

	const hideCurrentLocation = () => {
		setShowCurrentLocationPopup(false);
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
					onClick={(e) => setShowCurrentLocationPopup(true)}
				>
					<img
						src={pin}
						alt=''
						style={{
							height: `${5 * viewState.zoom}px`,
							width: `${5 * viewState.zoom}px`,
						}}
						className='cursor-pointer'
					/>
				</Marker>
			)}

			{showCurrentLocationPopup && (
				<Popup
					longitude={userPosition.longitude}
					latitude={userPosition.latitude}
					anchor='left'
					closeOnClick={false}
					onClose={hideCurrentLocation}
				>
					<Card>Your current location.</Card>
				</Popup>
			)}

			{earthquakeCheck &&
				earthquakeContext.earthquakes &&
				earthquakeContext.earthquakes.map((earthquake) => (
					<Marker
						longitude={earthquake.latitude}
						latitude={earthquake.longitude}
						anchor='center'
						key={earthquake.id}
						onClick={() => setShowEarthquakes(earthquake)}
					>
						<img
							src='https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/60/000000/external-earthquake-landscape-vitaliy-gorbachev-lineal-color-vitaly-gorbachev.png'
							style={{
								height: `${5 * viewState.zoom}px`,
								width: `${5 * viewState.zoom}px`,
							}}
							alt='earthquake avatar'
							className='cursor-pointer'
						/>
					</Marker>
				))}
			{pendingReportsCheck &&
				disasterReports.unapprovedDisasters &&
				disasterReports.unapprovedDisasters.map((disaster) => (
					<Marker
						longitude={disaster.longitude}
						latitude={disaster.latitude}
						anchor='center'
						key={disaster.id}
					>
						<CustomPin
							avatar={disaster.disaster.avatar}
							viewState={viewState}
						/>
					</Marker>
				))}
			{!_.isEmpty(showEarthquakes) && (
				<Popup
					longitude={showEarthquakes.latitude}
					latitude={showEarthquakes.longitude}
					anchor='left'
					closeOnClick={false}
					onClose={() => setShowEarthquakes({})}
				>
					<EarthquakeData id={showEarthquakes.id} />
				</Popup>
			)}

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
						) : status === 'create-disaster' ? (
							<DisasterForm
								latitude={popupPosition.latitude}
								longitude={popupPosition.longitude}
								onClose={closePopup}
							/>
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
