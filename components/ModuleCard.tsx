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
      className="p-6 bg-slate-800 rounded-lg shadow-lg text-left w-full hover:bg-slate-700/50 
                 border border-slate-700 hover:border-purple-500 transition-all duration-300 
                 transform hover:-translate-y-1 focus:outline-none focus:ring-2 
                 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-purple-500"
    >
      <div className="flex items-center">
        <div className="p-3 bg-gradient-to-br from-purple-600 to-purple-500 rounded-lg mr-4 shadow-lg">
           <ModuleIcon moduleName={moduleName} className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gray-200">{moduleName}</h3>
      </div>
    </button>
  );
};

export default ModuleCard;