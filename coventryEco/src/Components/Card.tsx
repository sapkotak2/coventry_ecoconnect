import React, { type ReactNode } from 'react';

interface CardProps {
  title?: string;
  description?: string;
  image?: string;
  children?: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, description, image, children, className = "" }) => (
  <div className={`
    group bg-white rounded-3xl border border-slate-100 shadow-sm 
    hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 
    overflow-hidden ${className}
  `}>
    {image && (
      <div className="overflow-hidden">
        <img src={image} alt={title} className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
    )}
    <div className="p-8">
      {title && <h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>}
      {description && <p className="text-slate-500 leading-relaxed mb-6">{description}</p>}
      {children}
    </div>
  </div>
);