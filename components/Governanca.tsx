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
        <div>
            <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-400">Governança</h1>
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg mb-10 border border-slate-700">
                <p className="text-lg leading-relaxed text-gray-300">
                    Entenda como a inovação é gerenciada e monitorada no mais alto nível estratégico. Explore as atribuições do comitê responsável e os princípios que guiam a tomada de decisão.
                </p>
            </div>
            <div className="w-full">
                <div className="border-b border-slate-700">
                    <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`${
                                    activeTab === tab.id
                                        ? 'border-purple-500 text-purple-400'
                                        : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-base transition-colors duration-200`}
                            >
                                {tab.title}
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="py-6">
                    {activeTab === 'atribuicoes' && (
                        <div className="space-y-3">
                             <h3 className="text-lg font-semibold text-gray-300 mb-4">Caberá ao Comitê de Governança Interna (CGI):</h3>
                             {atribuicoes.map((item, index) => (
                                <div key={index} className="flex items-start p-3 bg-slate-800 rounded-md">
                                    <svg className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <p className="text-gray-300">{item}</p>
                                </div>
                             ))}
                        </div>
                    )}
                    {activeTab === 'principios' && (
                        <div className="p-6 bg-slate-800 rounded-md">
                            <p className="text-gray-300 text-lg leading-relaxed">A governança do SGI se integra aos princípios de boa governança orientados à <span className="font-serif-highlight text-purple-400">transparência</span>, <span className="font-serif-highlight text-purple-400">equidade</span>, <span className="font-serif-highlight text-purple-400">prestação de contas (accountability)</span> e <span className="font-serif-highlight text-purple-400">responsabilidade corporativa</span>.</p>
                        </div>
                    )}
                    {activeTab === 'integracao' && (
                        <div className="p-6 bg-slate-800 rounded-md space-y-6">
                            <div>
                                <p className="text-gray-300 text-lg leading-relaxed">As políticas de inovação do INPI deverão observar os princípios e diretrizes desta Política, promovendo a <span className="font-serif-highlight text-purple-400">sinergia</span> e o <span className="font-serif-highlight text-purple-400">desenvolvimento coordenado</span>.</p>
                            </div>
                             <div>
                                <p className="text-gray-300 text-lg leading-relaxed">Esta Política será revisada a cada <span className="font-serif-highlight text-purple-400">5 (cinco) anos</span> para garantir sua adequação às necessidades do INPI, às tendências de gestão da inovação e às mudanças no ambiente externo.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Governanca;