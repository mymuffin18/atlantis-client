import { useEffect, useState } from 'react';

const options = {
	maximumAge: 60000,
	timeout: 5000,
	enableHighAccuracy: true,
};
export default function useLocation() {
	const [location, setLocation] = useState({});

	useEffect(() => {
		(async () => {
			const onSuccess = ({ coords: { latitude, longitude } }) => {
				setLocation({
					latitude,
					longitude,
				});
			};

			const onError = (error) => {
				console.error(error);
			};

			navigator.geolocation.getCurrentPosition(
				onSuccess,
				onError,
				options
			);
		})();
	}, []);

	return location;
}
