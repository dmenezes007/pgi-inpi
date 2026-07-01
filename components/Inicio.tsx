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
          O <span className="text-purple-400 font-serif-highlight font-medium">Portal da Gestão da Inovação</span> consolida a proposta institucional desenvolvida pela Gerência Executiva de Projetos da Presidência do INPI, reafirmando a <span className="text-purple-400 font-serif-highlight font-medium">inovação como pilar estratégico</span> para a <span className="text-purple-400 font-serif-highlight font-medium">transformação organizacional</span>, a melhoria da prestação de serviços e a geração de valor público.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 mb-8 rounded-xl border border-purple-200 bg-purple-50">
        <div className="flex-1">
          <p className="text-sm font-semibold text-purple-800 mb-1">Sobre o Portal</p>
          <p className="text-sm text-purple-700">
            Esta é a primeira versão do Portal da Gestão da Inovação, desenvolvida pela Gerência Executiva de Projetos da Presidência do INPI e disponibilizada no GitLab, em consonância com práticas de governança, rastreabilidade, colaboração aberta, segurança da informação e observância ao Padrão Digital de Governo, sem backend transacional de coleta ou armazenamento de dados persistentes.
          </p>
        </div>
        <a
          href="https://gitlab.com/gppr-inpi/pgi-inpi"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200 whitespace-nowrap"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Acessar o Repositório do GitLab
        </a>
      </div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">Arquitetura do portal</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Navegação por Módulos</h2>
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