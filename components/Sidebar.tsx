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
    isExpanded ? 'w-64' : 'w-16'
  }`;

  const navClasses = `sidebar-nav ${isExpanded ? 'is-expanded' : 'is-collapsed'}`;

  return (
    <aside className={sidebarClasses}>
      {isExpanded && (
        <div className="sidebar-brand">
          <img
            src="https://www.gov.br/inpi/pt-br/central-de-conteudo/comunicacao/marca-do-inpi/logo_inpi_azul_fundo_transparente.png"
            alt="Logomarca do INPI"
            className="sidebar-logo"
          />
        </div>
      )}

      <button
        onClick={onToggle}
        className={`sidebar-toggle sidebar-toggle-floating md:block hidden ${isExpanded ? 'is-expanded' : 'is-collapsed'}`}
        aria-label="Expandir ou recolher menu lateral"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? '' : 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
      </button>
      
      <nav className={navClasses}>
        <ul>
          {modules.map((moduleName) => (
            <li key={moduleName}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onModuleSelect(moduleName);
                }}
                className={`sidebar-link ${isExpanded ? 'is-expanded' : 'is-collapsed'} ${activeModule === moduleName ? 'is-active' : ''}`}
                title={!isExpanded ? moduleName : ''}
              >
                <ModuleIcon moduleName={moduleName} className="sidebar-link-icon" />
                {isExpanded && <span className="sidebar-link-label">{moduleName}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {isExpanded && (
        <div className="sidebar-footer-wrap">
          <img
            src="https://barra.sistema.gov.br/v1/assets/govbr.webp"
            alt="Logomarca gov.br"
            className="sidebar-footer-logo"
          />
        </div>
      )}
    </aside>
  );
};

export default Sidebar;