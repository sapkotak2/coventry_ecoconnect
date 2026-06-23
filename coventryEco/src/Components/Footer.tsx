import React from 'react';
import { Container } from './Layout';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-800 pb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="text-white text-2xl font-black mb-6 italic">STUDENTLAB</div>
            <p className="text-sm leading-relaxed">
              Teaching the world to build beautiful interfaces, one component at a time.
            </p>
          </div>
          
          {['Learn', 'Platform', 'Company'].map((section) => (
            <div key={section}>
              <h4 className="text-white font-bold mb-6">{section}</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Web Design</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Development</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Free Assets</a></li>
              </ul>
            </div>
          ))}
        </div>
        
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs uppercase tracking-widest font-semibold">
          <p>© {new Date().getFullYear()} Student UI Library. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Github</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;