import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import ReactMapGL, {
	Marker,
	Popup,
	NavigationControl,
	FullscreenControl,
	GeolocateControl,
} from 'react-map-gl';
import useLocation from '../hooks/useLocation';
import pin from '../../images/pin.png';

import { useEarthquakes } from '../../context/EarthquakeContextProvider';
import Card from './Card';
import DisasterForm from './DisasterForm';
import EarthquakeData from './EarthquakeData';
import { useDisasterReports } from '../../context/DisasterReportContextProvider';
import CustomPin from './CustomPin';
import DisasterReport from './DisasterReport';
import { usePopup } from '../../context/PopupContextProvider';

const Map = ({
	earthquakeCheck,
	pendingReportsCheck,
	approvedReportsCheck,
}) => {
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

	const [popupPosition, setPopupPosition] = useState(null);
	const [userPosition, setUserPosition] = useState({});
	const [disasterPopup, setDisasterPopup] = useState({});
	const [showEarthquakes, setShowEarthquakes] = useState({});
	const { state: popupState } = usePopup();

	useEffect(() => {
		if (popupState.longitude !== null) {
			setViewState((vp) => ({
				...vp,
				...popupState,
				zoom: 10,
			}));
		} else if (location) {
			setViewState((vp) => ({
				...vp,
				...location,
				zoom: 8,
			}));

			setUserPosition(location);
		}
	}, [location, setViewState, popupState]);

	const getPopUpPosition = (event) => {
		const { lat: latitude, lng: longitude } = event.lngLat;

		setPopupPosition({ latitude, longitude });
	};

	const closePopup = () => {
		setPopupPosition(null);
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
			<NavigationControl />
			<GeolocateControl />
			<FullscreenControl />

			{!_.isEmpty(userPosition) && (
				<Marker
					latitude={userPosition.latitude}
					longitude={userPosition.longitude}
					anchor='bottom'
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
					closeOnClick={true}
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
						anchor='bottom'
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
						anchor='bottom'
						key={disaster.id}
						onClick={() => setDisasterPopup(disaster)}
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
					<Card>
						<EarthquakeData id={showEarthquakes.id} />
					</Card>
				</Popup>
			)}

			{!_.isEmpty(disasterPopup) && (
				<Popup
					longitude={disasterPopup.longitude}
					latitude={disasterPopup.latitude}
					anchor='left'
					closeOnClick={false}
					onClose={() => setDisasterPopup({})}
				>
					<DisasterReport
						data={disasterPopup}
						setDisasterPopup={setDisasterPopup}
					/>
				</Popup>
			)}

			{approvedReportsCheck &&
				disasterReports.approvedDisasters &&
				disasterReports.approvedDisasters.map((disaster) => (
					<Marker
						longitude={disaster.longitude}
						latitude={disaster.latitude}
						anchor='bottom'
						key={disaster.id}
						onClick={() => setDisasterPopup(disaster)}
					>
						<CustomPin
							avatar={disaster.disaster.avatar}
							viewState={viewState}
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
						<DisasterForm
							latitude={popupPosition.latitude}
							longitude={popupPosition.longitude}
							onClose={closePopup}
						/>
					</Card>
				</Popup>
			)}
		</ReactMapGL>
	);
};

export default Map;
