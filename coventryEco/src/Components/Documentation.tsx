import React from 'react';

// Library Imports
import { Heading, Text } from './Typography';
import { Button } from './Button';
import { Card } from './Card';
import { Container, Section } from './Layout';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CenteredHero } from './CenteredHero';
import { AsymmetricHero } from './AsymmetricHero';
import { Input } from './Input';

// --- DOCS HELPERS ---
const PropTable: React.FC<{ props: { name: string; type: string; default: string; desc: string }[] }> = ({ props }) => (
  <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
    <table className="w-full text-left text-sm">
      <thead className="bg-slate-50 border-b border-slate-200 text-slate-900 font-bold uppercase tracking-widest text-[10px]">
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
            <td className="px-4 py-3 font-mono text-slate-500 text-[11px]">{p.type}</td>
            <td className="px-4 py-3 font-mono text-slate-400 text-[11px]">{p.default}</td>
            <td className="px-4 py-3 text-slate-600 italic">{p.desc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const DocSection: React.FC<{ 
  title: string; 
  description: string; 
  children: React.ReactNode; 
  code: string; 
  propsList?: any[];
  fullWidth?: boolean;
}> = ({ title, description, children, code, propsList, fullWidth = false }) => (
  <section className="mb-32">
    <div className="mb-8 border-l-4 border-indigo-600 pl-6">
      <Heading level={2} className="mb-2 uppercase tracking-tight">{title}</Heading>
      <Text className="max-w-3xl text-lg">{description}</Text>
    </div>
    
    <div className={`border border-slate-200 rounded-[2.5rem] mb-8 shadow-inner overflow-hidden bg-slate-50 ${fullWidth ? '' : 'p-6 md:p-12'}`}>
      {!fullWidth && <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-center text-slate-400">Live Component Preview</h4>}
      <div className="flex flex-col items-center justify-center gap-8">{children}</div>
    </div>

    <div className="grid lg:grid-cols-2 gap-8">
      <div className="flex flex-col h-full">
        <h4 className="text-xs font-black uppercase tracking-widest mb-4 text-slate-400 italic">Code Snippet</h4>
        <pre className="bg-slate-900 text-indigo-200 p-8 rounded-2xl overflow-x-auto text-sm font-mono border border-slate-800 shadow-2xl flex-1">
          <code>{code}</code>
        </pre>
      </div>
      <div>
        <h4 className="text-xs font-black uppercase tracking-widest mb-4 text-slate-400 italic">API Reference</h4>
        {propsList ? <PropTable props={propsList} /> : <p className="text-sm text-slate-400 italic p-4 border border-dashed rounded-xl">No specific props available for this component.</p>}
      </div>
    </div>
  </section>
);

export const DocumentationPortal: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pb-32">
      
      {/* 1. ASYMMETRIC HERO DOC */}
      <DocSection 
        fullWidth
        title="Hero: Asymmetric"
        description="A split-screen hero section. Perfect for landing pages where you want text on one side and a visual or code block on the other."
        code={`<AsymmetricHero />`}
      >
        <AsymmetricHero />
      </DocSection>

      <Container>
        {/* 2. CENTERED HERO DOC */}
        <DocSection 
          title="Hero: Centered"
          description="A high-impact centered hero. Best for minimalist landing pages or important announcements."
          code={`<CenteredHero />`}
        >
          <div className="border border-slate-100 rounded-3xl overflow-hidden shadow-2xl w-full">
            <CenteredHero />
          </div>
        </DocSection>

        {/* 3. NAVIGATION */}
        <DocSection 
          title="Navigation Bar"
          description="Institutional header with glassmorphism and responsive links."
          code={`<Navbar />`}
        >
          <div className="w-full border rounded-xl overflow-hidden shadow-lg scale-90 origin-center pointer-events-none">
            <Navbar />
          </div>
        </DocSection>

        {/* 4. LAYOUT */}
        <DocSection 
          title="Layout: Section & Container"
          description="Section provides vertical spacing. Container provides horizontal centering and max-width."
          propsList={[
            { name: 'bg', type: 'string', default: '"bg-white"', desc: 'Tailwind background class (Section only)' },
            { name: 'className', type: 'string', default: '""', desc: 'Custom styles' },
          ]}
          code={`<Section bg="bg-slate-50">\n  <Container>\n    {/* Content here */}\n  </Container>\n</Section>`}
        >
          <div className="w-full p-4 bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-xl">
             <div className="bg-white border-2 border-indigo-600 p-8 rounded-lg shadow-sm text-center font-bold text-indigo-600 text-xs">
                CONTAINER SCOPE
             </div>
          </div>
        </DocSection>

        {/* 5. INPUTS */}
        <DocSection 
          title="Form Inputs"
          description="Text and numeric inputs with built-in labeling and error handling."
          propsList={[
            { name: 'label', type: 'string', default: '""', desc: 'Text above input' },
            { name: 'type', type: 'string', default: '"text"', desc: 'HTML input type' },
            { name: 'error', type: 'string', default: 'undefined', desc: 'Triggers error state' },
          ]}
          code={`<Input label="Instance Name" placeholder="web-server-01" />`}
        >
          <div className="grid md:grid-cols-2 gap-6 w-full max-w-2xl">
            <Input label="Resource Name" placeholder="Enter name..." />
            <Input label="Storage (GB)" type="number" defaultValue={10} />
            <Input label="API Key" type="password" error="Required field" />
            <Input label="Cloud Region" placeholder="eu-west-1" helperText="Choose closest to users." />
          </div>
        </DocSection>

        {/* 6. BUTTONS */}
        <DocSection 
          title="Action Buttons"
          description="Semantic buttons for system interactions."
          propsList={[
            { name: 'variant', type: "'info' | 'success' | 'alert' | 'danger'", default: "'info'", desc: 'Color mapping' },
          ]}
          code={`<Button variant="success">Deploy</Button>`}
        >
          <div className="flex flex-wrap gap-4">
            <Button variant="info">Info</Button>
            <Button variant="success">Success</Button>
            <Button variant="alert">Alert</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </DocSection>

        {/* 7. CARDS */}
        <DocSection 
          title="Information Cards"
          description="Surface-level containers for modular data."
          code={`<Card title="Card Title" description="Card content..." />`}
        >
          <div className="max-w-sm w-full">
            <Card title="Cloud Computing" description="Explore the infrastructure and virtualization module.">
               <Button variant="info" className="w-full">Open Module</Button>
            </Card>
          </div>
        </DocSection>

        {/* 8. TYPOGRAPHY */}
        <DocSection 
          title="Typography"
          description="Headings and body text hierarchy."
          propsList={[
            { name: 'level', type: '1 | 2 | 3', default: '1', desc: 'Heading size' },
          ]}
          code={`<Heading level={1}>Heading 1</Heading>`}
        >
          <div className="space-y-4 text-center">
            <Heading level={1}>H1 Heading</Heading>
            <Heading level={2}>H2 Heading</Heading>
            <Text>Regular paragraph text for technical docs.</Text>
          </div>
        </DocSection>

        {/* 9. FOOTER */}
        <DocSection 
          title="Footer"
          description="Global site footer for navigation and legal text."
          code={`<Footer />`}
        >
          <div className="w-full border rounded-xl overflow-hidden shadow-lg scale-90 origin-center bg-slate-900 pointer-events-none">
            <Footer />
          </div>
        </DocSection>
      </Container>

      {/* --- BRANDING FOOTER (REQUIRED) --- */}
      <footer className="mt-20 border-t border-slate-200 py-16">
        <Container>
           <div className="flex flex-col items-center text-center gap-4">
              <div className="font-black text-slate-900 text-2xl tracking-tighter">
                CU COVENTRY <span className="text-indigo-600 italic">CLOUD</span>
              </div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em] space-y-1">
                <p>Property of CU Coventry</p>
                <p className="font-normal opacity-70">A Wholly Owned Subsidiary of Coventry University Group</p>
                <p className="text-indigo-600">Cloud Computing Degree Programme</p>
              </div>
           </div>
        </Container>
      </footer>
    </div>
  );
};

export default DocumentationPortal;