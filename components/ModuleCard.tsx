import React from 'react';
import ModuleIcon from './ModuleIcon';

interface ModuleCardProps {
  moduleName: string;
  onModuleSelect: (moduleName: string) => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ moduleName, onModuleSelect }) => {
  return (
    <button
      onClick={() => onModuleSelect(moduleName)}
      className="group w-full rounded-2xl border border-slate-200 bg-white/95 p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 focus:ring-offset-white"
    >
      <div className="flex items-center">
        <div className="mr-4 flex-none rounded-xl bg-gradient-to-br from-blue-900 to-blue-700 p-3 text-white shadow-lg shadow-blue-900/15 transition-transform duration-300 group-hover:scale-105">
           <ModuleIcon moduleName={moduleName} className="h-6 w-6 shrink-0 text-white" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">Modulo</p>
          <h3 className="text-xl font-semibold text-slate-900">{moduleName}</h3>
        </div>
      </div>
    </button>
  );
};

export default ModuleCard;