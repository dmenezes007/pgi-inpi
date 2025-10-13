import React from 'react';

const sgiComponents = [
    { title: 'Laboratório de Inovação', description: 'Instituído com formato e funcionamento definidos em ato normativo específico.', icon: '🔬' },
    { title: 'Redes de Inovação', description: 'Criação ou participação em redes para impulsionar a gestão da inovação e produzir alto impacto.', icon: '🌐' },
    { title: 'Programas de Capacitação', description: 'Formação contínua em gestão da inovação, gestão de mudanças e gestão por resultados.', icon: '🎓' },
    { title: 'Eventos de Inovação', description: 'Realização de eventos para difundir práticas e conhecimentos relativos ao tema.', icon: '🎉' },
    { title: 'Times Volantes', description: 'Constituição de equipes dedicadas ao desenvolvimento e implementação de soluções inovadoras.', icon: '🚀' },
    { title: 'Prêmio de Inovação', description: 'Promoção do Prêmio de Inovação do INPI, com critérios transparentes para avaliação e priorização.', icon: '🏆' },
    { title: 'Banco de Ideias', description: 'Criação e manutenção de um banco de ideias para aproveitamento futuro.', icon: '💡' }
];

const Sistema: React.FC = () => {
    return (
        <div>
            <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-400">Sistema</h1>
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg mb-10 border border-slate-700">
                <p className="text-lg leading-relaxed text-gray-300">
                   Conheça os elementos que compõem o Sistema de Gestão da Inovação (SGI). Cada componente representa um pilar fundamental para apoiar, gerenciar e estimular as atividades de inovação na instituição.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sgiComponents.map((item, index) => (
                    <div key={index} className="group bg-slate-800 p-6 rounded-xl border border-slate-700 transition-all duration-300 hover:border-purple-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/10">
                        <div className="flex items-center mb-4">
                            <div className="text-4xl mr-4 transition-transform duration-300 group-hover:scale-110">{item.icon}</div>
                            <h2 className="text-xl font-bold text-gray-200">{item.title}</h2>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sistema;