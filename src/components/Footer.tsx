import React from 'react';
// import { assets } from '../assets/assets';
// import { useNavigate } from 'react-router-dom';
import { logo } from '../assets';

const Footer:React.FC = () => {


    // const navigate = useNavigate()
    return (
        <div>
            <div className='flex text-white bg-gradient-to-r from-[#36014b]  to-[#c804d7] px-4 flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mt-0 text-sm'>
                <div>
                    <h4 className='cursor-pointer text-[26px] font-[600] mb-5'>
                        <img className='w-32 -mb-12 -ml-6' src={logo} />
                    </h4>
                    <p className='w-full md:w-2/3 text-gray-300'>
                        Looking for quality service you can trust? We offer exceptional care and smooth booking.
                        Slots fill up fast — book now!
                    </p>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-300'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Bookings</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div>
                    <p className='text-xl font-medium mb-3'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 mb-6 text-gray-300'>
                        <li>buzzthrills941@gmail.com</li>
                    </ul>
                </div>
            </div>

            <div>
                {/* <hr /> */}
                <p className='py-5 text-[8px]  bg-gradient-to-r from-[#36014b]  to-[#c804d7] text-white text-center'>
                    Copyright 2025 by Daniel Success — All rights reserved
                </p>
            </div>
        </div>

    );
}

export default Footer;
