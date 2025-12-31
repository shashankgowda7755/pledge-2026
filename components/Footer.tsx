
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-50 pt-20 pb-12 px-6 border-t border-stone-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-2 space-y-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">P</div>
            <span className="font-bold text-xl tracking-tighter text-stone-800 outfit">Pledge2025</span>
          </div>
          <p className="text-stone-400 text-sm max-w-sm leading-relaxed">
            Empowering individuals to make a difference through commitment and community.
            Small changes today, for a sustainable 2025 and beyond.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-xs uppercase tracking-widest text-stone-800">Resources</h4>
          <ul className="text-stone-400 text-sm space-y-3">
            <li><a href="#" className="hover:text-emerald-600 transition-colors">Partner Program</a></li>
            <li><a href="#" className="hover:text-emerald-600 transition-colors">Case Studies</a></li>
            <li><a href="#" className="hover:text-emerald-600 transition-colors">Annual Report</a></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-xs uppercase tracking-widest text-stone-800">Support</h4>
          <ul className="text-stone-400 text-sm space-y-3">
            <li><a href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-emerald-600 transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-emerald-600 transition-colors">Help Center</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-20 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-stone-300 text-[10px] font-bold uppercase tracking-[0.4em]">
        <p>© 2025 Pledge Foundation. All Rights Reserved.</p>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-emerald-600">Twitter</a>
          <a href="#" className="hover:text-emerald-600">Instagram</a>
          <a href="#" className="hover:text-emerald-600">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
