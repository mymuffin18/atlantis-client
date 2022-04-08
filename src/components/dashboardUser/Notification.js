import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuthContextProvider';
import { getUnapprovedReports } from '../../api/disaster_reports';

function Notification() {
  const [pendingDisasters, setPendingDisasters] = useState([]);
  const { state } = useUserAuth();

  useEffect(() => {
    (async () => {
      const data = await getUnapprovedReports(state.token);
      setPendingDisasters(data.data);
      console.log(pendingDisasters);
    })();
  }, []);

  return (
    <div className='h-screen'>
      {/* <Header /> */}
      <div className='flex flex-col'>
        <div className='w-full bg-black flex flex-row items-center h-1/12'>
          <div className=' text-white text-4xl lg:text-5xl w-2/3 lg:w-4/5 md:ml-12 xs:ml-2 bg-blue-300'>
            ATLANTIS
          </div>
          <div className=' w-1/3 flex justify-end gap-2 bg-green-400'>
            <Link to='/user'>
              {' '}
              <button className='btn btn-primary'>some</button>
            </Link>
          </div>
        </div>
        <div>
          <h1>Notification</h1>
          <div>
            {pendingDisasters.length > 0 &&
              pendingDisasters.map((disaster) => (
                <p className='text-xs'>
                  A reported {disaster.disaster.disaster_type} at{' '}
                  {new Date(disaster.date_occured).toLocaleString()}
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
