import React, { useState } from 'react';

const tabs = [
    { id: 'atribuicoes', title: 'Atribuições do CGI' },
    { id: 'principios', title: 'Princípios de Boa Governança' },
    { id: 'integracao', title: 'Integração e Revisão' },
];

const atribuicoes = [
    "Convocar a gerência do Laboratório de Inovação para as reuniões.",
    "Selecionar as ideias que serão priorizadas, em conformidade com os planos de ação anuais.",
    "Monitorar periodicamente os resultados da prototipagem, testagem e validação.",
    "Aprovar a realização anual do Prêmio de Inovação do INPI.",
    "Deliberar sobre a alocação de recursos para as atividades de inovação.",
    "Identificar e propor a articulação com parceiros externos.",
    "Aprovar ou rejeitar o relatório anual de ações do Laboratório de Inovação."
];

const Governanca: React.FC = () => {
    const [activeTab, setActiveTab] = useState('atribuicoes');

    return (
        <div className="module-page">
            <h1 className="module-title">Governança</h1>
            <div className="module-intro">
                <div className="module-kicker">DECISÃO E MONITORAMENTO</div>
                <p className="module-lead">
                    Entenda como a inovação é gerenciada e monitorada no mais alto nível estratégico. Explore as atribuições do comitê responsável e os princípios que guiam a tomada de decisão.
                </p>
            </div>
            <div className="w-full module-card">
                <div className="module-tabbar">
                    <nav className="flex flex-wrap gap-3" aria-label="Tabs">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`module-tab ${activeTab === tab.id ? 'is-active' : ''}`}
                            >
                                {tab.title}
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="py-6">
                    {activeTab === 'atribuicoes' && (
                        <div className="space-y-3">
                             <h3 className="module-section-title">Caberá ao Comitê de Governança Interna (CGI):</h3>
                             {atribuicoes.map((item, index) => (
                                <div key={index} className="module-note-box module-list-item">
                                    <svg className="module-list-icon w-5 h-5 mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <p className="module-section-text">{item}</p>
                                </div>
                             ))}
                        </div>
                    )}
                    {activeTab === 'principios' && (
                        <div className="module-note-box">
                            <p className="module-section-text">A governança do SGI se integra aos princípios de boa governança orientados à <span className="font-serif-highlight module-highlight">transparência</span>, <span className="font-serif-highlight module-highlight">equidade</span>, <span className="font-serif-highlight module-highlight">prestação de contas (accountability)</span> e <span className="font-serif-highlight module-highlight">responsabilidade corporativa</span>.</p>
                        </div>
                    )}
                    {activeTab === 'integracao' && (
                        <div className="space-y-6">
                            <div>
                                <div className="module-note-box">
                                  <p className="module-section-text">As políticas de inovação do INPI deverão observar os princípios e diretrizes desta Política, promovendo a <span className="font-serif-highlight module-highlight">sinergia</span> e o <span className="font-serif-highlight module-highlight">desenvolvimento coordenado</span>.</p>
                                </div>
                            </div>
                             <div>
                                <div className="module-note-box">
                                  <p className="module-section-text">Esta Política será revisada a cada <span className="font-serif-highlight module-highlight">5 (cinco) anos</span> para garantir sua adequação às necessidades do INPI, às tendências de gestão da inovação e às mudanças no ambiente externo.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Governanca;