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
    <div className="module-page">
      <h1 className="module-title">
        Estratégias
      </h1>
       <div className="module-intro">
          <div className="module-kicker">Diretrizes gerenciais</div>
          <p className="module-lead">
            Apresentação das diretrizes para a atuação gerencial e para o desenvolvimento de competências em inovação, conectando iniciativas institucionais ao planejamento estratégico e à missão do INPI.
          </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="module-card">
          <h2 className="module-section-title">Atuação dos Gestores</h2>
          <p className="module-section-text mt-0.5 mb-4">A atuação de gestores em todos os níveis deve observar as seguintes premissas institucionais:</p>
          <ul className="space-y-3">
            {managerPremises.map((item, index) => (
              <li key={index} className="flex items-start">
                <svg className="module-list-icon w-5 h-5 mr-3 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="10" cy="10" r="9" fill="#E8F0FF" stroke="#1351B4" strokeWidth="1.5"/><path d="M6.8 10.1l2.1 2.1 4.3-4.4" stroke="#1351B4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className="module-section-text">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="module-card">
          <h2 className="module-section-title">Competências em Inovação</h2>
          <p className="module-section-text mt-0.5 mb-4">A definição e o desenvolvimento de competências orientadas à inovação devem ser balizados pelos seguintes referenciais:</p>
          <ul className="space-y-3">
            {competencyGuidelines.map((item, index) => (
              <li key={index} className="flex items-start">
                <svg className="module-list-icon w-5 h-5 mr-3 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="10" cy="10" r="9" fill="#E8F0FF" stroke="#1351B4" strokeWidth="1.5"/><path d="M6.8 10.1l2.1 2.1 4.3-4.4" stroke="#1351B4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                 <span className="module-section-text">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Estrategias;