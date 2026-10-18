import React from 'react';
import { PRIVACY_CONTACT_EMAIL } from '../constants';

const PrivacyModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Privacy Policy" onClick={onClose}>
    <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-8 space-y-4 text-sm text-stone-600 leading-relaxed" onClick={(e) => e.stopPropagation()}>
      <h2 className="text-xl font-black text-stone-900 outfit">Privacy Policy</h2>
      <p><strong>What we collect.</strong> Your name, email, WhatsApp number, resolution text and an optional photo that you type in or choose on the form.</p>
      <p><strong>Why.</strong> Only to draw your personal 2026 resolution poster on your screen so you can download it.</p>
      <p><strong>Where it goes.</strong> The poster is generated inside your browser. This site does not upload your photo or details to a server and does not keep them; closing or resetting the page discards them. Sharing buttons (WhatsApp, LinkedIn) share only this site's link, not your poster or details.</p>
      <p><strong>Third parties.</strong> Page scripts (styling and image-export libraries) load from public CDNs, which can see your IP address as for any web page. Fonts are served from this site.</p>
      <p><strong>Children.</strong> If you are under 18, use this only with a parent or guardian's permission. We do not knowingly store any child's data and do not track or advertise to anyone.</p>
      <p><strong>Your rights.</strong> Under the Digital Personal Data Protection Act, 2023 you may ask about, correct or erase your data, and raise a grievance.</p>
      {PRIVACY_CONTACT_EMAIL && (
        <p><strong>Grievance Officer.</strong> Write to <a className="text-emerald-600 underline" href={`mailto:${PRIVACY_CONTACT_EMAIL}`}>{PRIVACY_CONTACT_EMAIL}</a>. We acknowledge within 24 hours and resolve within 15 days.</p>
      )}
      <button onClick={onClose} className="mt-2 px-6 py-2 rounded-full bg-stone-900 text-white text-xs font-bold uppercase tracking-widest">Close</button>
    </div>
  </div>
);

export default PrivacyModal;
