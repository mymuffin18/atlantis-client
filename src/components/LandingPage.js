import React from 'react';
import map1 from './images/map1.png';
import map2 from './images/map2.png';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className='h-screen widthko'>
      <div className='w-screen bg-black flex flex-row items-center h-1/12'>
        <div className='text-white text-3xl lg:text-5xl w-5/6 lg:w-4/5 ml-12'>
          ATLANTIS
        </div>
        <div className='w-1/6 lg:w-1/5 flex flex-row justify-end lg:mr-12'>
          <Link to='/register'>
            <button className=' bg-white rounded-full text-black px-5 py-1 mx-1 lg:mx-5 font-semibold'>
              <span className='whitespace-nowrap'>Sign Up</span>
            </button>{' '}
          </Link>
          <Link to='/user'>
            <button className='bg-white rounded-full text-black px-5 py-1 mx-1 lg:mx-5 sm:mr-24 lg:mr-0 font-semibold'>
              Login
            </button>
          </Link>
        </div>
      </div>
      <div className='h-1/2'>
        <img className='map1' src={map1} />
      </div>
      <div className='flex flex-row h-1/3 bg-red-500'>
        <div className='w-1/2 flex justify-center items-center bg-white'>
          <div className='w-fit'>
            <h1 className='text-xl lg:text-2xl font-bold'>
              Inform others by <br /> pinning occuring <br /> natural disasters{' '}
              <br /> near you!
            </h1>
          </div>
        </div>
        <div className='w-1/2 flex justify-center items-center bg-white'>
          <div className='w-fit flex justify-center items-center'>
            <img className='map2' src={map2} />
          </div>
        </div>
      </div>
      <div className='bg-black w-screen flex justify-center items-center h-1/12'>
        <div className='text-white'>
          created by: Joshua Gorospe and Keith Pineda
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
