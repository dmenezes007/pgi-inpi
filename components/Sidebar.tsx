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
  const sidebarClasses = `sidebar flex flex-col transition-all duration-300 ease-in-out h-screen sticky top-0 ${
    isMobileOpen ? 'expanded' : ''
  } ${
    isExpanded ? 'w-72' : 'w-24'
  }`;

  return (
    <aside className={sidebarClasses}>
      <div className={`sidebar-brand ${isExpanded ? 'justify-between' : 'justify-center'}`}>
        {isExpanded && (
          <div>
            <div className="sidebar-title">INPI</div>
          </div>
        )}
         <button onClick={onToggle} className="sidebar-toggle md:block hidden" aria-label="Expandir ou recolher menu lateral">
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-transform duration-300 ${isExpanded ? '' : 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {modules.map((moduleName) => (
            <li key={moduleName} className="mb-2">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onModuleSelect(moduleName);
                }}
                className={`sidebar-link ${isExpanded ? 'is-expanded' : 'is-collapsed'} ${activeModule === moduleName ? 'is-active' : ''}`}
                title={!isExpanded ? moduleName : ''}
              >
                <ModuleIcon moduleName={moduleName} className="h-5 w-5 flex-shrink-0" />
                {isExpanded && <span className="ml-4 text-sm font-medium">{moduleName}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer-wrap">
        <div className={`sidebar-footer ${isExpanded ? 'is-visible' : ''}`}>
          <span className="sidebar-footer-line">Padrao Digital</span>
          <span className="sidebar-footer-line is-strong">Administracao Publica</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;