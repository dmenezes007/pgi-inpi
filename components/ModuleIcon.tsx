import React from 'react';

interface ModuleIconProps {
  moduleName: string;
  className?: string;
}

const ModuleIcon: React.FC<ModuleIconProps> = ({ moduleName, className = "h-6 w-6" }) => {
  const finalClassName = className;

  switch (moduleName) {
    case 'Início':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={finalClassName} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      );
    case 'Metodologia':
      return (
         <svg xmlns="http://www.w3.org/2000/svg" className={finalClassName} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case 'Definições':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className={finalClassName} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v11.494m-9-5.747h18" />
            </svg>
        );
    case 'Tipologia':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className={finalClassName} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        );
    case 'Objetivos':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={finalClassName} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'Princípios':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className={finalClassName} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9" />
            </svg>
        );
    case 'Laboratório':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={finalClassName} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6m-1 0v5.172a2 2 0 00.586 1.414l4.242 4.242A3 3 0 0116.657 19H7.343a3 3 0 01-2.121-5.172l4.242-4.242A2 2 0 0010 8.172V3m-1 8h6" />
        </svg>
      );
    case 'Prêmio':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={finalClassName} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8m-4-4v4m0-4a7 7 0 007-7V6h-2.2a2 2 0 01-1.8-1.1L14.1 3h-4.2L9 4.9A2 2 0 017.2 6H5v4a7 7 0 007 7z" />
        </svg>
      );
    case 'Ferramentas':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={finalClassName} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 010 1.4l-7 7a1 1 0 01-1.4 0l-2.6-2.6a1 1 0 010-1.4l7-7a1 1 0 011.4 0l2.6 2.6zM15 15l6 6M13 17l2-2" />
        </svg>
      );
    case 'Sistema':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className={finalClassName} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
        );
    case 'Governança':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={finalClassName} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
    case 'Estratégias':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={finalClassName} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 21V9m0 12h6m-6 0h-1.586a1 1 0 01-.707-.293l-1.414-1.414a1 1 0 010-1.414l1.414-1.414a1 1 0 01.707-.293H9m6 12v-9m0 9h1.586a1 1 0 00.707-.293l1.414-1.414a1 1 0 000-1.414l-1.414-1.414a1 1 0 00-.707-.293H15M3 9h18M3 9a2 2 0 012-2h14a2 2 0 012 2M3 9v9a2 2 0 002 2h14a2 2 0 002-2V9" />
        </svg>
      );
    case 'Documentação':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className={finalClassName} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={finalClassName} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      );
  }
};

export default ModuleIcon;
