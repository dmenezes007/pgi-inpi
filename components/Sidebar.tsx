import React from 'react';
import ModuleIcon from './ModuleIcon';

interface SidebarProps {
  modules: string[];
  activeModule: string;
  isExpanded: boolean;
  isMobileOpen: boolean;
  onModuleSelect: (moduleName: string) => void;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ modules, activeModule, isExpanded, isMobileOpen, onModuleSelect, onToggle }) => {
  const sidebarClasses = `sidebar bg-slate-800 flex flex-col shadow-lg transition-all duration-300 ease-in-out h-screen sticky top-0 ${
    isMobileOpen ? 'expanded' : ''
  } ${
    isExpanded ? 'w-64' : 'w-20'
  }`;

  return (
    <aside className={sidebarClasses}>
      <div className={`p-6 flex items-center ${isExpanded ? 'justify-between' : 'justify-center'}`}>
        {isExpanded && (
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-400">
            PGI
          </div>
        )}
         <button onClick={onToggle} className={`p-1 rounded-full text-slate-400 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 md:block hidden`}>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-transform duration-300 ${isExpanded ? '' : 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>
      
      <nav className="flex-grow px-4 overflow-y-auto">
        <ul>
          {modules.map((moduleName) => (
            <li key={moduleName} className="mb-2">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onModuleSelect(moduleName);
                }}
                className={`flex items-center py-2.5 rounded-lg transition-colors duration-200 ${isExpanded ? 'px-4' : 'justify-center'} ${
                  activeModule === moduleName
                    ? 'bg-purple-600 text-white font-semibold shadow-md'
                    : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                }`}
                title={!isExpanded ? moduleName : ''}
              >
                <ModuleIcon moduleName={moduleName} className="h-5 w-5 flex-shrink-0" />
                {isExpanded && <span className="ml-4 text-sm font-medium">{moduleName}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 text-center">
         <div className={`flex justify-center text-xs text-slate-500 mt-4 transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
        <img 
            src="https://dmenezes007.github.io/pgi-inpi/files/imgs/logo_inpi_branco_fundo_transparente.png" 
            alt="Logo do INPI" 
            className="h-8"
        />
    </div>
      </div>
    </aside>
  );
};

export default Sidebar;