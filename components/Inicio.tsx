import React from 'react';
import { MODULES } from '../constants';
import ModuleCard from './ModuleCard';

interface InicioProps {
    onModuleSelect: (moduleName: string) => void;
}

const Inicio: React.FC<InicioProps> = ({ onModuleSelect }) => {
  const otherModules = MODULES.filter(m => m !== 'Início');

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-lg shadow-blue-100/50">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
          INPI
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
          Ambiente institucional
        </div>
        <p className="text-lg leading-relaxed text-slate-700">
          O <span className="text-purple-400 font-serif-highlight font-medium">Portal da Gestão da Inovação</span> consolida a proposta institucional da Coordenação-Geral de Recursos Humanos e da Academia de Propriedade Intelectual, Inovação e Desenvolvimento do INPI, reafirmando a <span className="text-purple-400 font-serif-highlight font-medium">inovação como pilar estratégico</span> para a <span className="text-purple-400 font-serif-highlight font-medium">transformação organizacional</span>, a melhoria da prestação de serviços e a geração de valor público.
        </p>
      </div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">Arquitetura do portal</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Navegação por módulos</h2>
        </div>
        <div className="hidden rounded-2xl border border-slate-200 bg-white px-5 py-3 text-right shadow-sm md:block">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Cobertura</p>
          <p className="text-lg font-bold text-slate-900">{otherModules.length} frentes ativas</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {otherModules.map(moduleName => (
          <ModuleCard key={moduleName} moduleName={moduleName} onModuleSelect={onModuleSelect} />
        ))}
      </div>
      <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white/80 p-5">
        <p className="text-sm text-slate-500">© 2025 INPI · Portal da Gestão da Inovação</p>
      </div>
    </div>
  );
};

export default Inicio;