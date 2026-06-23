import React from 'react';

// Import the library components
import { Heading, Text } from './Typography';
import { Button } from './Button';
import { Card } from './Card';
import { Container, Section } from './Layout';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CenteredHero } from './CenteredHero';
import { AsymmetricHero } from './AsymmetricHero';

// --- HELPER: PROP TABLE COMPONENT ---
const PropTable: React.FC<{ 
  props: { name: string; type: string; default: string; desc: string }[] 
}> = ({ props }) => (
  <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
    <table className="w-full text-left text-sm">
      <thead className="bg-slate-50 border-b border-slate-200 text-slate-900 font-bold uppercase tracking-wider text-[10px]">
        <tr>
          <th className="px-4 py-3">Prop</th>
          <th className="px-4 py-3">Type</th>
          <th className="px-4 py-3">Default</th>
          <th className="px-4 py-3">Description</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {props.map((p) => (
          <tr key={p.name} className="hover:bg-slate-50/50 transition-colors">
            <td className="px-4 py-3 font-mono font-bold text-indigo-600">{p.name}</td>
            <td className="px-4 py-3 font-mono text-slate-500 text-xs">{p.type}</td>
            <td className="px-4 py-3 font-mono text-slate-400 text-xs">{p.default}</td>
            <td className="px-4 py-3 text-slate-600 italic">{p.desc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// --- DOCS SECTION COMPONENT ---
const DocSection: React.FC<{ 
  title: string; 
  description: string; 
  children: React.ReactNode; 
  code: string;
  propsList?: { name: string; type: string; default: string; desc: string }[];
  dark?: boolean;
}> = ({ title, description, children, code, propsList, dark = false }) => (
  <section className="mb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="mb-8">
      <Heading level={2} className="mb-3">{title}</Heading>
      <Text className="max-w-3xl text-lg">{description}</Text>
    </div>
    
    <div className={`${dark ? 'bg-slate-900' : 'bg-slate-50'} border border-slate-200 rounded-3xl p-6 md:p-10 mb-6 shadow-inner overflow-hidden`}>
      <h4 className={`text-[10px] font-black uppercase tracking-widest mb-6 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>Live Preview</h4>
      {children}
    </div>

    <div className="grid lg:grid-cols-2 gap-8">
      <div>
        <h4 className="text-xs font-black uppercase tracking-widest mb-4 text-slate-400 italic">Component Code</h4>
        <pre className="bg-slate-900 text-indigo-200 p-6 rounded-2xl overflow-x-auto text-sm font-mono border border-slate-800 shadow-2xl h-full">
          <code>{code}</code>
        </pre>
      </div>
      <div>
        <h4 className="text-xs font-black uppercase tracking-widest mb-4 text-slate-400 italic">Properties (API)</h4>
        {propsList ? <PropTable props={propsList} /> : <p className="text-sm text-slate-400 italic">No specific props for this element.</p>}
      </div>
    </div>
  </section>
);

export const DocumentationPortal: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pb-20 selection:bg-indigo-100">
      
     <Container className="mt-20">
        <header className="mb-24">
          <Heading level={1} className="mb-6 tracking-tighter">UI Library Documentation</Heading>
          <Text className="text-2xl max-w-3xl font-light text-slate-500 leading-relaxed">
            Welcome to the official <strong>CU Coventry Cloud Computing</strong> component library. 
            This kit is designed for students to rapidly prototype professional, cloud-ready dashboards and landing pages.
          </Text>
        </header>

        {/* --- NAVBAR --- */}
        <DocSection 
          title="Navigation Bar"
          description="A responsive navigation header with glassmorphism effects. Best used at the top of every page."
          code={`<Navbar />`}
        >
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-lg w-full scale-90">
             <Navbar />
          </div>
        </DocSection>

        {/* --- SECTION & CONTAINER --- */}
        <DocSection 
          title="Layout: Section & Container"
          description="The backbone of the layout. Section provides vertical rhythm, and Container ensures horizontal alignment across screen sizes."
          propsList={[
            { name: 'children', type: 'ReactNode', default: 'null', desc: 'Inner content of the layout' },
            { name: 'className', type: 'string', default: '""', desc: 'Custom CSS classes' },
            { name: 'bg', type: 'string', default: '"bg-white"', desc: 'Tailwind background color class (Section only)' },
          ]}
          code={`<Section bg="bg-slate-50">\n  <Container>\n    <Text>Layout logic starts here.</Text>\n  </Container>\n</Section>`}
        >
          <div className="w-full bg-indigo-50 border-2 border-dashed border-indigo-200 p-4 rounded-lg">
             <div className="bg-white border-2 border-indigo-500 p-8 rounded-md text-center font-bold text-indigo-600 uppercase text-xs">
                Container Context
             </div>
          </div>
        </DocSection>

        {/* --- TYPOGRAPHY --- */}
        <DocSection 
          title="Typography"
          description="Strict heading hierarchy designed for technical readability and documentation clarity."
          propsList={[
            { name: 'level', type: '1 | 2 | 3', default: '1', desc: 'Defines the semantic HTML tag (h1, h2, h3) and font size' },
            { name: 'children', type: 'ReactNode', default: 'null', desc: 'Text content' },
            { name: 'className', type: 'string', default: '""', desc: 'Custom overrides' },
          ]}
          code={`<Heading level={1}>Cloud Architecture</Heading>\n<Text>Body copy explaining the network topology.</Text>`}
        >
          <div className="space-y-4">
            <Heading level={1}>H1 Heading</Heading>
            <Heading level={2}>H2 Heading</Heading>
            <Heading level={3}>H3 Heading</Heading>
            <Text>Regular body text using the optimized Slate-600 palette.</Text>
          </div>
        </DocSection>

        {/* --- BUTTONS --- */}
        <DocSection 
          title="Button Variants"
          description="Action components with pre-defined semantic states for Cloud Operations (Creation, Deletion, Warning)."
          propsList={[
            { name: 'variant', type: "'info' | 'success' | 'alert' | 'danger'", default: "'info'", desc: 'The visual style and color theme' },
            { name: 'onClick', type: 'function', default: 'undefined', desc: 'Callback function for click events' },
            { name: 'children', type: 'ReactNode', default: 'null', desc: 'Text or icons inside the button' },
          ]}
          code={`<Button variant="success">Deploy Instance</Button>`}
        >
          <div className="flex flex-wrap gap-4">
            <Button variant="info">Info</Button>
            <Button variant="success">Success</Button>
            <Button variant="alert">Alert</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </DocSection>

        {/* --- CARDS --- */}
        <DocSection 
          title="Interactive Cards"
          description="Surface elements for modular content. Includes hover-states and image support."
          propsList={[
            { name: 'title', type: 'string', default: 'undefined', desc: 'Main card heading' },
            { name: 'description', type: 'string', default: 'undefined', desc: 'Summary text' },
            { name: 'image', type: 'string', default: 'undefined', desc: 'URL for card header image' },
            { name: 'children', type: 'ReactNode', default: 'null', desc: 'Optional footer or button content' },
          ]}
          code={`<Card \n  title="AWS S3 Storage" \n  description="Object storage designed for 99.9% durability."\n/>`}
        >
          <div className="max-w-sm">
            <Card 
              title="Cloud Infrastructure" 
              description="Learn to deploy and scale virtualized environments."
            >
              <Button variant="info" className="w-full">Explore Lab</Button>
            </Card>
          </div>
        </DocSection>

        {/* --- HEROES --- */}
        <DocSection 
          title="Hero Sections"
          description="High-impact landing page headers. Choose based on content asymmetry."
          code={`<AsymmetricHero />\n<CenteredHero />`}
        >
          <div className="space-y-8 w-full scale-90">
             <div className="border rounded-2xl overflow-hidden opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-crosshair">
                <AsymmetricHero />
             </div>
          </div>
          <div className="space-y-8 w-full scale-90">
             <div className="border rounded-2xl overflow-hidden opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-crosshair">
                <CenteredHero />
             </div>
          </div>
        </DocSection>

        {/* --- FOOTER --- */}
        <DocSection 
          title="Footer"
          description="The institutional footer including legal disclaimers and social links."
          dark
          code={`<Footer />`}
        >
          <div className="border border-slate-700 rounded-xl overflow-hidden w-full scale-90">
            <Footer />
          </div>
        </DocSection>

      </Container>

      {/* --- FINAL INSTITUTIONAL FOOTER --- */}
      <Section bg="bg-slate-900" className="mt-20">
        <Container>
          <div className="text-center">
            <div className="text-white font-black text-2xl tracking-tighter mb-4 italic">CU COVENTRY CLOUD LABS</div>
            <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
              This library is the official UI standard for the **Cloud Computing Degree Programme**. 
              All student project submissions are expected to adhere to these design principles.
            </p>
            <div className="mt-8 pt-8 border-t border-slate-800 text-[10px] text-slate-600 uppercase tracking-widest">
              Property of CU Coventry • Wholly Owned Subsidiary of Coventry University Group
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default DocumentationPortal;