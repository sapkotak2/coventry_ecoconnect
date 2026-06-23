import React from 'react';
import { Container } from './Layout';
import { Heading, Text } from './Typography';
import { Button } from './Button';

export const CenteredHero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-slate-50">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-indigo-100/50 blur-[120px] rounded-full -z-10" />
      
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest uppercase text-indigo-600 bg-indigo-50 rounded-full">
            The Future of Learning
          </div>
          
          <Heading level={1} className="mb-6 leading-[1.1]">
            Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">beautiful interfaces</span> in record time.
          </Heading>
          
          <Text className="text-xl mb-10 text-slate-500 max-w-2xl mx-auto">
            A meticulously crafted UI library for students. Fully typed, 
            highly customizable, and ready for your next big project.
          </Text>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="info" className="w-full sm:w-auto px-10 py-4 text-lg">
              Get Started for Free
            </Button>
            <button className="px-8 py-3 font-bold text-slate-600 hover:text-indigo-600 transition-colors">
              View Documentation →
            </button>
          </div>

          <div className="mt-16 pt-16 border-t border-slate-200">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">Trusted by the next generation at</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale">
               {/* Mock Logos */}
               <div className="font-bold text-xl text-slate-800 tracking-tighter italic">Vanguard</div>
               <div className="font-bold text-xl text-slate-800 tracking-tighter italic">CloudNine</div>
               <div className="font-bold text-xl text-slate-800 tracking-tighter italic">NexusUI</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};