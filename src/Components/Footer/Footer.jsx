import React from 'react';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa6';
import img11 from '../../assets/Black Gold Elegant Initial Name Beauty and Spa Logo.png'

const Footer = () => {
    return (
        <footer className="bg-gray-800 mt-8">
        <div className="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 sm:space-y-0 sm:flex-row">
            <a className=' flex gap-3 items-center'>
                <img className="w-auto h-8" src={img11} alt="" />
                <h3 className='lg:text-4xl md:text-2xl font-bold font-palyfair text-white text-3xl'>Contest Carze</h3>
            </a>

            <p className="text-sm text-gray-400 pt-6">© Copyright 2023. All Rights Reserved.</p>

            <div className="flex pr-5 gap-5 text-4xl text-blue-600">
                <a href="https://www.facebook.com/profile.php?id=100067749370411" target='_blank'><FaFacebook></FaFacebook></a>
                <a href="https://www.linkedin.com/in/md-hamim-9047b6307/" target='_blank'><FaLinkedin></FaLinkedin></a>
                <a href="https://twitter.com/" target='_blank'><FaTwitter></FaTwitter></a>
            </div>
        </div>
    </footer>
    );
};

export default Footer;