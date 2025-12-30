import React, { useRef, useState } from 'react';
import { UserData, Pledge } from '../types';

interface UserFormProps {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  onBack: () => void;
  onContinue: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ userData, setUserData, onBack, onContinue }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Fix: Use useEffect to attach stream when video element becomes available
  React.useEffect(() => {
    if (showCamera && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [showCamera, stream]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
      setStream(s);
      setShowCamera(true);
      // Stream attachment is now handled by useEffect
    } catch (err) {
      alert("Could not access camera. Please check permissions.");
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context && video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        setUserData(prev => ({ ...prev, photo: dataUrl }));
        stopCamera();
      } else {
        // Retry or alert if video not ready
        setTimeout(() => {
          if (videoRef.current && canvasRef.current) {
            const v = videoRef.current;
            const c = canvasRef.current;
            const ctx = c.getContext('2d');
            if (ctx) {
              c.width = v.videoWidth;
              c.height = v.videoHeight;
              ctx.drawImage(v, 0, 0, c.width, c.height);
              setUserData(prev => ({ ...prev, photo: c.toDataURL('image/png') }));
              stopCamera();
            }
          }
        }, 200);
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const handleClearAll = () => {
    setUserData({
      fullName: '',
      email: '',
      phone: '',
      photo: ''
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateEmail = (email: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const validatePhone = (phone: string) => phone.replace(/[^0-9]/g, '').length >= 10;

  const isFormValid =
    userData.fullName.trim().length > 2 &&
    validateEmail(userData.email) &&
    validatePhone(userData.phone) &&
    (userData.customPledge?.trim().length ?? 0) > 5;

  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-8 relative animate-fade-in">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.02] pointer-events-none -z-10 outfit text-[20rem] font-black text-center flex flex-col justify-center select-none">
        <span>2025</span>
      </div>

      <div className="space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-black text-stone-900 outfit mb-2 uppercase tracking-tight">
            My New Year Resolution
          </h2>
          <p className="text-stone-500 font-light text-base max-w-md mx-auto">
            Fill in your details to generate your 2026 Poster.
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-stone-100 shadow-xl shadow-stone-200/40 p-8 sm:p-12 space-y-10">

          <div className="flex flex-col items-center space-y-6">
            {!showCamera ? (
              <div className="flex flex-col items-center space-y-4">
                <div
                  className="group relative w-32 h-32 rounded-full bg-stone-50 border-2 border-dashed border-stone-200 hover:border-emerald-500 cursor-pointer flex items-center justify-center transition-all overflow-hidden shadow-inner"
                >
                  {userData.photo ? (
                    <img src={userData.photo} alt="Identity Portrait" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center flex flex-col items-center">
                      <svg className="w-8 h-8 text-stone-300 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest">No Image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center space-y-1">
                    <button onClick={() => fileInputRef.current?.click()} className="text-white text-[9px] font-bold uppercase tracking-widest hover:underline">Upload</button>
                    <button onClick={startCamera} className="text-white text-[9px] font-bold uppercase tracking-widest hover:underline">Camera</button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button onClick={() => fileInputRef.current?.click()} className="text-[10px] font-black text-emerald-600 uppercase tracking-widest border border-emerald-100 px-4 py-1.5 rounded-full hover:bg-emerald-50 transition-colors">Upload Photo</button>
                  <button onClick={startCamera} className="text-[10px] font-black text-stone-500 uppercase tracking-widest border border-stone-100 px-4 py-1.5 rounded-full hover:bg-stone-50 transition-colors">Open Camera</button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4 w-full">
                <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-emerald-500 bg-black">
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform -scale-x-100" />
                </div>
                <div className="flex space-x-3">
                  <button onClick={capturePhoto} className="bg-emerald-600 text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest">Capture</button>
                  <button onClick={stopCamera} className="bg-stone-200 text-stone-700 px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest">Cancel</button>
                </div>
              </div>
            )}
            <canvas ref={canvasRef} className="hidden" />
            <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" accept="image/*" />
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-stone-400 uppercase tracking-widest block mb-1 ml-1">Full Name</label>
              <input
                type="text"
                placeholder="e.g. John Doe"
                maxLength={13}
                value={userData.fullName}
                onChange={(e) => setUserData(prev => ({ ...prev, fullName: e.target.value }))}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium text-stone-800"
              />
              <p className={`text-xs mt-1 text-right ${userData.fullName.length >= 12 ? 'text-orange-500' : 'text-stone-400'}`}>
                {userData.fullName.length} / 13
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-400 uppercase tracking-widest block mb-1 ml-1">Email</label>
                <input
                  type="email"
                  placeholder="alex@example.com"
                  value={userData.email}
                  onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium text-stone-800"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-stone-400 uppercase tracking-widest block mb-1 ml-1">WhatsApp Number</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={userData.phone}
                  onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium text-stone-800"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-400 uppercase tracking-widest block mb-1 ml-1">My New Year Resolution</label>
              <p className="text-xs text-stone-400 mb-2 ml-1">Maximum 120 characters</p>
              <textarea
                placeholder="I will..."
                maxLength={120}
                value={userData.customPledge || ''}
                onChange={(e) => setUserData(prev => ({ ...prev, customPledge: e.target.value }))}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium text-stone-800 min-h-[100px] resize-none"
              />
              <p className={`text-xs mt-1 text-right ${(userData.customPledge || '').length >= 110 ? 'text-orange-500' : 'text-stone-400'}`}>
                {(userData.customPledge || '').length} / 120
              </p>
            </div>
          </div>

          <div className="pt-4 flex justify-between items-center border-none">
            <button
              onClick={onBack}
              className="text-xs font-bold text-stone-400 hover:text-stone-800 uppercase"
            >
              ← CANCEL
            </button>

            <button
              disabled={!isFormValid}
              onClick={onContinue}
              className={`px-8 py-3 rounded-xl font-bold transition-all shadow-lg transform active:scale-95 ${isFormValid
                ? 'bg-stone-900 text-white hover:bg-emerald-600 shadow-stone-200'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed shadow-none'
                }`}
            >
              Visualize 2025 →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserForm;