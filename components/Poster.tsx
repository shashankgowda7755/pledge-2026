import React from 'react';
import { Pledge, UserData } from '../types';

interface PosterProps {
  pledge: Pledge;
  userData: UserData;
  innerRef?: React.RefObject<HTMLDivElement>;
  id?: string;
}

const Poster: React.FC<PosterProps> = ({ pledge, userData, innerRef, id }) => {
  // Dynamic font size calculation matching HTML logic
  const calculateNameFontSize = (name: string) => {
    const containerHeight = 1300;
    const charCount = name.length || 1;
    // Formula from HTML: size = containerHeight / (charCnt * 0.77)
    let fontSize = Math.floor(containerHeight / (charCount * 0.77));
    const minSize = 60;
    const maxSize = 250;
    return Math.max(minSize, Math.min(maxSize, fontSize));
  };

  const nameFontSize = calculateNameFontSize(userData.fullName);

  return (
    <div
      ref={innerRef}
      id={id || "pledge-poster"}
      className="w-[1080px] h-[1440px] relative overflow-hidden bg-white"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/poster_2026_updated.png"
          alt="Certificate Background"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-stone-100 -z-10 flex items-center justify-center text-stone-400">
          <span className="text-2xl font-bold uppercase tracking-widest">Poster 2026</span>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full">

        {/* Left Sidebar - Name Overlay */}
        <div className="absolute top-0 left-0 w-[250px] h-full z-20 flex items-center justify-center pointer-events-none">
          {/* We use a container to handle the rotation safely */}
          <div className="w-[1440px] h-[250px] flex items-center justify-center transform -rotate-90 origin-center">
            <h2
              className="font-black text-[#e63946] uppercase text-center leading-none whitespace-nowrap"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: `${nameFontSize}px`
              }}
            >
              {userData.fullName || 'YOUR NAME'}
            </h2>
          </div>
        </div>

        {/* Photo Overlay */}
        <div
          className="absolute rounded-full overflow-hidden z-10 border-[4px] border-white shadow-inner bg-stone-200"
          style={{
            width: '590px',
            height: '590px',
            top: '330px',
            left: '50%',
            transform: 'translateX(-50%)',
            marginLeft: '30px'
          }}
        >
          {userData.photo ? (
            <img src={userData.photo} alt="User" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-400 font-bold text-3xl">PHOTO</span>
            </div>
          )}
        </div>

        {/* Pledge Text - Red Box */}
        <div
          className="absolute z-20 flex items-center justify-start p-10 bg-[#EF3E36] rounded-3xl shadow-sm"
          style={{
            top: '980px',
            left: '320px',
            width: '660px',
            minHeight: '200px'
          }}
        >
          <p
            className="text-[55px] tracking-wider leading-tight font-black text-white uppercase text-left drop-shadow-md break-words w-full"
            style={{ fontFamily: 'Big Shoulders Display, sans-serif' }}
          >
            "{pledge.text}"
          </p>
        </div>

      </div>
    </div>
  );
};

export default Poster;