import React from 'react';
import { Pledge, UserData } from '../types';

interface PosterProps {
  pledge: Pledge;
  userData: UserData;
  innerRef?: React.RefObject<HTMLDivElement>;
  id?: string;
}

const Poster: React.FC<PosterProps> = ({ pledge, userData, innerRef, id }) => {
  return (
    <div
      ref={innerRef}
      id={id || "pledge-poster"}
      className="w-[1080px] h-[1440px] relative overflow-hidden bg-white"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/poster_2026.png"
          alt="Certificate Background"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-stone-100 -z-10 flex items-center justify-center text-stone-400">
          {/* Fallback if image fails */}
          <span className="text-2xl font-bold uppercase tracking-widest">Poster 2026</span>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full">

        {/* Left Sidebar - Name Overlay (Replacing 'SHASHANK') */}
        <div className="absolute top-0 left-0 w-[250px] h-full bg-white z-20 flex items-center justify-center p-4 shadow-xl">
          <h2 className="text-[40px] font-black text-[#D9381E] uppercase text-center break-words leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
            {userData.fullName || 'YOUR NAME'}
          </h2>
        </div>

        {/* Photo Overlay - Centered in the circle area */}
        <div className="absolute top-[480px] left-[420px] w-[500px] h-[500px] rounded-full overflow-hidden z-10 border-[6px] border-white shadow-inner bg-stone-200">
          {userData.photo ? (
            <img src={userData.photo} alt="User" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-400 font-bold text-3xl">PHOTO</span>
            </div>
          )}
        </div>

        {/* Pledge Text - Bottom Right (Masking existing text) */}
        {/* Using a red background to cover the static text on the poster */}
        <div className="absolute top-[1020px] left-[320px] w-[660px] min-h-[200px] z-20 flex items-center justify-start p-10 bg-[#EF3E36] rounded-3xl shadow-sm">
          <p className="text-[55px] tracking-wider leading-tight font-black text-white uppercase text-left drop-shadow-md break-words w-full" style={{ fontFamily: 'Big Shoulders Display, sans-serif' }}>
            "{pledge.text}"
          </p>
        </div>

        {/* Footer info */}
        <div className="absolute bottom-6 right-10 text-[12px] font-bold uppercase tracking-[0.2em] text-white/60">
          #2026RESOLUTION
        </div>

      </div>
    </div>
  );
};

export default Poster;