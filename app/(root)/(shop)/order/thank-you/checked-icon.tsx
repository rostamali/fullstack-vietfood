'use client';
import Lottie from 'lottie-react';
import animateDate from '../../../../../public/assets/checked.json';

const CheckedIcon = () => {
	return <Lottie animationData={animateDate} loop={true} />;
};

export default CheckedIcon;
