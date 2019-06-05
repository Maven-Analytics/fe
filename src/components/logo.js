import React from 'react';
import PropTypes from 'prop-types';

const Logo = ({height, width}) => {
  return (
    <div className="logo" style={{height: height ? height : null, width: width ? width : null}}>
      {/* <img src="/static/img/logo-light.svg" alt="Maven Analytics Logo"/> */}
      <svg viewBox="0 0 640.01 153.09">
        <defs>
          <linearGradient id="linear-gradient" x1="80.9" y1="2.87" x2="127.8" y2="146.87" gradientTransform="matrix(1, 0, 0, -1, 0, 156)" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#54aaba"/>
            <stop offset="0.12" stopColor="#71b9b6"/>
            <stop offset="0.7" stopColor="#f9fea5"/>
          </linearGradient>
        </defs>
        <title>MA-logo</title>
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <path className="cls-1" d="M14.79,151.7l37.38-24,74.56-48,56.13-36.11,4.65-3c4.47-2.79,10.09,1.08,8,6.3C192,55.28,187.79,63.42,184,71.63l-18.68,40.24-6.61,14.26c-1.06,2.27-2.18,6.07-4.5,7.35a5.29,5.29,0,0,1-7.16-2.17c-.06-.11-.11-.23-.17-.35-.29-.61-.51-1.27-.75-1.89l-3.81-9.57L128.08,83.78,99.39,11.62C98.68,9.84,98,8,97.26,6.27A9.81,9.81,0,0,0,79.75,4.68c-3,4.72-5.67,9.67-8.49,14.48L28.87,91.44,9.56,124.37c-2.77,4.72-5.73,9.38-8.33,14.2A9.77,9.77,0,0,0,14.79,151.7c2.5-1.47.23-5.38-2.29-3.9a5.22,5.22,0,0,1-7.36-7c.17-.33.38-.64.57-1l4.2-7.16L27,103.45,70.91,28.7,83,8.19c.24-.4.46-.82.72-1.22a5.26,5.26,0,0,1,7.23-1.78A5.16,5.16,0,0,1,92.31,6.4c1.12,1.46,1.63,3.58,2.3,5.25l28.16,70.81,14.51,36.48,4.17,10.48c1.1,2.78,2,5.61,4.61,7.44,5.38,3.82,12.1,1.12,14.72-4.46,1.52-3.23,3-6.48,4.51-9.71l17.79-38.44L198,52.11c1.69-3.66,3.49-7.21,1.65-11.32-2.59-5.76-9.39-7.26-14.53-4-14.61,9.18-29,18.67-43.54,28L66.57,113,15.08,146.15,12.5,147.8C10.07,149.37,12.33,153.28,14.79,151.7Z"/>
            <path className="cls-2" d="M245.24,43.88c2.24,0,3.72,1.09,4.8,3.54L269.19,90c2.2,5,4.93,7.1,9.4,7.1s7.19-2,9.4-7.09l19.14-42.64c1.09-2.44,2.57-3.53,4.81-3.53,3,0,4.7,1.69,4.7,4.62V96h5.57V48.25c0-6-3.9-9.51-10.7-9.51-4.41,0-7.23,2-9.14,6.34L283.06,88.64c-1.06,2.21-2.25,3-4.39,3s-3.32-.81-4.37-3L255,45.08c-1.93-4.26-5-6.34-9.32-6.34-6.79,0-10.69,3.47-10.69,9.51V96h5.56V48.5C240.53,45.57,242.25,43.88,245.24,43.88Z"/>
            <path className="cls-2" d="M349.77,83.7H399l5.58,10.81a6.26,6.26,0,0,1,.62,1.49h6.71a7,7,0,0,0-.63-1.36L387.08,48c-3.43-6.68-7-9.28-12.83-9.28-6.89,0-9.79,3.36-13.67,10.89L338,94.55c-.24.54-.42,1-.57,1.4H344l.52-1.48ZM367,48.7c1.7-3.14,4-4.6,7.17-4.6,3,0,5.42,1.62,7,4.68l15.3,30H352.22Z"/>
            <path className="cls-2" d="M480.47,41.43c.25-.54.42-1,.58-1.41h-6.63l-.52,1.49L451.43,87.14c-1.73,3.19-3.92,4.61-7.09,4.61-2.94,0-5.34-1.62-6.91-4.68L414,41.46a6.56,6.56,0,0,1-.61-1.44h-6.8a6.72,6.72,0,0,0,.63,1.36l24.18,46.49c3.42,6.67,7,9.27,12.82,9.27,6.9,0,9.8-3.35,13.68-10.88Z"/>
            <path className="cls-2" d="M494.71,88.75c0,4.85,2.39,7.2,7.3,7.2h51.61V90.73H503a2.59,2.59,0,0,1-2.84-2.29,4.86,4.86,0,0,1,0-.54V70.51h53.18V65.29H500.19v-17a2.59,2.59,0,0,1,2.37-2.76,2.44,2.44,0,0,1,.47,0h50.59V40H502.09c-5,0-7.38,2.27-7.38,7Z"/>
            <path className="cls-2" d="M580.31,44.05A5.34,5.34,0,0,1,585,46.48L620.16,92.6c2.51,3.27,5.36,4.54,10.18,4.54,6,0,9.67-3.64,9.67-9.5V40h-5.56V87.38c0,3.2-2.49,4.62-5,4.62a5.81,5.81,0,0,1-4.72-2.18L589.3,43.45c-2.71-3.61-4.89-4.71-9.33-4.71-6.21,0-9.93,3.53-9.93,9.42V96h5.57V48.42C575.61,45.73,577.41,44.05,580.31,44.05Z"/>
            <path className="cls-2" d="M300.38,114.29h-3.07l-8.09,18.51v.09h3.45l1.88-4.42h8.59l1.84,4.38h3.55l-8.11-18.56Zm1.48,11.19h-6.11l3-7.1Z"/>
            <polygon className="cls-2" points="342.1 126.98 332.4 114.45 332.38 114.43 329.29 114.43 329.29 132.9 332.6 132.9 332.6 119.97 342.59 132.87 342.61 132.9 345.41 132.9 345.41 114.43 342.1 114.43 342.1 126.98"/>
            <path className="cls-2" d="M377.39,114.29h-3.07l-8.09,18.51v.09h3.45l1.88-4.42h8.59l1.84,4.38h3.55l-8.11-18.56Zm1.48,11.19h-6.11l3-7.1Z"/>
            <polygon className="cls-2" points="409.66 114.43 406.31 114.43 406.31 132.9 419.3 132.9 419.3 129.83 409.66 129.83 409.66 114.43"/>
            <polygon className="cls-2" points="444.04 122.46 438.99 114.46 438.97 114.43 434.98 114.43 442.32 125.62 442.32 132.9 445.7 132.9 445.7 125.54 452.98 114.53 453.04 114.43 449.19 114.43 444.04 122.46"/>
            <polygon className="cls-2" points="472.18 117.54 478 117.54 478 132.9 481.38 132.9 481.38 117.54 487.2 117.54 487.2 114.43 472.18 114.43 472.18 117.54"/>
            <rect className="cls-2" x="508.46" y="114.43" width="3.35" height="18.47"/>
            <path className="cls-2" d="M548.35,127.71h0a7.06,7.06,0,0,1-5.22,2.34,6.09,6.09,0,0,1-6-6.43h0a6.14,6.14,0,0,1,5.87-6.4h.13a7.2,7.2,0,0,1,5.09,2.26v0l2.16-2.52h0a9.6,9.6,0,0,0-7.22-2.87,9.35,9.35,0,0,0-9.53,9.15v.4h0a9.61,9.61,0,0,0,2.68,6.74,9.32,9.32,0,0,0,6.72,2.76,9.43,9.43,0,0,0,7.48-3.27v0l-2.12-2.14Z"/>
            <path className="cls-2" d="M578.72,122.13c-3.39-.81-4.32-1.41-4.32-2.82h0c0-1.26,1.17-2.11,2.92-2.11a8.15,8.15,0,0,1,4.93,1.87h.06l1.8-2.54h0a10.28,10.28,0,0,0-6.69-2.32c-3.73,0-6.33,2.22-6.33,5.39h0c0,3.41,2.17,4.57,6.16,5.54,3.47.8,4.09,1.52,4.09,2.74v.05c0,1.34-1.28,2.24-3.19,2.24a8.35,8.35,0,0,1-5.74-2.37h0l-2,2.4.05.05a11.39,11.39,0,0,0,7.69,2.95c4,0,6.62-2.18,6.62-5.54v-.06C584.64,124.69,583,123.16,578.72,122.13Z"/>
          </g>
        </g>
      </svg>
    </div>
  );
};

Logo.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

export default Logo;