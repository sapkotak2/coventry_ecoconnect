import React from 'react';
import { Container } from './Layout';
import { Heading, Text } from './Typography';
import { Button } from './Button';

export const AsymmetricHero: React.FC = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Content */}
          <div className="relative z-10">
            <Heading level={1} className="mb-6">
              Level up your <br /> 
              <span className="text-indigo-600">Development</span> Skills.
            </Heading>
            <Text className="text-xl mb-8 text-slate-600 leading-relaxed">
              Stop fighting with CSS and start building. Our components are 
              engineered to be accessible, responsive, and easy to learn.
            </Text>
            
            <div className="flex gap-4">
              <Button variant="info">Start Building</Button>
              <Button variant="success">View Projects</Button>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-500 font-medium">
                Joined by <span className="text-slate-900 font-bold">2,000+</span> students this week
              </p>
            </div>
          </div>

          {/* Right Side: Visual Element */}
          <div className="relative">
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-50 rounded-full blur-3xl -z-10" />
            
            {/* Decorative "Mock" UI Card */}
            <div className="relative bg-white p-4 rounded-3xl shadow-2xl border border-slate-100 rotate-2 hover:rotate-0 transition-transform duration-500">
               <div className="bg-slate-900 rounded-2xl overflow-hidden p-1 shadow-inner">
                  <div className="flex gap-1.5 p-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <div className="p-6 pt-0 font-mono text-sm space-y-2">
                    <p className="text-indigo-400">const <span className="text-white">Student</span> = {"{"}</p>
                    <p className="pl-4 text-slate-400">skills: [<span className="text-emerald-400">'React', 'Tailwind', 'TS'</span>],</p>
                    <p className="pl-4 text-slate-400">passion: <span className="text-amber-400">Infinity</span></p>
                    <p className="text-indigo-400">{"}"}</p>
                  </div>
               </div>
               
               {/* Floating Badge */}
               <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 animate-bounce">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">✓</div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">Status</p>
                      <p className="text-sm font-bold text-slate-900">Course Completed</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};