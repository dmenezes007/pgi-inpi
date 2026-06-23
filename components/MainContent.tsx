import React from 'react';
import Inicio from './Inicio';
import Metodologia from './Metodologia';
import Definicoes from './Definicoes';
import Tipologia from './Tipologia';
import Objetivos from './Objetivos';
import Principios from './Principios';
import Laboratorio from './Laboratorio';
import Premio from './Premio';
import Ferramentas from './Ferramentas';
import Banco from './Banco';
import Governanca from './Governanca';
import Estrategias from './Estrategias';
import Documentacao from './Documentacao';
import { Project } from '../App';

interface MainContentProps {
  activeModule: string;
  onModuleSelect: (moduleName: string) => void;
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
}

const MainContent: React.FC<MainContentProps> = ({ activeModule, onModuleSelect, projects, addProject }) => {
  const renderModule = () => {
    switch (activeModule) {
      case 'Início':
        return <Inicio onModuleSelect={onModuleSelect} />;
      case 'Metodologia':
        return <Metodologia />;
      case 'Definições':
        return <Definicoes />;
      case 'Tipologia':
        return <Tipologia />;
      case 'Objetivos':
        return <Objetivos />;
      case 'Princípios':
        return <Principios />;
      case 'Laboratório':
        return <Laboratorio />;
      case 'Prêmio':
        return <Premio />;
      case 'Ferramentas':
        return <Ferramentas />;
      case 'Banco':
        return <Banco />;
      case 'Governança':
        return <Governanca />;
      case 'Estratégias':
        return <Estrategias />;
      case 'Documentação':
        return <Documentacao />;
      default:
        return <Inicio onModuleSelect={onModuleSelect} />;
    }
  };

  return (
    <main className="main-content-scroll-area flex-1 p-4 sm:p-8 overflow-y-auto">
      <div className="max-w-full mx-auto">
        {renderModule()}
      </div>
    </main>
  );
};

export default MainContent;