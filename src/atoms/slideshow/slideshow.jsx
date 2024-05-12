import React, { useState, useEffect } from 'react';
import './slideshow.css'; 

const Slideshow = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 3000=3s

    return () => clearInterval(intervalId);
  }, [currentIndex, images.length]);

  return (
    <div className="slideshow">
      <img src={images[currentIndex]}/>
    </div>
  );
};

export default Slideshow;
