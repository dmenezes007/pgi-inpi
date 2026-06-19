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
      <div className="module-intro">
        <div className="module-kicker">AMBIENTE INSTITUCIONAL</div>
        <p className="module-lead">
          O <span className="text-purple-400 font-serif-highlight font-medium">Portal da Gestão da Inovação</span> consolida a proposta institucional da Coordenação-Geral de Recursos Humanos e da Academia de Propriedade Intelectual, Inovação e Desenvolvimento do INPI, reafirmando a <span className="text-purple-400 font-serif-highlight font-medium">inovação como pilar estratégico</span> para a <span className="text-purple-400 font-serif-highlight font-medium">transformação organizacional</span>, a melhoria da prestação de serviços e a geração de valor público.
        </p>
      </div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">Arquitetura do portal</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Navegação por módulos</h2>
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