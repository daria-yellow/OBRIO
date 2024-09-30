import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../constants/confetti.json';

const ConfettiAnimation = () => {
  return <Lottie animationData={animationData} />;
};

export default ConfettiAnimation;
