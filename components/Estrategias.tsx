import React from 'react';

const managerPremises = [
  "Definir a inovação como um requisito recomendado em iniciativas ou projetos.",
  "Prever metas institucionais para a inovação no planejamento estratégico.",
  "Incentivar o corpo funcional à ideação de propostas inovadoras.",
  "Autorizar a participação de servidores no desenvolvimento de projetos de inovação.",
  "Ampliar a participação do INPI no desenvolvimento de soluções de inovação interna, externa e aberta."
];

const competencyGuidelines = [
  "Alinhamento aos objetivos estratégicos do INPI.",
  "Identificação das competências essenciais em líderes e colaboradores.",
  "Estabelecimento de orçamento dedicado ao desenvolvimento de competências.",
  "Elaboração e implementação de plano de desenvolvimento de competências."
];

const Estrategias: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-400">
        Estratégias
      </h1>
       <div className="bg-slate-800 p-6 rounded-lg shadow-lg mb-10 border border-slate-700">
          <p className="text-lg leading-relaxed text-gray-300">
              Descubra as diretrizes que orientam a atuação dos gestores e o desenvolvimento de competências para a inovação. Estes são os pilares que conectam as ações de inovação à missão do INPI.
          </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <h2 className="text-2xl font-bold text-purple-400 mb-4">Atuação dos Gestores</h2>
          <p className="text-sm text-gray-400 mb-4">Gestores de todos os níveis devem atuar proativamente no fomento à inovação, seguindo as premissas:</p>
          <ul className="space-y-3">
            {managerPremises.map((item, index) => (
              <li key={index} className="flex items-start">
                <svg className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <h2 className="text-2xl font-bold text-purple-400 mb-4">Competências em Inovação</h2>
          <p className="text-sm text-gray-400 mb-4">A definição e o desenvolvimento das competências orientadas para a inovação serão balizadas em:</p>
          <ul className="space-y-3">
            {competencyGuidelines.map((item, index) => (
              <li key={index} className="flex items-start">
                <svg className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                 <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Estrategias;