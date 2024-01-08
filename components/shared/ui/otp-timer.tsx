'use client';

import { useEffect, useState } from 'react';

const OtpTimer = () => {
	const [timer, setTimer] = useState(60);
	const [isTimerRunning, setIsTimerRunning] = useState(true);

	// useEffect(() => {
	// 	const decrementTimer = () => {
	// 		setTimer((prevTimer) => prevTimer - 1);
	// 	};
	// 	if (isTimerRunning) {
	// 		const id = setInterval(decrementTimer, 1000);
	// 	}
	// 	if (timer === 0) {
	// 		setIsTimerRunning(false);
	// 	}
	// }, [timer, isTimerRunning]);

	return <div>{isTimerRunning && <p>Resend OTP in: {timer} seconds</p>}</div>;
};

export default OtpTimer;
