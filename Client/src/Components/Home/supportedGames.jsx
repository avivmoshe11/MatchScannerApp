import '../../Styles/supportedGames.css';
import ImageCard from '../Common/imageCard';
import { useEffect, useState, useRef } from 'react';

import leaguePic from '../../Assets/images/league.jpg';

const SupportedGames = () => {
  const images = [leaguePic, leaguePic, leaguePic, leaguePic, leaguePic];

  //Aviv Addon solution for page stop scroll
  //shish Putton Avivons code on commentson
  useEffect(() => {
    const container = document.querySelector('.images-section');
    let containerHeight;
    const images = document.querySelectorAll('.imageCard-img');

    document.addEventListener('scroll', () => {
      if (
        // container.getBoundingClientRect().top >= -6 &&
        // container.getBoundingClientRect().top <= 6 &&
        // !containerHeight
        // container.getBoundingClientRect().top >= -6 &&
        container.getBoundingClientRect().top <= 6
      ) {
        containerHeight = window.scrollY;
        for (let i = 0; i < images.length; i++) {
          const image = images[i];

          if (i > 0) {
            if (i === 1) {
              image.style.transform = 'translate(-120%,-50%)';
              image.style.transition = 'all 0.5s';
            }
            if (i === 2) {
              image.style.transform = 'translate(20%, -50%)';
              image.style.transition = 'all 0.5s';
            }

            if (i === 3) {
              image.style.transform = 'translate(-190%, -40%)';
              image.style.transition = 'all 0.5s';
            }

            if (i === 4) {
              image.style.transform = 'translate(90%, -40%)';
              image.style.transition = 'all 0.5s';
            }
          }
        }
      }

      if (container.getBoundingClientRect().top > 40) {
        for (let i = 0; i < images.length; i++) {
          const image = images[i > 0];
          images[i].style.transform = 'translate(-50%, -50%)';
        }
      }
      // if (containerHeight) {
      //   document.documentElement.scrollTop = document.body.scrollTop =
      //     containerHeight;
      // }
    });
  });
  //end of solution
  //KILL ME TY BYE

  return (
    <div className="supportedGames">
      {images.map((img, index) => {
        return <ImageCard imgSrc={img} key={index} />;
      })}
    </div>
  );
};

export default SupportedGames;
