import React from 'react';
import { MODULES } from '../constants';
import ModuleCard from './ModuleCard';

interface InicioProps {
    onModuleSelect: (moduleName: string) => void;
}

const Inicio: React.FC<InicioProps> = ({ onModuleSelect }) => {
  const otherModules = MODULES.filter(m => m !== 'Início');

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-400">
        Início
      </h1>
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg mb-10 border border-slate-700">
        <p className="text-lg leading-relaxed text-gray-300">
          O presente <span className="text-purple-400 font-serif-highlight font-medium">Programa de Gestão da Inovação</span> representa um proposta da Coordenação-Geral de Recursos Humanos e da Academia de Propriedade Intelectual, Inovação e Desenvolvimento do INPI de efetivar o compromisso de reconhecer a <span className="text-purple-400 font-serif-highlight font-medium">inovação como pilar estratégico</span> para a <span className="text-purple-400 font-serif-highlight font-medium">transformação e desenvolvimento institucional</span>.
        </p>
      </div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-300">Navegue pelos Módulos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {otherModules.map(moduleName => (
          <ModuleCard key={moduleName} moduleName={moduleName} onModuleSelect={onModuleSelect} />
        ))}
        <div className="flex items-center justify-center p-6">
          <p className="text-sm text-slate-500">© 2025 INPI</p>
        </div>
      </div>
    </div>
  );
};

export default Inicio;