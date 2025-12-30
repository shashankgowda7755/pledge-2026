import React, { useState } from 'react';
import { UserData } from '../types';
import Poster from './Poster';

interface SuccessProps {
  onReset: () => void;
  userData: UserData;
}

const Success: React.FC<SuccessProps> = ({ onReset, userData }) => {
  const [downloading, setDownloading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const currentUrl = window.location.origin;
  const pledgeText = userData.customPledge || ''; // Fallback

  const handleDownload = async () => {
    setDownloading(true);
    // Use the high-res hidden capture container from App.tsx (id="pledge-poster-capture")
    const element = document.getElementById('pledge-poster-capture');

    if (element) {
      try {
        const canvas = await (window as any).html2canvas(element, {
          scale: 2, // High resolution matching HTML logic
          useCORS: true,
          backgroundColor: '#ffffff'
        });

        // Generate JPEG as per HTML logic to avoid huge PNGs if not needed, or just match HTML
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        setGeneratedImage(dataUrl);

        // Trigger Download
        const link = document.createElement('a');
        const name = userData.fullName?.replace(/\s+/g, '_') || 'Manifestation';
        link.download = `pledge_2026_${name}.jpg`;
        link.href = dataUrl;
        link.click();

        // Show Modal
        setShowModal(true);

      } catch (err) {
        console.error("Download Error:", err);
        alert("Sorry, we couldn't generate the image. Please take a screenshot!");
      }
    } else {
      alert("Error: Capture element not found.");
    }
    setDownloading(false);
  };

  const handleShare = (platform: 'whatsapp' | 'linkedin') => {
    const shareText = `I just pledged my watch! Join me here:\n${currentUrl}`;
    let url = '';

    if (platform === 'whatsapp') {
      url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    } else if (platform === 'linkedin') {
      url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
    }

    if (url) window.open(url, '_blank');
  };

  const copyToClipboard = () => {
    const shareText = `I just pledged my watch! Join me here:\n${currentUrl}`;
    navigator.clipboard.writeText(shareText).then(() => {
      alert("Link Copied!");
    });
  };

  return (
    <div className="pt-24 pb-32 px-6 min-h-screen flex flex-col items-center w-full">
      {/* Header Text */}
      <div className="text-center mb-8 animate-fade-in">
        <h2 className="text-3xl font-black text-stone-900 outfit">Your 2025 Pledge</h2>
        <p className="text-emerald-600 font-medium">Ready to download.</p>
      </div>

      {/* Poster Preview (Scaled) */}
      <div className="transform scale-[0.35] sm:scale-[0.5] md:scale-[0.6] origin-top shadow-2xl border-[10px] border-white rounded-lg">
        {/* We render a visible Poster component here for preview */}
        {/* Pass a unique ID to avoid conflict with the hidden capture element */}
        <Poster
          id="preview-poster"
          userData={userData}
          pledge={{ id: 0, text: pledgeText, explanation: '' }}
        />
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white p-4 flex flex-wrap justify-center gap-3 border-t border-stone-100 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">

        {/* Edit Button */}
        <button onClick={onReset}
          className="px-4 py-3 rounded-xl border border-stone-200 font-bold text-stone-500 hover:bg-stone-50 text-sm transition-colors">
          Edit
        </button>

        {/* WhatsApp */}
        <button onClick={() => handleShare('whatsapp')}
          className="px-4 py-3 rounded-xl bg-[#25D366] text-white font-bold hover:bg-[#20bd5a] shadow-lg text-sm flex items-center gap-2 transition-transform active:scale-95">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
          <span>WhatsApp</span>
        </button>

        {/* Download */}
        <button onClick={handleDownload} disabled={downloading}
          className="px-4 py-3 rounded-xl bg-stone-900 text-white font-bold hover:bg-stone-800 shadow-lg text-sm flex items-center gap-2 transition-transform active:scale-95 disabled:opacity-70 disabled:cursor-wait">
          {downloading ? (
            <span>Generat...</span>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              <span>Download</span>
            </>
          )}
        </button>

        {/* LinkedIn */}
        <button onClick={() => handleShare('linkedin')}
          className="px-4 py-3 rounded-xl bg-[#0077B5] text-white font-bold hover:bg-[#006097] shadow-lg text-sm flex items-center gap-2 transition-transform active:scale-95">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
          <span>LinkedIn</span>
        </button>

        {/* Copy Link */}
        <button onClick={copyToClipboard}
          className="px-4 py-3 rounded-xl bg-white border border-stone-200 text-stone-600 font-bold hover:bg-stone-50 shadow-lg text-sm flex items-center gap-2 transition-transform active:scale-95">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
          <span>Copy Link</span>
        </button>
      </div>

      {/* Download Modal - Matches HTML Logic */}
      {showModal && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4 animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b flex justify-between items-center bg-stone-50">
              <h3 className="font-black text-stone-900 uppercase tracking-widest text-sm">Your Poster is Ready!</h3>
              <button onClick={() => setShowModal(false)} className="text-2xl text-stone-400 hover:text-stone-900">&times;</button>
            </div>
            <div className="p-4 bg-stone-100 flex justify-center">
              {generatedImage && (
                <img src={generatedImage} alt="Generated Poster" className="max-h-[50vh] object-contain shadow-lg border-4 border-white" />
              )}
            </div>
            <div className="p-5 flex flex-col gap-3">
              <p className="text-xs text-center text-emerald-600 font-bold uppercase tracking-wider">✓ Downloaded to your device</p>
              <button onClick={() => setShowModal(false)}
                className="w-full bg-stone-900 text-white font-bold py-3 rounded-xl uppercase tracking-widest text-xs hover:bg-stone-800 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Success;