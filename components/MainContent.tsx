import React from 'react';
import Inicio from './Inicio';
import Metodologia from './Metodologia';
import Definicoes from './Definicoes';
import Tipologia from './Tipologia';
import Objetivos from './Objetivos';
import Principios from './Principios';
import Estimulo from './Estimulo';
import Desenvolvimento from './Desenvolvimento';
import Implantacao from './Implantacao';
import Mensuracao from './Mensuracao';
import Aprendizado from './Aprendizado';
import Sistema from './Sistema';
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
      case 'Estímulo':
        return <Estimulo addProject={addProject} />;
      case 'Desenvolvimento':
        return <Desenvolvimento projects={projects} />;
      case 'Implantação':
        return <Implantacao projects={projects} />;
      case 'Mensuração':
        return <Mensuracao projects={projects} />;
      case 'Aprendizado':
        return <Aprendizado projects={projects} />;
      case 'Sistema':
        return <Sistema />;
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
    <main className="flex-1 p-4 sm:p-8 overflow-y-auto bg-slate-900">
      <div className="max-w-7xl mx-auto">
        {renderModule()}
      </div>
    </main>
  );
};

export default MainContent;