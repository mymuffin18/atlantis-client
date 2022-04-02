import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { addReport, getDisasterTypes } from '../../api/disaster_reports';
import { useDisasterReports } from '../../context/DisasterReportContextProvider';
import { useUserAuth } from '../../context/UserAuthContextProvider';

const DisasterForm = ({ latitude, longitude, onClose }) => {
	const [disasterId, setDisasterId] = useState('');
	const [description, setDescription] = useState('');
	const [datetime, setDateTime] = useState('');
	const [images, setImages] = useState(undefined);
	const [disasterLevel, setDisasterLevel] = useState('');
	const [loading, setLoading] = useState(false);
	const [disasterIdErrors, setDisasterIdErrors] = useState([]);
	const [descriptionErrors, setDescriptionErrors] = useState([]);
	const [datetimeErrors, setDatetimeErrors] = useState([]);
	const [imagesErrors, setImagesErrors] = useState([]);
	const [disasterLevelErrors, setDisasterLevelErrors] = useState([]);
	const [options, setOptions] = useState([]);
	const { dispatch: reportsDispatch } = useDisasterReports();
	const { state: userState, dispatch: userDispatch } = useUserAuth();

	useEffect(() => {
		(async () => {
			setLoading(true);
			const { data, status } = await getDisasterTypes(userState.token);
			if (status === 401) {
				setLoading(false);
				onClose();
				userDispatch({ type: 'LOGOUT' });
			}
			setOptions(data);
			console.log(options);
			setLoading(false);
		})();
	}, []);

	const handleSubmit = async () => {
		console.log('working');
		console.log('latitude', latitude);
		console.log('longitude', longitude);
		setLoading(true);
		const { return_data, status, errors } = await addReport(
			{
				disaster_id: disasterId,
				description: description,
				date_occured: datetime,
				disaster_level: disasterLevel,
				latitude,
				longitude,
			},
			userState.token
		);

		if (status === 401) {
			setLoading(false);
			onClose();
			userDispatch({ type: 'LOGOUT' });
		} else if (!_.isEmpty(errors)) {
			setDisasterIdErrors(errors.disaster);
			setDescriptionErrors(errors.description);
			setDatetimeErrors(errors.date_occured);
			setImagesErrors(errors.images);
			setDisasterLevelErrors(errors.disaster_level);
			setLoading(false);
		} else {
			setLoading(false);
			reportsDispatch({
				type: 'CREATE_DISASTER',
				payload: return_data,
			});
			onClose();
		}
	};
	return (
		<div className='flex flex-col gap-2'>
			<div className='text-lg text-center'>Report a disaster</div>
			<div className=''>
				<label htmlFor='disaster'>Disaster:</label>
				<select
					name=''
					value={disasterId}
					onChange={(e) => setDisasterId(e.target.value)}
					id=''
					className='p-2'
				>
					<option value=''></option>
					{options &&
						options.map((option) => (
							<>
								<option
									value={option.id}
									key={option.id}
								>
									{option.disaster_type}
								</option>
							</>
						))}
				</select>
				{disasterIdErrors &&
					disasterIdErrors.map((err, index) => (
						<div className='block' key={index}>
							<span className='text-xs text-red-500'>
								{err}
							</span>
						</div>
					))}
			</div>
			<div className='flex flex-col'>
				<label htmlFor='desciption'>Description</label>
				<input
					type='text'
					value={description}
					className='border-2 p-2'
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>
			<div className='flex flex-col'>
				<label htmlFor='date'>Date</label>
				<input
					type='datetime-local'
					value={datetime}
					onChange={(e) => setDateTime(e.target.value)}
					className='p-2 block border'
				/>
			</div>
			{/* <div>
				<label htmlFor='images'>Images</label>
				<input
					type='file'
					onChange={(e) =>
						setImages(URL.createObjectURL(e.target.files[0]))
					}
				/>
			</div> */}
			<div>
				<label htmlFor='disaster-level'>Disaster level: </label>
				<select
					className='p-2'
					value={disasterLevel}
					onChange={(e) => setDisasterLevel(e.target.value)}
				>
					<option value='good'>Good</option>
					<option value='moderate'>Moderate</option>
					<option value='danger'>Danger</option>
				</select>
			</div>
			<div className='flex justify-center'>
				{loading ? (
					<span>Loading..</span>
				) : (
					<button
						className='button button-blue'
						disabled={loading}
						onClick={handleSubmit}
					>
						Submit
					</button>
				)}
			</div>
		</div>
	);
};

export default DisasterForm;
