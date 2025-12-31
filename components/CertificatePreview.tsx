import React, { useRef, useState, useEffect } from 'react';
import { Pledge, UserData } from '../types';
import Poster from './Poster';

// Google Sheets Web App URL (Centralized Data)
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxnc_VlsezobFWwCrm8p3CEGc2JytrBbbEYhBY9T90pQeR12VHeHhcUsEyoQMqLCIFW/exec';

// Function to save data to Cloud (Google Sheets)
const saveToGoogleSheets = (userData: UserData) => {
  // Use URL params (GET) to avoid CORS issues and guarantee delivery
  const params = new URLSearchParams({
    fullName: userData.fullName || '',
    phone: userData.phone || '',
    resolution: userData.customPledge || '',
    timestamp: new Date().getTime().toString() // Prevent caching
  });

  // Fire and forget request
  fetch(`${GOOGLE_SHEETS_URL}?${params.toString()}`, {
    method: 'GET',
    mode: 'no-cors',
  }).then(() => console.log('Sent to Google Sheets'))
    .catch(err => console.error('Sheet Error:', err));
};

interface CertificatePreviewProps {
  pledge: Pledge;
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  onBack: () => void;
  onConfirm: () => void;
}

const CertificatePreview: React.FC<CertificatePreviewProps> = ({ pledge, userData, onBack, onConfirm }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.25);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        // Poster width is 1080px
        const newScale = containerWidth / 1080;
        setScale(newScale);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const handleConfirm = () => {
    // Save to Google Sheets (Cloud)
    saveToGoogleSheets(userData);

    // Proceed immediately
    onConfirm();
  };

  return (
    <div className="flex-1 flex flex-col p-6 sm:p-10 space-y-10 bg-white/50 h-full max-w-4xl mx-auto w-full">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-stone-900 outfit tracking-tight">Your 2025 Pledge</h2>
        <p className="text-emerald-600 font-medium">Confirm your details before generating.</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div ref={containerRef} className="relative group w-full max-w-sm mx-auto shadow-2xl ring-4 ring-white aspect-[1080/1440] bg-white">
          <div
            style={{
              transform: `scale(${scale})`, // Shrink it down
              transformOrigin: 'top left',  // Anchor to corner
              width: '1080px',              // Force original size inner
              height: '1440px'
            }}
          >
            <Poster pledge={pledge} userData={userData} />
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-4 pt-6 border-t border-stone-100">
        <button
          onClick={handleConfirm}
          className="w-full bg-stone-900 text-white font-bold py-5 rounded-xl transition-all duration-300 hover:bg-emerald-600 shadow-xl shadow-stone-100 active:scale-95 outfit text-lg"
        >
          Confirm & Finalize
        </button>
        <button
          onClick={onBack}
          className="text-stone-400 font-bold text-xs uppercase tracking-widest hover:text-stone-600 transition-colors pt-2"
        >
          Modify Details
        </button>
      </div>
    </div>
  );
};

export default CertificatePreview;