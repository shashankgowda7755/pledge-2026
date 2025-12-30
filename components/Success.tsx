import React, { useState } from 'react';
import { SHARE_CAPTION } from '../constants';

interface SuccessProps {
  onReset: () => void;
}

const Success: React.FC<SuccessProps> = ({ onReset }) => {
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentUrl = window.location.origin;
  const shareText = `${SHARE_CAPTION}\n${currentUrl}`;

  const handleDownload = async () => {
    setDownloading(true);
    // Use the high-res hidden capture container instead of the preview
    const element = document.getElementById('pledge-poster-capture');

    if (element) {
      try {
        const canvas = await (window as any).html2canvas(element, {
          scale: 1, // Already 1080x1350
          useCORS: true,
          backgroundColor: '#ffffff'
        });

        const link = document.createElement('a');
        const randomInt = Math.floor(Math.random() * 100000);
        link.download = `Pledge_2026_Certificate_${randomInt}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (err) {
        console.error("Download Error:", err);
        alert("Sorry, we couldn't generate the image. Please take a screenshot of your poster!");
      }
    } else {
      alert("Error: Capture element not found.");
    }
    setDownloading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`,
      color: 'hover:text-[#25D366]'
    },
    {
      name: 'Instagram',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      href: `https://www.instagram.com/`,
      color: 'hover:text-[#E4405F]'
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
      color: 'hover:text-[#0077B5]'
    }
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-12 animate-fade-in text-center w-full">
      <div className="space-y-4">
        <div className="w-20 h-20 bg-emerald-600/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 className="text-5xl font-bold text-stone-800 font-display tracking-tighter outfit">Poster Ready.</h2>
        <p className="text-stone-500 font-light text-lg font-sans">Your 2026 resolution poster is ready.</p>
      </div>

      <div className="w-full max-w-sm space-y-8">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className={`w-full bg-stone-900 text-white font-bold py-6 rounded-3xl transition-all shadow-2xl shadow-stone-200 active:scale-95 font-display text-lg outfit ${downloading ? 'opacity-70 cursor-wait' : 'hover:bg-emerald-600 hover:-translate-y-1'}`}
        >
          {downloading ? 'Capturing Moment...' : 'Download Poster (PNG)'}
        </button>

        <div className="space-y-6 pt-4 border-t border-stone-100">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400 font-sans">Share your pledge</p>

          <div className="flex items-center justify-center space-x-10">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-stone-300 transition-all duration-300 transform hover:scale-125 ${social.color}`}
                title={`Share on ${social.name}`}
              >
                {social.icon}
              </a>
            ))}
          </div>

          <button
            onClick={copyToClipboard}
            className={`flex items-center justify-center space-x-3 w-full py-4 rounded-2xl border transition-all duration-300 ${copied ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-white border-stone-100 text-stone-500 hover:border-emerald-500 hover:text-emerald-600'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            <span className="font-bold text-[11px] uppercase tracking-widest font-sans">
              {copied ? 'Link Copied!' : 'Share Now / Copy Link'}
            </span>
          </button>
        </div>

        <button
          onClick={onReset}
          className="w-full py-4 text-stone-300 font-bold text-[10px] uppercase tracking-[0.3em] hover:text-stone-800 transition-colors font-sans"
        >
          Create Another
        </button>
      </div>

      <div className="pt-12 border-t border-stone-100 w-full opacity-30">
        <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-stone-400 font-sans">Verified Pledger 2026</p>
      </div>
    </div>
  );
};

export default Success;